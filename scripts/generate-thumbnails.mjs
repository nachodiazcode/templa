import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Path to Google Chrome on macOS
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function main() {
  console.log('1. Generando archivos HTML en preview-outputs...');
  execSync('npx tsx gen-previews.ts', { cwd: rootDir, stdio: 'inherit' });

  const previewDir = path.join(rootDir, 'preview-outputs');
  const outputDir = path.join(rootDir, 'public', 'previews');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(previewDir).filter((f) => f.endsWith('.html'));
  console.log(`\n2. Encontradas ${files.length} plantillas para procesar.`);

  console.log('3. Iniciando navegador Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
  });

  const page = await browser.newPage();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const id = file.replace('.html', '');
    const htmlPath = path.join(previewDir, file);
    const fileUrl = `file://${htmlPath}`;

    console.log(`[${i + 1}/${files.length}] Procesando ${id}...`);

    // --- Desktop Fold (para Thumbnail) y Full Desktop ---
    await page.setViewport({ width: 1280, height: 832, deviceScaleFactor: 2 });
    await page.goto(fileUrl, { waitUntil: 'load' });
    await new Promise((r) => setTimeout(r, 400));

    const foldBuf = await page.screenshot({ fullPage: false, type: 'png' });
    const desktopFullBuf = await page.screenshot({ fullPage: true, type: 'png' });

    // --- Mobile Full ---
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await new Promise((r) => setTimeout(r, 300));
    const mobileFullBuf = await page.screenshot({ fullPage: true, type: 'png' });

    // Guardar WebPs con sharp
    // 1. Thumb (720x468)
    await sharp(foldBuf)
      .resize(720, 468, { fit: 'cover', position: 'top' })
      .webp({ quality: 85 })
      .toFile(path.join(outputDir, `${id}-thumb.webp`));

    // 2. Desktop (ancho 1280)
    await sharp(desktopFullBuf)
      .resize({ width: 1280 })
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, `${id}-desktop.webp`));

    // 3. Mobile (ancho 390)
    await sharp(mobileFullBuf)
      .resize({ width: 390 })
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, `${id}-mobile.webp`));

    console.log(`   ✓ ${id}-thumb.webp, ${id}-desktop.webp, ${id}-mobile.webp actualizados`);
  }

  await browser.close();
  console.log('\n¡Todas las miniaturas y vistas previas han sido actualizadas con éxito!');
}

main().catch((err) => {
  console.error('Error al generar miniaturas:', err);
  process.exit(1);
});
