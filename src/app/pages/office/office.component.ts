import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OFFICE_TEMPLATES } from '../../core/data/office.data';
import { OfficeKind } from '../../core/models/office.model';
import { OfficeService } from '../../core/services/office.service';

interface OfficeConfig {
  kicker: string;
  title: string;
  subtitle: string;
  brand: string;
  gradient: string;
  stat1: [string, string];
  stat2: [string, string];
  stat3: [string, string];
  steps: { t: string; d: string }[];
  docsWordMore?: { t: string; d: string }[];
}

@Component({
  selector: 'app-office',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  template: `
    <header class="page-head" [style.--brand]="cfg().brand" [style.--brand-grad]="cfg().gradient">
      <div class="container">
        <div class="head-grid">
          <div class="head-copy">
            <span class="kicker">{{ cfg().kicker }}</span>
            <h1>{{ cfg().title }}</h1>
            <p>{{ cfg().subtitle }}</p>
            <div class="head-chips">
              <span class="chip"><b>Gratis</b> para siempre</span>
              <span class="chip"><b>100% editable</b> en {{ format() === 'pptx' ? 'PowerPoint' : 'Word' }}</span>
              <span class="chip"><b>{{ format() === 'pptx' ? '16:9' : 'Formato documento' }}</b> listo</span>
            </div>
          </div>

          <div class="head-stats">
            <div class="stat"><b>{{ cfg().stat1[0] }}</b><small>{{ cfg().stat1[1] }}</small></div>
            <div class="stat"><b>{{ cfg().stat2[0] }}</b><small>{{ cfg().stat2[1] }}</small></div>
            <div class="stat"><b>{{ cfg().stat3[0] }}</b><small>{{ cfg().stat3[1] }}</small></div>
          </div>
        </div>
      </div>
      <div class="head-wash" aria-hidden="true"></div>
    </header>

    <section class="container office-sec">
      <div class="sec-head">
        <h2>Plantillas disponibles</h2>
        <span class="sec-note">{{ shown().length }} {{ shown().length === 1 ? 'plantilla' : 'plantillas' }} · descarga directa, sin registro</span>
      </div>

      <div class="grid">
        @for (t of shown(); track t.id) {
          <article class="ocard" [style.--c1]="t.colors[0]" [style.--c2]="t.colors[1]">
            <div class="omock">
              @if (format() === 'pptx') {
                <div class="slide">
                  <div class="s-side"></div>
                  <div class="s-body">
                    <div class="s-title"></div>
                    <div class="s-line"></div>
                    <div class="s-line w60"></div>
                    <div class="s-kpis">
                      <span></span><span></span><span></span>
                    </div>
                    <div class="s-bars">
                      <span></span><span></span><span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              } @else {
                <div class="doc">
                  <div class="d-head">
                    <div class="d-kicker"></div>
                    <div class="d-title"></div>
                    <div class="d-rule"></div>
                  </div>
                  <div class="d-line"></div>
                  <div class="d-line w85"></div>
                  <div class="d-line w70"></div>
                  <div class="d-table">
                    <div class="d-tr"><i></i><i></i><i></i></div>
                    <div class="d-tr"><i></i><i></i><i></i></div>
                    <div class="d-tr"><i></i><i></i><i></i></div>
                  </div>
                  <div class="d-line"></div>
                  <div class="d-line w65"></div>
                </div>
              }
              <span class="flag">{{ format() === 'pptx' ? 'PPTX' : 'DOCX' }}</span>
            </div>

            <div class="obody">
              <div class="otop">
                <h3>{{ t.name }}</h3>
                <span class="price-free">Gratis</span>
              </div>
              <p class="tagline">{{ t.tagline }}</p>
              <div class="meta">
                <span class="cat">{{ format() === 'pptx' ? 'Presentación' : 'Documento' }}</span>
                <span class="dot">·</span>
                <span>{{ t.slides }} {{ format() === 'pptx' ? 'slides' : 'páginas' }}</span>
                <span class="dot">·</span>
                <span>{{ t.downloads | number }} descargas</span>
              </div>
              <details class="more">
                <summary>Ver detalles</summary>
                <p>{{ t.description }}</p>
                <ul>
                  @for (f of t.features; track f) {
                    <li>{{ f }}</li>
                  }
                </ul>
              </details>
              <a class="btn primary dl" [href]="office.downloadUrl(t)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Descargar {{ format() === 'pptx' ? '.pptx' : '.docx' }}
              </a>
            </div>
          </article>
        }
      </div>
    </section>

    <section class="container section steps-sec">
      <div class="section-head center">
        <span class="kicker">Cómo funciona</span>
        <h2>Listo en tres pasos</h2>
      </div>
      <div class="steps">
        @for (s of cfg().steps; track s.t; let i = $index) {
          <div class="step">
            <span class="step-num">0{{ i + 1 }}</span>
            <h3>{{ s.t }}</h3>
            <p>{{ s.d }}</p>
          </div>
        }
      </div>
    </section>

    <section class="container section">
      <div class="other-card" [style.--brand]="otherCfg().brand" [style.--brand-grad]="otherCfg().gradient">
        <div class="other-copy">
          <span class="kicker">{{ otherCfg().kicker }}</span>
          <h2>También hacemos {{ otherFormat() === 'pptx' ? 'PowerPoint' : 'Word' }}</h2>
          <p>{{ otherCfg().subtitle }}</p>
          <a routerLink="{{ otherRoute() }}" class="btn lg other-btn">Ver {{ otherFormat() === 'pptx' ? 'PowerPoint' : 'Word' }} →</a>
        </div>
        <div class="other-art">W</div>
      </div>
    </section>
  `,
  styles: `
    .page-head {
      position: relative;
      overflow: hidden;
      padding: 72px 0 60px;
      background:
        radial-gradient(60% 120% at 85% -20%, color-mix(in srgb, var(--brand) 26%, transparent), transparent 60%),
        linear-gradient(180deg, var(--soft), transparent 70%);
      border-bottom: 1px solid var(--border);
    }
    .head-wash {
      position: absolute; inset: auto 0 0 0; height: 2px;
      background: var(--brand-grad); opacity: .5; pointer-events: none;
    }
    .head-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 48px; align-items: center; }
    .head-copy { display: flex; flex-direction: column; gap: 14px; position: relative; z-index: 2; }
    .kicker { color: var(--brand); font-weight: 800; text-transform: uppercase; letter-spacing: 2.2px; font-size: 12.5px; display: flex; align-items: center; gap: 8px; }
    .kicker::before { content: ''; width: 22px; height: 3px; border-radius: 99px; background: var(--brand-grad); }
    h1 { margin: 0; font-size: clamp(30px, 5vw, 46px); line-height: 1.08; }
    p { color: var(--text-muted); font-size: 15.5px; line-height: 1.65; margin: 0; max-width: 560px; }
    .head-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; }
    .chip {
      font-size: 12.5px; color: var(--text-muted);
      background: var(--soft-2); border: 1px solid var(--border);
      padding: 7px 12px; border-radius: 99px;
      b { color: var(--text); font-weight: 700; }
    }
    .head-stats {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; position: relative; z-index: 2;
      .stat {
        background: var(--surface); border: 1px solid var(--border);
        border-radius: 16px; padding: 20px 16px; text-align: center;
        backdrop-filter: blur(8px);
        b { display: block; font-size: 24px; font-family: 'Sora'; background: var(--brand-grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
        small { color: var(--text-muted); font-size: 12px; font-weight: 600; }
      }
    }
    @media (max-width: 860px) {
      .head-grid { grid-template-columns: 1fr; gap: 28px; }
      .head-stats { grid-template-columns: repeat(3, 1fr); }
    }

    .office-sec { padding-top: 48px; padding-bottom: 24px; }
    .sec-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 26px; }
    .sec-head h2 { margin: 0; font-size: 24px; }
    .sec-note { color: var(--text-faint); font-size: 13px; font-weight: 600; }

    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 22px; }

    .ocard {
      display: flex; flex-direction: column;
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius); overflow: hidden;
      transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
    }
    .ocard:hover { transform: translateY(-5px); border-color: var(--border-strong); box-shadow: var(--shadow-lg); }

    .omock {
      position: relative; padding: 18px; border-bottom: 1px solid var(--border);
      background:
        radial-gradient(120% 100% at 88% -20%, color-mix(in srgb, var(--c2) 30%, transparent), transparent 60%),
        linear-gradient(145deg, color-mix(in srgb, var(--c1) 22%, #0c0e15), #0c0e15);
    }
    .flag {
      position: absolute; top: 12px; right: 12px;
      font-size: 10.5px; font-weight: 800; letter-spacing: 1px;
      padding: 4px 9px; border-radius: 99px;
      background: rgba(52,211,153,.16); color: var(--success);
      border: 1px solid rgba(52,211,153,.4); backdrop-filter: blur(8px);
    }

    /* mockup slide pptx */
    .slide {
      aspect-ratio: 16 / 9; background: #fff; border-radius: 10px;
      overflow: hidden; display: flex; box-shadow: 0 18px 40px -18px rgba(0,0,0,.55);
      transition: transform .35s ease;
    }
    .ocard:hover .slide { transform: translateY(-4px) rotate(-1deg); }
    .s-side { width: 7%; background: color-mix(in srgb, var(--c2) 85%, white); }
    .s-body { flex: 1; padding: 6% 8%; display: flex; flex-direction: column; gap: 4.5%; }
    .s-title { width: 62%; height: 9%; border-radius: 4px; background: var(--c1); opacity: .92; }
    .s-line { width: 88%; height: 3.4%; border-radius: 3px; background: #cbd2e0; }
    .s-line.w60 { width: 60%; }
    .s-kpis { display: flex; gap: 4%; margin-top: 1%; }
    .s-kpis span { flex: 1; height: 22%; aspect-ratio: 3 / 2.2; border-radius: 6px; background: linear-gradient(135deg, color-mix(in srgb, var(--c2) 55%, white), color-mix(in srgb, var(--c1) 35%, white)); }
    .s-bars { display: flex; align-items: flex-end; gap: 3.5%; margin-top: 2%; height: 30%; }
    .s-bars span { flex: 1; border-radius: 4px 4px 0 0; background: color-mix(in srgb, var(--c2) 70%, #cbd2e0); }
    .s-bars span:nth-child(1) { height: 55%; } .s-bars span:nth-child(2) { height: 78%; }
    .s-bars span:nth-child(3) { height: 42%; } .s-bars span:nth-child(4) { height: 90%; }
    .s-bars span:nth-child(5) { height: 64%; }

    /* mockup doc word */
    .doc {
      aspect-ratio: 3 / 2.4; background: #fff; border-radius: 10px; padding: 5.5% 7%;
      box-shadow: 0 18px 40px -18px rgba(0,0,0,.55); display: flex; flex-direction: column; gap: 3.2%;
      transition: transform .35s ease;
    }
    .ocard:hover .doc { transform: translateY(-4px) rotate(-1deg); }
    .d-head { display: flex; flex-direction: column; gap: 2.2%; }
    .d-kicker { width: 26%; height: 4%; border-radius: 3px; background: color-mix(in srgb, var(--c2) 80%, white); }
    .d-title { width: 74%; height: 9%; border-radius: 4px; background: var(--c1); opacity: .92; }
    .d-rule { height: 2.5px; width: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--c2), transparent); margin-top: 2.5%; }
    .d-line { width: 100%; height: 2.6%; border-radius: 3px; background: #e3e7f0; }
    .d-line.w85 { width: 85%; } .d-line.w70 { width: 70%; } .d-line.w65 { width: 65%; }
    .d-table { display: flex; flex-direction: column; gap: 2.5%; margin: 1% 0; }
    .d-tr { display: flex; gap: 3%; }
    .d-tr i { flex: 1; height: 8px; border-radius: 3px; background: #eef1f7; }
    .d-tr:first-child i { background: linear-gradient(135deg, var(--c2), var(--c1)); opacity: .8; }

    .obody { padding: 18px 18px 20px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .otop { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
    h3 { margin: 0; font-size: 17.5px; }
    .price-free { color: var(--success); font-weight: 800; font-family: 'Sora'; font-size: 14px; }
    .tagline { margin: 0; color: var(--text-muted); font-size: 13.5px; line-height: 1.5; }
    .meta {
      display: flex; gap: 8px; align-items: center; flex-wrap: wrap;
      color: var(--text-faint); font-size: 12.5px; font-weight: 600;
    }
    .cat { color: var(--accent-2); text-transform: uppercase; letter-spacing: .8px; font-size: 11px; }
    .dot { opacity: .5; }

    .more { margin-top: 2px;
      summary {
        cursor: pointer; font-size: 12.5px; font-weight: 700; color: var(--accent-2);
        list-style: none; display: inline-flex; align-items: center; gap: 6px;
        &::-webkit-details-marker { display: none; }
        &::after { content: '▾'; transition: transform .2s; color: var(--text-faint); }
      }
      &[open] summary::after { transform: rotate(180deg); }
      p { margin: 10px 0 8px; font-size: 13px; color: var(--text-muted); line-height: 1.6; }
      ul { margin: 0; padding-left: 18px; display: grid; gap: 4px;
        li { font-size: 12.5px; color: var(--text-muted); }
      }
    }

    .dl {
      margin-top: auto; width: 100%; justify-content: center;
      background: linear-gradient(135deg, var(--c2), var(--c1));
      &:hover { box-shadow: 0 12px 26px -10px color-mix(in srgb, var(--c2) 60%, transparent); }
    }

    .steps-sec { padding-top: 56px; }
    .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 30px; }
    .step {
      background: var(--surface); border: 1px solid var(--border); border-radius: 18px;
      padding: 26px 24px; transition: border-color .2s, transform .2s;
      &:hover { border-color: var(--border-strong); transform: translateY(-3px); }
    }
    .step-num { font-family: 'Sora'; font-size: 22px; font-weight: 800; background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .step h3 { margin: 10px 0 6px; font-size: 16px; }
    .step p { margin: 0; color: var(--text-muted); font-size: 13.5px; line-height: 1.6; }
    @media (max-width: 720px) { .steps { grid-template-columns: 1fr; gap: 12px; } }

    .other-card {
      position: relative; overflow: hidden;
      border-radius: 24px; border: 1px solid var(--border);
      background:
        radial-gradient(80% 140% at 90% 10%, color-mix(in srgb, var(--brand) 30%, transparent), transparent 55%),
        linear-gradient(135deg, var(--soft), transparent);
      padding: 48px 44px; display: flex; align-items: center; justify-content: space-between; gap: 32px;
    }
    .other-copy { display: flex; flex-direction: column; gap: 12px; max-width: 560px; }
    .other-copy h2 { margin: 0; font-size: 28px; }
    .other-copy p { color: var(--text-muted); font-size: 14.5px; line-height: 1.6; margin: 0; }
    .other-btn { background: var(--brand-grad); margin-top: 8px; align-self: flex-start;
      &:hover { box-shadow: 0 14px 30px -10px color-mix(in srgb, var(--brand) 55%, transparent); transform: translateY(-1px); }
    }
    .other-art {
      font-family: 'Sora'; font-weight: 800; font-size: 120px; line-height: 1;
      background: var(--brand-grad); -webkit-background-clip: text; background-clip: text; color: transparent;
      opacity: .55; flex-shrink: 0;
    }
    @media (max-width: 720px) {
      .other-card { flex-direction: column; text-align: left; padding: 36px 28px; }
      .other-art { font-size: 64px; align-self: flex-end; }
    }
  `,
})
export class OfficeComponent {
  readonly format = input.required<OfficeKind>();

  readonly office = inject(OfficeService);

  readonly shown = computed(() => OFFICE_TEMPLATES.filter((t) => t.kind === this.format()));

  readonly cfg = computed<OfficeConfig>(() =>
    this.format() === 'pptx'
      ? {
          kicker: 'Plantillas de PowerPoint',
          title: 'Presentaciones 16:9 editables en PowerPoint',
          subtitle:
            'Decks limpios, corporativos o para invertir. Baja un .pptx real, ábrelo en PowerPoint y reemplaza tu contenido: fuentes, colores y animaciones ya están definidos.',
          brand: '#e2663b',
          gradient: 'linear-gradient(135deg, #ed6c47, #c4452b)',
          stat1: ['4', 'decks editables'],
          stat2: ['8', 'slides por deck'],
          stat3: ['16:9', 'widescreen'],
          steps: [
            { t: 'Descarga el archivo', d: 'Un .pptx real de PowerPoint, listo para abrir. Sin registro ni carrito.' },
            { t: 'Reemplaza tu contenido', d: 'Escribe tus títulos y datos sobre las diapositivas editables.' },
            { t: 'Preséntalo', d: 'Exporta a PDF o proyecta en YouTube, Zoom o en la sala directo.' },
          ],
        }
      : {
          kicker: 'Plantillas de Word',
          title: 'Documentos profesionales editables en Word',
          subtitle:
            'CVs, informes, propuestas y tesis en formato de documento real. Baja un .docx, ábrelo en Word y escribe sobre la estructura ya armada.',
          brand: '#2b579a',
          gradient: 'linear-gradient(135deg, #2b579a, #418ede)',
          stat1: ['4', 'documentos listos'],
          stat2: ['1–5', 'páginas armadas'],
          stat3: ['100%', 'editable'],
          steps: [
            { t: 'Descarga el archivo', d: 'Un .docx real de Word. Abre, edita y exporta cuando quieras.' },
            { t: 'Personalízalo', d: 'Cambia nombre, datos y reemplaza secciones con tu contenido.' },
            { t: 'Compártelo', d: 'Exporta a PDF para enviar, o edítalo en Google Docs también.' },
          ],
        },
  );

  readonly otherFormat = computed<OfficeKind>(() => (this.format() === 'pptx' ? 'docx' : 'pptx'));
  readonly otherRoute = computed(() => (this.format() === 'pptx' ? '/word' : '/powerpoint'));

  readonly otherCfg = computed<OfficeConfig>(() =>
    this.otherFormat() === 'pptx'
      ? {
          kicker: 'Plantillas de PowerPoint',
          title: 'Presentaciones 16:9 editables',
          subtitle: 'Decks minimalistas, corporativos, académicos y de inversión como descargas gratuitas.',
          brand: '#ed6c47',
          gradient: 'linear-gradient(135deg, #ed6c47, #c4452b)',
          stat1: ['', ''],
          stat2: ['', ''],
          stat3: ['', ''],
          steps: [],
        }
      : {
          kicker: 'Plantillas de Word',
          title: 'Documentos profesionales editables',
          subtitle: 'CVs, informes, propuestas comerciales y tesis en formato .docx listos para descargar.',
          brand: '#2b579a',
          gradient: 'linear-gradient(135deg, #2b579a, #418ede)',
          stat1: ['', ''],
          stat2: ['', ''],
          stat3: ['', ''],
          steps: [],
        },
  );
}