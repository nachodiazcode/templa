import AdmZip from 'adm-zip';
import { listTemplateAssets } from './template-assets.js';

function licenseTxt(template, buyerEmail, orderId) {
  return `LICENCIA TEMPLA — ${template.name}
=====================================

Titular: ${buyerEmail || '—'}
Orden:   ${orderId || 'descarga gratuita'}
Fecha:   ${new Date().toISOString()}

PUEDES:
- Usar esta plantilla en proyectos personales y comerciales ilimitados.
- Modificar el código libremente.

NO PUEDES:
- Revender o redistribuir la plantilla (original o modificada) como plantilla.
- Publicar el código fuente en repositorios públicos.

Soporte: soporte@templa.app
`;
}

function readmeMd(template) {
  return `# ${template.name}

${template.tagline}

## Características

${template.features.map((f) => `- ${f}`).join('\n')}

## Stack

${template.tech.join(' · ')}

## Uso

1. Instala dependencias: \`npm install\`
2. Desarrollo: \`npm start\`
3. Producción: \`npm run build\`

${template.pages} páginas incluidas · v2.4 · © ${new Date().getFullYear()} Templa
`;
}

function packageJson(template) {
  return JSON.stringify(
    {
      name: template.id,
      version: '2.4.0',
      private: true,
      scripts: {
        start: 'ng serve',
        build: 'ng build',
      },
    },
    null,
    2,
  );
}

function mainTs(template) {
  return `import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
`;
}

function appComponentTs(template) {
  const [c1, c2] = template.colors;
  return `import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: \`
    <main class="hero">
      <span class="pill">${template.name}</span>
      <h1>${template.tagline}</h1>
      <p>Gracias por usar Templa.</p>
    </main>
  \`,
  styles: \`
    .hero { min-height: 100vh; display: grid; place-content: center; text-align: center;
            background: linear-gradient(135deg, ${c1}, ${c2}); color: white; font-family: system-ui; }
    .pill { border: 1px solid rgba(255,255,255,.5); padding: 6px 14px; border-radius: 99px; font-size: 13px; }
    h1 { margin: 18px 0 8px; max-width: 600px; }
  \`,
})
export class AppComponent {}
`;
}

export function buildTemplateBundle(template, { buyerEmail = '', orderId = '' } = {}) {
  const zip = new AdmZip();
  const root = `${template.id}/`;

  // Licencia personalizada siempre
  zip.addFile(`${root}LICENSE.txt`, Buffer.from(licenseTxt(template, buyerEmail, orderId), 'utf8'));

  // Si existen archivos reales en templates-src/<id>, se sirven esos (caché en memoria)
  const assets = listTemplateAssets(template.id);
  if (assets) {
    for (const file of assets) zip.addFile(`${root}${file.path}`, file.buffer);
    return zip.toBuffer();
  }

  // Fallback: scaffold generado
  zip.addFile(`${root}README.md`, Buffer.from(readmeMd(template), 'utf8'));
  zip.addFile(`${root}package.json`, Buffer.from(packageJson(template), 'utf8'));
  zip.addFile(`${root}src/main.ts`, Buffer.from(mainTs(template), 'utf8'));
  zip.addFile(`${root}src/index.html`, Buffer.from('<!doctype html><html lang="es"><head><meta charset="utf-8"><title>' + template.name + '</title></head><body><app-root></app-root></body></html>', 'utf8'));
  zip.addFile(`${root}src/app/app.component.ts`, Buffer.from(appComponentTs(template), 'utf8'));
  zip.addFile(`${root}src/styles.scss`, Buffer.from(`/* ${template.name} — estilos globales */\n`, 'utf8'));

  return zip.toBuffer();
}
