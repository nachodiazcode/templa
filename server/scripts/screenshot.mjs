#!/usr/bin/env node
/**
 * screenshot.mjs — Captura pantallazos reales de las plantillas premium
 * de Templa usando Chrome headless vía DevTools Protocol (CDP), sin
 * dependencias (Node 18+/24 tiene WebSocket y fetch globales).
 *
 * Uso:
 *   node server/scripts/screenshot.mjs [ids...]
 *   node server/scripts/screenshot.mjs            # todas las premium del catálogo
 *   node server/scripts/screenshot.mjs aurora ink-blog
 *
 * Requisitos:
 *   - El server de Templa corriendo (por defecto en http://localhost:8787),
 *     porque las capturas se toman de GET /api/templates/<id>/preview-html.
 *   - Google Chrome instalado en /Applications/Google Chrome.app (macOS).
 *     Se puede apuntar a otro binario con CHROME_BIN.
 *
 * Salida: public/previews/<id>-desktop.png y <id>-mobile.png
 */
import { execFile } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileP = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));

const API_BASE = process.env.TEMPLA_API || 'http://localhost:8787';
const OUT_DIR = join(__dirname, '..', '..', 'public', 'previews');
const CHROME =
  process.env.CHROME_BIN ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const DESKTOP = { width: 1280, height: 800, dpr: 1 };
const MOBILE = { width: 390, height: 844, dpr: 1 };
const MAX_H = 7000; // altura máxima de captura para no saturar memoria

async function readCatalogIds() {
  const mod = await import(join(__dirname, '..', 'lib', 'catalog.js'));
  return mod.getCatalog().map((t) => t.id);
}

/* ---------- mínimo cliente CDP sobre WebSocket ---------- */
class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); this.events = []; }
  static async connect(url) {
    const ws = new WebSocket(url);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    const c = new CDP(ws);
    ws.onmessage = (m) => c._onMessage(m);
    return c;
  }
  _onMessage(m) {
    const msg = JSON.parse(m.data);
    if (msg.id && this.pending.has(msg.id)) { const { res, rej } = this.pending.get(msg.id); this.pending.delete(msg.id); msg.error ? rej(new Error(msg.error.message)) : res(msg.result); }
    else this.events.push(msg);
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((res, rej) => { this.pending.set(id, { res, rej }); this.ws.send(JSON.stringify({ id, method, params })); });
  }
  waitEvent(method, timeout = 15000) {
    return new Promise((res, rej) => {
      const t0 = Date.now();
      const tick = () => {
        const i = this.events.findIndex((e) => e.method === method);
        if (i >= 0) { const e = this.events[i]; this.events.splice(i, 1); return res(e); }
        if (Date.now() - t0 > timeout) return rej(new Error(`timeout esperando ${method}`));
        setTimeout(tick, 50);
      };
      tick();
    });
  }
  async eval(expression) {
    const r = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return r.result?.value;
  }
  close() { try { this.ws.close(); } catch {} }
}

/* ---------- lanzar Chrome headless ---------- */
async function launchChrome() {
  const userDir = join(tmpdir(), `templa-chrome-${Date.now()}`);
  const port = 9200 + Math.floor(Math.random() * 400);
  const args = [
    '--headless=new', '--hide-scrollbars', '--disable-gpu', '--no-sandbox',
    '--disable-dev-shm-usage', '--mute-audio', '--disable-extensions',
    `--remote-debugging-port=${port}`, `--user-data-dir=${userDir}`, 'about:blank',
  ];
  const child = execFile(CHROME, args, { stdio: ['ignore', 'ignore', 'ignore'] }).unref();
  // esperar a que el endpoint de debugging responda
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(`http://localhost:${port}/json/list`); if (r.ok) break; } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  const list = await (await fetch(`http://localhost:${port}/json/list`)).json();
  const page = list.find((t) => t.type === 'page');
  return { cdp: await CDP.connect(page.webSocketDebuggerUrl), child, userDir, port };
}

/* ---------- una captura de un template (con timeout propio) ---------- */
function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, rej) => setTimeout(() => rej(new Error(`timeout (${label})`)), ms)),
  ]);
}

async function shoot(cdp, url, device, outFile) {
  await withTimeout(cdp.send('Emulation.setDeviceMetricsOverride', {
    width: device.width, height: device.height,
    deviceScaleFactor: device.dpr, mobile: device.width <= 600,
  }), 10000, 'set-metrics-1');
  await withTimeout(cdp.send('Emulation.setEmulatedMedia', { media: 'screen', features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] }), 10000, 'emulated-media');

  const loaded = cdp.waitEvent('Page.loadEventFired');
  await withTimeout(cdp.send('Page.navigate', { url }), 20000, 'navigate');
  await loaded;

  // esperar fuentes, reveal y animaciones
  await new Promise((r) => setTimeout(r, 1500));

  // revelar contenido: poner viewport a la altura total (acotada) para que
  // IntersectionObserver dispare todo, luego volver arriba
  const scrollH = await cdp.eval('Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)');
  const cappedH = Math.min(Math.max(scrollH, 600), MAX_H);
  await withTimeout(cdp.send('Emulation.setDeviceMetricsOverride', {
    width: device.width, height: cappedH, deviceScaleFactor: device.dpr, mobile: device.width <= 600,
  }), 10000, 'set-metrics-2');
  await new Promise((r) => setTimeout(r, 1300));

  // el viewport ya es la página completa; capturar sin beyond-viewport
  const shot = await withTimeout(cdp.send('Page.captureScreenshot', {
    format: 'png', fromSurface: true, captureBeyondViewport: false,
  }), 60000, 'capture');
  const buf = Buffer.from(shot.data, 'base64');
  await writeFile(outFile, buf);
  console.log(`  ✔ ${outFile} (${buf.length} bytes)`);
}

/* ---------- main ---------- */
async function main() {
  const argIds = process.argv.slice(2);
  const catalogIds = await readCatalogIds();
  const ids = argIds.length ? argIds : catalogIds;

  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Chrome: ${CHROME}`);
  console.log(`API: ${API_BASE}`);
  console.log(`Salida: ${OUT_DIR}`);
  console.log(`Plantillas (${ids.length}): ${ids.join(' ')}\n`);

  const { cdp, child, userDir } = await launchChrome();
  try {
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    for (const id of ids) {
      const url = `${API_BASE}/api/templates/${id}/preview-html`;
      console.log(`→ ${id}: ${url}`);
      try {
        await shoot(cdp, url, DESKTOP, join(OUT_DIR, `${id}-desktop.png`));
        await shoot(cdp, url, MOBILE, join(OUT_DIR, `${id}-mobile.png`));
      } catch (e) {
        console.error(`  ✖ ${e.message}`);
      }
    }
  } finally {
    cdp.close();
    try { child.kill('SIGKILL'); } catch {}
    try { (await import('node:fs')).rmSync(userDir, { recursive: true, force: true }); } catch {}
  }
  console.log('\nListo ✨');
}

main().catch((e) => { console.error(e); process.exit(1); });
