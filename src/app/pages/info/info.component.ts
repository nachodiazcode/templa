import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';

type PageId = 'soporte' | 'licencia' | 'contacto';

interface PageContent {
  kicker: string;
  title: string;
  lead: string;
  cards: { icon: string; title: string; body: string }[];
  faqs?: { q: string; a: string }[];
}

const CONTENT: Record<PageId, PageContent> = {
  soporte: {
    kicker: 'Centro de ayuda',
    title: '¿Cómo podemos ayudarte?',
    lead: 'Encontrá respuestas rápidas, guías paso a paso o contactá con nuestro equipo de soporte. Respondemos en menos de 24 horas.',
    cards: [
      { icon: '📦', title: 'Descarga de plantillas', body: 'Guías para recuperar tus compras y gestionar tus descargas desde el panel de cliente.' },
      { icon: '🛠️', title: 'Personalización', body: 'Documentación para adaptar colores, textos y secciones de tu plantilla sin tocar lógica.' },
      { icon: '🔑', title: 'Cuenta y acceso', body: 'Recuperar contraseña, actualizar datos o gestionar el rol de tu cuenta.' },
      { icon: '💳', title: 'Pagos y licencias', body: 'Dudas sobre Webpay, facturación y condiciones de la licencia comercial.' },
    ],
    faqs: [
      { q: '¿Cuánto tardan en responder?', a: 'Respondemos en menos de 24 horas hábiles. La mayoría de dudas se resuelven en el primer mensaje.' },
      { q: '¿Ofrecen soporte después de la compra?', a: 'Sí, cada plantilla incluye 24 horas de soporte por email del autor, y atención del equipo por 30 días.' },
    ],
  },
  licencia: {
    kicker: 'Licencias',
    title: 'Usá tu plantilla con total libertad',
    lead: 'Compra una vez, usá para siempre. Nuestra licencia está pensada para que desarrolles sin fricción: proyectos propios y de clientes.',
    cards: [
      { icon: '✅', title: 'Uso personal', body: 'Proyectos personales, portfolios y experimentos sin límite de páginas ni de proyectos.' },
      { icon: '💼', title: 'Uso comercial', body: 'Usá la plantilla en proyectos para clientes o productos propios con fines de lucro.' },
      { icon: '🔁', title: 'Reventa del código', body: 'No está permitido revender, redistribuir ni sublicenciar la plantilla o su código fuente.' },
      { icon: '♾️', title: 'Actualizaciones', body: 'Acceso a todas las actualizaciones futuras de la plantilla sin coste adicional.' },
    ],
    faqs: [
      { q: '¿Puedo usarla en un proyecto de un cliente?', a: 'Sí. La licencia estándar incluye uso comercial en proyectos para clientes, como parte de tu servicio.' },
      { q: '¿Puedo vender la plantilla tal cual?', a: 'No. Prohibida la reventa o redistribución del archivo original o con cambios mínimos.' },
    ],
  },
  contacto: {
    kicker: 'Contacto',
    title: 'Hablemos',
    lead: '¿Dudas, sugerencias o querés una plantilla a medida? Escribinos y te respondemos a la brevedad.',
    cards: [
      { icon: '📧', title: 'Email', body: 'hola@templa.cl — para soporte y ventas.' },
      { icon: '𝕏', title: 'Redes', body: 'Seguinos en X y LinkedIn para novedades y promociones.' },
      { icon: '🤝', title: 'Afiliados', body: 'Promocioná Templa y ganá 30% por cada venta referida.' },
      { icon: '🎨', title: 'Trabajo a medida', body: '¿Necesitás un template específico? Contanos tu idea y te cotizamos.' },
    ],
  },
};

@Component({
  selector: 'app-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="wrap container">
      <a routerLink="/" class="back">← Volver al inicio</a>

      <div class="hero">
        <span class="kicker">{{ content().kicker }}</span>
        <h1>{{ content().title }}</h1>
        <p>{{ content().lead }}</p>
      </div>

      <div class="grid">
        @for (card of content().cards; track $index) {
          <article class="card">
            <div class="ic">{{ card.icon }}</div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.body }}</p>
          </article>
        }
      </div>

      @if (content().faqs?.length) {
        <div class="faq">
          <h2>Preguntas frecuentes</h2>
          @for (f of content().faqs; track f.q) {
            <details>
              <summary>{{ f.q }}</summary>
              <p>{{ f.a }}</p>
            </details>
          }
        </div>
      }

      @if (id === 'contacto') {
        <form class="contact" (submit)="send($event)">
          <h2>Envianos un mensaje</h2>
          <div class="row">
            <input type="text" placeholder="Tu nombre" required />
            <input type="email" placeholder="Tu email" required />
          </div>
          <textarea placeholder="¿En qué podemos ayudarte?" rows="5" required></textarea>
          <button class="btn primary" type="submit">Enviar mensaje</button>
        </form>
      }
    </div>
  `,
  styles: `
    .wrap { padding: 56px 0 40px; min-height: 70vh; }
    .back { display:inline-flex; color:var(--text-muted); font-size:13.5px; font-weight:600; margin-bottom:36px; transition:color .2s; }
    .back:hover { color:var(--text); }
    .hero { max-width:640px; margin-bottom:40px; }
    .kicker { color:var(--accent-2); font-weight:800; text-transform:uppercase; letter-spacing:2.4px; font-size:12px; }
    h1 { font-size:clamp(28px,5vw,44px); margin:12px 0 14px; letter-spacing:-.8px; }
    .hero p { color:var(--text-muted); font-size:16px; line-height:1.65; margin:0; }
    .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:16px; margin-bottom:48px; }
    .card { background:var(--surface); border:1px solid var(--border); border-radius:18px; padding:24px; transition:transform .2s, border-color .2s; }
    .card:hover { transform:translateY(-3px); border-color:var(--border-strong); }
    .ic { width:44px; height:44px; border-radius:12px; background:var(--soft); display:grid; place-items:center; font-size:20px; margin-bottom:16px; }
    .card h3 { margin:0 0 8px; font-size:16px; }
    .card p { margin:0; color:var(--text-muted); font-size:14px; line-height:1.6; }
    .faq { max-width:720px; margin:0 auto; }
    .faq h2, .contact h2 { font-size:22px; margin-bottom:18px; }
    details { border:1px solid var(--border); border-radius:12px; padding:16px 20px; margin-bottom:10px; background:var(--surface); }
    summary { cursor:pointer; font-weight:600; font-size:15px; }
    details p { margin:12px 0 0; color:var(--text-muted); font-size:14px; line-height:1.6; }
    .contact { max-width:640px; margin:48px auto 0; padding-top:40px; border-top:1px solid var(--border); display:flex; flex-direction:column; gap:14px; }
    .row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
    input, textarea {
      width:100%; background:var(--surface); border:1px solid var(--border-strong); border-radius:11px;
      padding:13px 16px; color:var(--text); font-size:14px; outline:none; font-family:inherit; box-sizing:border-box;
      transition:border-color .2s; &:focus { border-color: var(--accent); }
      &::placeholder { color: var(--text-faint); }
    }
    textarea { resize:vertical; }
    .contact .btn { align-self:flex-start; }
    @media (max-width:600px){ .row { grid-template-columns:1fr; } }
  `,
})
export class InfoPageComponent {
  private route = inject(ActivatedRoute);
  private toast = inject(ToastService);

  readonly id = this.route.snapshot.paramMap.get('page') as PageId;

  content(): PageContent {
    return CONTENT[this.id] ?? CONTENT.soporte;
  }

  send(e: Event): void {
    e.preventDefault();
    this.toast.show('Mensaje enviado. Te responderemos a la brevedad.', 'info');
    (e.target as HTMLFormElement).reset();
  }
}
