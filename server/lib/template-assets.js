import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const TEMPLATES_SRC = path.join(__dirname, '..', 'templates-src');

/* Los assets de cada plantilla se leen del disco UNA vez y se sirven desde
   memoria. Al publicar/eliminar una plantilla desde el admin se invalida. */
const assetCache = new Map();   // id -> { path, buffer }[]
const previewCache = new Map(); // id -> HTML inline (o null)

export function listTemplateAssets(id) {
  const cached = assetCache.get(id);
  if (cached !== undefined) return cached;

  const dir = path.join(TEMPLATES_SRC, id);
  if (!fs.existsSync(dir)) {
    assetCache.set(id, null);
    return null;
  }

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
  assetCache.set(id, files);
  return files;
}

export function findTemplateAsset(id, relPath) {
  const files = listTemplateAssets(id);
  if (!files) return null;
  const clean = String(relPath || '').split('?')[0].replace(/^\.?\/+/, '');
  const found = files.find((f) => f.path === clean);
  return found ? found.buffer : null;
}

function buildPreviewHtml(id) {
  const indexFile = findTemplateAsset(id, 'index.html');
  if (!indexFile) return null;

  let html = indexFile.toString('utf8');

  // inline <link rel="stylesheet" href="...">
  html = html.replace(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi, (m, href) => {
    const css = findTemplateAsset(id, href);
    if (!css) return m;
    return `<style>\n${css.toString('utf8')}\n</style>`;
  });

  // inline <script src="..."> (sin src remoto ni module)
  html = html.replace(/<script[^>]*src=["']([^"']+)["'][^>]*>(.*?)<\/script>/gis, (m, src, inner) => {
    const js = findTemplateAsset(id, src);
    if (!js) return m;
    return `<script>\n${js.toString('utf8')}\n</script>\n${inner}`;
  });

  return html;
}

/** Devuelve el HTML inline de la plantilla (null si no existe). Caché en memoria. */
export function getPreviewHtml(id) {
  if (previewCache.has(id)) return previewCache.get(id);
  const html = buildPreviewHtml(id);
  previewCache.set(id, html);
  return html;
}

/** Invalida las cachés de assets y preview de una plantilla (tras publicar/borrar). */
export function invalidateTemplateCache(id) {
  assetCache.delete(id);
  previewCache.delete(id);
}

export function clearTemplateCache() {
  assetCache.clear();
  previewCache.clear();
}