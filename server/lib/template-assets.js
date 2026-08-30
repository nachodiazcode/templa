import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import AdmZip from 'adm-zip';
import { storageEnabled, getTemplateZipBuffer, clearTemplateZipCache } from './storage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const TEMPLATES_SRC = path.join(__dirname, '..', 'templates-src');

/* Los assets se leen UNA vez (de Storage o disco) y se sirven desde memoria.
   Al publicar/eliminar una plantilla desde el admin se invalida. */
const assetCache = new Map();   // id -> { path, buffer }[] | null
const previewCache = new Map(); // id -> HTML inline (o null)

function listFromDisk(id) {
  const dir = path.join(TEMPLATES_SRC, id);
  if (!fs.existsSync(dir)) return null;

  const files = [];
  const walk = (base, rel) => {
    for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
      if (entry.name === '.DS_Store') continue;
      const full = path.join(base, entry.name);
      const relPath = rel ? `${rel}/${entry.name}` : entry.name;
      if (entry.isDirectory()) walk(full, relPath);
      else files.push({ path: relPath, buffer: fs.readFileSync(full) });
    }
  };
  walk(dir, '');
  return files;
}

async function listFromStorage(id) {
  const zipBuf = await getTemplateZipBuffer(id);
  if (!zipBuf) return null;

  const zip = new AdmZip(zipBuf);
  const files = [];
  for (const entry of zip.getEntries()) {
    if (entry.isDirectory) continue;
    const name = entry.entryName;
    if (name === '.DS_Store' || name.endsWith('/.DS_Store')) continue;
    files.push({ path: name.replace(/\/+$/g, ''), buffer: entry.getData() });
  }
  return files;
}

export async function listTemplateAssets(id) {
  const cached = assetCache.get(id);
  if (cached !== undefined) return cached;

  const files = storageEnabled ? await listFromStorage(id) : listFromDisk(id);
  assetCache.set(id, files);
  return files;
}

export async function findTemplateAsset(id, relPath) {
  const files = await listTemplateAssets(id);
  if (!files) return null;
  const clean = String(relPath || '').split('?')[0].replace(/^\.?\/+/, '');
  const found = files.find((f) => f.path === clean);
  return found ? found.buffer : null;
}

async function buildPreviewHtml(id) {
  const indexFile = await findTemplateAsset(id, 'index.html');
  if (!indexFile) return null;

  let html = indexFile.toString('utf8');

  // inline <link rel="stylesheet" href="...">
  html = await replaceAsync(html, /<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi, async (m, href) => {
    const css = await findTemplateAsset(id, href);
    if (!css) return m;
    return `<style>\n${css.toString('utf8')}\n</style>`;
  });

  html = await replaceAsync(html, /<script[^>]*src=["']([^"']+)["'][^>]*>(.*?)<\/script>/gis, async (m, src, inner) => {
    const js = await findTemplateAsset(id, src);
    if (!js) return m;
    return `<script>\n${js.toString('utf8')}\n</script>\n${inner}`;
  });

  return html;
}

async function replaceAsync(str, re, replacer) {
  const out = [];
  let last = 0;
  let m;
  while ((m = re.exec(str))) {
    out.push(str.slice(last, m.index));
    out.push(await replacer(...m, m.index, str));
    last = m.index + m[0].length;
  }
  out.push(str.slice(last));
  return out.join('');
}

/** Devuelve el HTML inline de la plantilla (null si no existe). Caché en memoria. */
export async function getPreviewHtml(id) {
  if (previewCache.has(id)) return previewCache.get(id);
  const html = await buildPreviewHtml(id);
  previewCache.set(id, html);
  return html;
}

/** Invalida las cachés de assets y preview de una plantilla (tras publicar/borrar). */
export function invalidateTemplateCache(id) {
  assetCache.delete(id);
  previewCache.delete(id);
  clearTemplateZipCache(id);
}

export function clearTemplateCache() {
  assetCache.clear();
  previewCache.clear();
}