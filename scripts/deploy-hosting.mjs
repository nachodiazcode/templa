import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const indexHtml = path.join(root, 'dist', 'templa', 'browser', 'index.html');

const apiUrl = (process.env.TEMPLA_API || process.argv[2] || 'http://localhost:8787').replace(/\/$/, '');

console.log(`API target: ${apiUrl}`);

/* 1) Build Angular */
execSync('npm run build', { cwd: root, stdio: 'inherit' });

if (!fs.existsSync(indexHtml)) {
  console.error(`No se encontró ${indexHtml}. Revisa el outputPath en angular.json.`);
  process.exit(1);
}

/* 2) Inyectar window.__TEMPLA_API__ antes del cierre de <head> */
const html = fs.readFileSync(indexHtml, 'utf8');
const script = `<script>window.__TEMPLA_API__ = ${JSON.stringify(apiUrl)};</script>`;
if (html.includes('__TEMPLA_API__')) {
  fs.writeFileSync(indexHtml, html.replace(/<script>window\.__TEMPLA_API__[^<]*<\/script>/, script));
} else {
  const injected = html.replace('</head>', `${script}</head>`);
  fs.writeFileSync(indexHtml, injected);
}
console.log('window.__TEMPLA_API__ inyectado en dist/templa/browser/index.html');

/* 3) Deploy a Firebase Hosting */
execSync('npx firebase deploy --only hosting', { cwd: root, stdio: 'inherit' });
console.log('Desplegado en Firebase Hosting');