#!/usr/bin/env node
/**
 * optimize-previews.mjs — Optimiza las capturas de pantalla de las plantillas
 * premium de Templa usando sharp:
 *   - Genera versiones WebP (mucho más livianas) de desktop/mobile para la galería.
 *   - Genera un thumbnail WebP recortado del hero (ratio 16:10.4) para las tarjetas.
 *   - Elimina los PNG originales si todas las salidas se generaron bien.
 *
 * Uso:
 *   node server/scripts/optimize-previews.mjs [ids...]
 *   node server/scripts/optimize-previews.mjs    # todas las capturas existentes
 */
import { readdir, rm, stat } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PREVIEWS_DIR = join(__dirname, '..', '..', 'public', 'previews');

const THUMB_RATIO = 10.4 / 16; // alto / ancho (aspect-ratio de las tarjetas)
const DESKTOP_WIDTH = 1280;
const MOBILE_WIDTH = 429;
const THUMB_WIDTH = 720;
const QUALITY = 80;

async function main() {
  const ids = process.argv.slice(2);
  const files = await readdir(PREVIEWS_DIR);
  const pngFiles = files.filter((f) => f.endsWith('-desktop.png') || f.endsWith('-mobile.png'));

  if (ids.length) {
    const wanted = new Set(ids.flatMap((id) => [`${id}-desktop.png`, `${id}-mobile.png`]));
    const kept = pngFiles.filter((f) => wanted.has(f));
    pngFiles.length = 0;
    pngFiles.push(...kept);
  }

  if (!pngFiles.length) {
    console.log('No hay capturas PNG para optimizar.');
    process.exit(0);
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const png of pngFiles) {
    const id = png.replace(/-desktop\.png$|-mobile\.png$/, '');
    const kind = png.includes('-desktop') ? 'desktop' : 'mobile';
    const src = join(PREVIEWS_DIR, png);
    const width = kind === 'desktop' ? DESKTOP_WIDTH : MOBILE_WIDTH;

    try {
      totalBefore += (await stat(src)).size;

      const meta = await sharp(src).metadata();
      const h = meta.height ?? 0;
      const w = meta.width ?? 0;

      // Gallery: webp ajustado al ancho objetivo (sin recortar)
      const galleryOut = join(PREVIEWS_DIR, `${id}-${kind}.webp`);
      await sharp(src)
        .resize({ width: Math.min(width, w) })
        .webp({ quality: QUALITY })
        .toFile(galleryOut);

      // Thumb: recorte del hero (parte superior) en ratio de tarjeta
      if (kind === 'desktop') {
        const thumbH = Math.round(THUMB_WIDTH * THUMB_RATIO);
        const thumbOut = join(PREVIEWS_DIR, `${id}-thumb.webp`);
        await sharp(src)
          .resize({ width: THUMB_WIDTH }) // mantiene proporción real de alto
          .extract({ left: 0, top: 0, width: THUMB_WIDTH, height: Math.min(thumbH, Math.round(h * (THUMB_WIDTH / w))) })
          .webp({ quality: QUALITY })
          .toFile(thumbOut);
        totalAfter += (await stat(thumbOut)).size;
      }

      totalAfter += (await stat(galleryOut)).size;
      console.log(`  ✔ ${basename(galleryOut)} (${((await stat(galleryOut)).size / 1024).toFixed(0)}KB)`);
      console.log(`  ✔ ${basename(galleryOut).replace(`${kind}.webp`, 'thumb.webp')}${kind !== 'desktop' ? ' (solo desktop)' : ''}`);
    } catch (err) {
      console.error(`  ✖ ${png}: ${err.message}`);
    }
  }

  // Eliminar PNG originales generados correctamente
  for (const png of pngFiles) {
    const out = join(PREVIEWS_DIR, png);
    const id = png.replace(/-desktop\.png$|-mobile\.png$/, '');
    const kind = png.includes('-desktop') ? 'desktop' : 'mobile';
    const ok = await stat(join(PREVIEWS_DIR, `${id}-${kind}.webp`)).then(() => true).catch(() => false);
    if (ok) {
      await rm(out, { force: true });
      console.log(`  🗑  removido ${png}`);
    }
  }

  console.log(`\nPeso antes: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → después: ${(totalAfter / 1024 / 1024).toFixed(1)}MB`);
  console.log('Optimización completa ✨');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
