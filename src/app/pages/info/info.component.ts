import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';


type PageId = 'soporte' | 'licencia' | 'contacto' | 'sobre' | 'terminos' | 'privacidad' | 'cookies';

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
    lead: 'La ayuda que existe hoy está en estas páginas. No hay un equipo de soporte con plazo de respuesta.',
    cards: [
      { icon: '📦', title: 'Descargas', body: 'PowerPoint y Word se bajan desde su página. Una compra web, si el pago terminó, aparece en Descargas con el código de orden.' },
      { icon: '👁', title: 'Vista previa', body: 'Cada plantilla web se abre en su ficha, en escritorio, tablet o móvil. Eso es lo que puedes revisar antes de pagar.' },
      { icon: '🔑', title: 'Cuenta', body: 'Entrar crea una cuenta local en este servidor. Sirve para ver Mis compras. No recupera contraseña por correo.' },
      { icon: '💳', title: 'Pago', body: 'El carrito usa Webpay en modo de integración, con credenciales de prueba. No es un cobro real.' },
    ],
    faqs: [
      { q: '¿Dónde pido ayuda?', a: 'No hay bandeja de correo conectada. Usa la ficha de la plantilla y la página de licencia para lo que el catálogo ya explica.' },
      { q: '¿El pago descuenta dinero?', a: 'No en esta instalación. Webpay está en modo de integración.' },
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
      { icon: '1', title: 'Un pago', body: 'No hay cuota mensual. El archivo que descargas es el que está publicado ahora; no hay un plan de actualizaciones.' },
    ],
    faqs: [
      { q: '¿Puedo usarla en un proyecto de un cliente?', a: 'Sí. La licencia estándar incluye uso comercial en proyectos para clientes, como parte de tu servicio.' },
      { q: '¿Puedo vender la plantilla tal cual?', a: 'No. Prohibida la reventa o redistribución del archivo original o con cambios mínimos.' },
    ],
  },
  contacto: {
    kicker: 'Contacto',
    title: 'Hablemos',
    lead: 'No hay formulario que envíe correos. Estas son las páginas que sí responden.',
    cards: [
      { icon: '📦', title: 'Descargas', body: 'Revisa una orden en la página Descargas, con el código que deja el checkout de prueba.' },
      { icon: '📄', title: 'Licencia', body: 'Qué puedes hacer con una plantilla está escrito en Licencias, no en un mail de ventas.' },
      { icon: '🖥', title: 'Catálogo', body: 'Las 20 web están en Plantillas. PowerPoint y Word tienen su propia página.' },
      { icon: 'ℹ', title: 'Qué es esto', body: 'Templa es el catálogo que estás viendo: fichas, precios y archivos de Office generados en este proyecto.' },
    ],
  },
  sobre: {
    kicker: 'Qué es Templa',
    title: 'Un catálogo, no una empresa inventada',
    lead: 'Templa muestra 20 plantillas web y 20 de Office. Los precios, las vistas previas y los archivos .pptx y .docx son los de este proyecto.',
    cards: [
      { icon: '20', title: 'Web', body: '5 gratis, 10 premium y 5 gold. La ficha abre la vista previa.' },
      { icon: '20', title: 'Office', body: '10 PowerPoint y 10 Word. Se descargan sin cuenta.' },
      { icon: '0', title: 'Reseñas publicadas', body: 'No hay opiniones de clientes guardadas. Las notas de las fichas son datos de ejemplo del catálogo.' },
      { icon: '1', title: 'Pago', body: 'Un precio por plantilla de pago. No hay suscripción. El checkout de esta copia usa Webpay de prueba.' },
    ],
  },
  terminos: {
    kicker: 'Términos',
    title: 'Cómo se usa este catálogo',
    lead: 'Estas reglas describen lo que hace esta instalación, no un contrato de una tienda en producción.',
    cards: [
      { icon: '1', title: 'Precio', body: 'Si la ficha dice Gratis, no pasa por el carrito. Si tiene precio, es un pago único. Office no se cobra.' },
      { icon: '2', title: 'Vista previa', body: 'La preview de la ficha es para mirar el diseño. No sustituye al archivo de Office ni garantiza un zip de código si ese archivo no está publicado.' },
      { icon: '3', title: 'Cuenta', body: 'El registro vive en el servidor local. Cerrar sesión borra el acceso a Mis compras en este navegador.' },
      { icon: '4', title: 'Reventa', body: 'La página de licencia no permite revender el archivo tal cual.' },
    ],
  },
  privacidad: {
    kicker: 'Privacidad',
    title: 'Qué se guarda en este servidor',
    lead: 'No hay analítica de terceros ni lista de correo. Lo que existe es local.',
    cards: [
      { icon: '✉', title: 'Cuenta', body: 'Si te registras, el servidor guarda nombre, email y una contraseña hasheada en su almacén local.' },
      { icon: '🛒', title: 'Órdenes', body: 'Un checkout de prueba puede dejar una orden con email y el id de las plantillas.' },
      { icon: '☀', title: 'Tema', body: 'Claro u oscuro se recuerda en el navegador, no en una cuenta.' },
      { icon: '✕', title: 'Lo que no hay', body: 'No se envían newsletters ni se venden datos. El formulario de contacto antiguo no escribía a nadie: ya no está.' },
    ],
  },
  cookies: {
    kicker: 'Cookies',
    title: 'Qué recuerda el navegador',
    lead: 'No hay banner de cookies de marketing porque no hay cookies de marketing.',
    cards: [
      { icon: '☀', title: 'Tema', body: 'La preferencia claro/oscuro queda en localStorage.' },
      { icon: '🛒', title: 'Carrito', body: 'Las plantillas que añades se guardan en el navegador hasta que vacías el carrito.' },
      { icon: '🔑', title: 'Sesión', body: 'Al entrar, el token de sesión queda en el navegador para Mis compras y Admin.' },
      { icon: '0', title: 'Publicidad', body: 'No hay píxeles ni cookies de anuncios en esta app.' },
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

      <div class="acts">
        <a routerLink="/templates" class="btn primary">Ver plantillas</a>
        <a routerLink="/descargas" class="btn ghost">Descargas</a>
        <a routerLink="/info/licencia" class="btn ghost">Licencia</a>
      </div>
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
    .acts { display:flex; flex-wrap:wrap; gap:10px; margin-top:8px; }
  `,
})
export class InfoPageComponent {
  private route = inject(ActivatedRoute);

  readonly id = this.route.snapshot.paramMap.get('page') as PageId;

  content(): PageContent {
    return CONTENT[this.id] ?? {
      kicker: 'No está',
      title: 'Esa página no existe',
      lead: 'El enlace no corresponde a una sección de Templa.',
      cards: [],
    };
  }
}
