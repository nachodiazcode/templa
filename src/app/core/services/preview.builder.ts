import { TemplateItem } from '../models/template.model';
import { CATEGORY_LABELS } from '../models/template.model';
import { previewNav, previewFooter, previewWrap } from './preview-shared';

/**
 * Router principal: despacha al renderer específico según categoría.
 */
export function buildPreviewHtml(t: TemplateItem): string {
  switch (t.category) {
    case 'dashboard':      return buildDashboardPreview(t);
    case 'admin-panel':    return buildAdminPanelPreview(t);
    case 'ecommerce':      return buildEcommercePreview(t);
    case 'documentation':  return buildDocsPreview(t);
    case 'education':      return buildEducationPreview(t);
    case 'portfolio':      return buildPortfolioPreview(t);
    case 'blog':           return buildBlogPreview(t);
    case 'agency':         return buildAgencyPreview(t);
    case 'saas':
    case 'landing':
    default:               return buildGenericPreview(t);
  }
}

/* ═══════════════════════════════════════════
   GENERIC (Landing / SaaS fallback)
   ═══════════════════════════════════════════ */
function buildGenericPreview(t: TemplateItem): string {
  const [c1, c2] = t.colors;
  const cat = CATEGORY_LABELS[t.category];
  const price = t.price === 0 ? 'Gratis' : `$${t.price}`;

  const nav = previewNav(t.name, c1, c2);

  const hero = `
    <div class="mesh"></div>
    <header>
      <span class="pill">${cat} · v2.4 · Premium</span>
      <h1>${t.tagline}</h1>
      <p class="lead">${t.description.split('.')[0]}. Diseñada al detalle, lista para producción.</p>
      <div class="ctas">
        <button class="primary">Probar ${price} <b aria-hidden="true">→</b></button>
        <button class="ghost">Ver demo</button>
      </div>
      <div class="meta">★ ${t.rating} · ${t.sales.toLocaleString('es')} ventas · ${t.pages} páginas · Lighthouse 98</div>
      <div class="marquee" aria-hidden="true"><span>${t.name}</span><i>✦</i><span>HTML5</span><i>✦</i><span>PREMIUM</span><i>✦</i><span>VELOZ</span><i>✦</i><span>${t.name}</span><i>✦</i><span>HTML5</span><i>✦</i></div>
    </header>`;

  const cards = t.features.slice(0, 6).map((f, i) => `
    <div class="card" style="--i:${i}">
      <div class="ic"></div><b>${f}</b><small>Incluido en ${t.name}</small>
    </div>`).join('');

  const stats = `
    <section class="stats">
      <div><b>${t.sales.toLocaleString('es')}+</b><span>ventas</span></div>
      <div><b>${t.rating}★</b><span>valoración</span></div>
      <div><b>${t.pages}</b><span>páginas</span></div>
      <div><b>98</b><span>Lighthouse</span></div>
    </section>

    <section class="quotes">
      <div class="qcard"><div class="stars">★★★★★</div><p>«Lista para producción. La abrimos y quedó online el mismo día.»</p><small><b>María</b> · Cliente</small></div>
      <div class="qcard"><div class="stars">★★★★★</div><p>«Estética premium y cero peso de más. Impresionante.»</p><small><b>Diego</b> · CTO</small></div>
    </section>`;

  const extra = `
    .mesh{position:fixed;inset:-20%;z-index:-1;filter:blur(60px);
      background:radial-gradient(42% 38% at 18% 12%,${c1}42,transparent 70%),
                 radial-gradient(36% 34% at 82% 22%,${c2}35,transparent 70%),
                 radial-gradient(44% 40% at 55% 88%,${c1}22,transparent 70%);
      animation:drift 22s ease-in-out infinite alternate}
    @keyframes drift{to{transform:translate(-4%,5%) scale(1.12) rotate(-4deg)}}
    header{position:relative;text-align:center;padding:84px 24px 56px;max-width:820px;margin:0 auto;overflow:hidden}
    .lead{color:#98a1b3;font-size:16px;line-height:1.65;max-width:520px;margin:0 auto}
    .ctas{display:flex;gap:12px;justify-content:center;margin-top:28px}
    .ctas b{font-weight:900}
    .meta{margin-top:26px;color:#6b7385;font-size:12.5px;letter-spacing:.4px}
    .marquee{overflow:hidden;margin-top:52px;border-block:1px solid #ffffff12;padding:12px 0;
      max-width:100%;mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
    .marquee span{font-weight:800;letter-spacing:.22em;color:#6b7385;font-size:13px;animation:x 16s linear infinite;display:inline-block}
    .marquee i{color:${c1};font-style:normal;font-weight:800;letter-spacing:.22em;font-size:13px;animation:x 16s linear infinite}
    @keyframes x{to{transform:translateX(-100%)}}
    .stats{display:flex;justify-content:center;gap:54px;padding:36px 20px;border-top:1px solid #ffffff10;
           border-bottom:1px solid #ffffff10;margin:30px 60px 0;flex-wrap:wrap}
    .stats div{text-align:center}.stats b{font-size:24px;display:block}
    .stats span{color:#6b7385;font-size:12px;text-transform:uppercase;letter-spacing:1.4px}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:16px;padding:56px 48px;max-width:1080px;margin:0 auto}
    .card{border:1px solid #ffffff14;background:rgba(255,255,255,.035);backdrop-filter:blur(12px);border-radius:16px;padding:22px;opacity:0;transform:translateY(16px);
          animation:up .5s forwards calc(var(--i)*90ms);transition:.25s}
    .card:hover{transform:translateY(-4px)!important;border-color:${t.accent}66}
    .ic{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,${c1},${c2});margin-bottom:14px;opacity:.9;box-shadow:0 6px 18px ${c1}55}
    .card b{display:block;font-size:14.5px;margin-bottom:6px;line-height:1.35}
    .card small{color:#6b7385;font-size:12px}
    .quotes{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;max-width:1080px;margin:8px auto 0;padding:0 48px}
    .qcard{border:1px solid #ffffff14;background:rgba(255,255,255,.03);border-radius:16px;padding:24px}
    .qcard p{color:#c6cddc;font-size:14px;line-height:1.55;margin:8px 0 14px}
    .qcard b{color:#fff;font-size:13px}
    .qcard small{color:#6b7385;font-size:12px}
    .stars{color:${c1};letter-spacing:2px}
    @media(max-width:640px){.stats{gap:26px}.grid,.quotes{padding:20px}.quotes{grid-template-columns:1fr}}`;

  return previewWrap(t, `${nav}${hero}${stats}<div class="grid">${cards}</div>${previewFooter(t.name)}`, extra);
}

/* ═══════════════════════════════════════════
   E-COMMERCE
   ═══════════════════════════════════════════ */
function buildEcommercePreview(t: TemplateItem): string {
  const [c1, c2] = t.colors;
  const products = [
    { name: 'Aurora Pro Kit', price: '$29', old: '$49', rating: '4.9' },
    { name: 'Vertex Bundle', price: '$49', old: '', rating: '4.8' },
    { name: 'Nova SaaS UI', price: '$39', old: '$59', rating: '4.7' },
    { name: 'Pulse Dashboard', price: '$59', old: '', rating: '4.9' },
  ];

  const nav = `
    <nav>
      <div class="brand"><span class="dot"></span>${t.name}</div>
      <div class="links">
        <a class="active">Tienda</a><a>Categorías</a><a>Nuevos</a>
        <span style="position:relative;cursor:pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#98a1b3" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span style="position:absolute;top:-6px;right:-8px;background:linear-gradient(135deg,${c1},${c2});color:#fff;font-size:10px;font-weight:800;width:16px;height:16px;border-radius:50%;display:grid;place-items:center">3</span>
        </span>
        <button class="cta">Comprar</button>
      </div>
    </nav>`;

  const hero = `
    <header>
      <span class="pill">Premium Templates</span>
      <h1>${t.tagline}</h1>
      <p style="color:#98a1b3;font-size:16px;line-height:1.65;max-width:520px;margin:0 auto">
        ${t.description.split('.')[0]}.
      </p>
      <div style="display:flex;gap:12px;justify-content:center;margin-top:28px">
        <button class="primary">Ver catálogo</button>
        <button class="ghost">Ofertas</button>
      </div>
    </header>`;

  const cats = ['Todos', 'Landings', 'Dashboards', 'E-commerce', 'Portfolios'].map((c, i) =>
    `<span style="padding:8px 18px;border-radius:99px;font-size:13px;font-weight:600;cursor:pointer;transition:.2s;
      ${i === 0
        ? `background:linear-gradient(135deg,${c1},${c2});color:#fff`
        : 'background:#ffffff08;color:#98a1b3;border:1px solid #ffffff12'}">${c}</span>`
  ).join('');

  const productCards = products.map((p, i) => `
    <div class="pcard" style="--i:${i}">
      <div class="pimg" style="background:linear-gradient(135deg,color-mix(in srgb,${c1} 30%,#12151d),#12151d)">
        <div class="pbrowser"><div class="pbar"><i></i><i></i><i></i></div>
        <div class="ppage"><div class="pline w70"></div><div class="pline w50"></div><div class="pbtn"></div></div></div>
      </div>
      <div class="pinfo">
        <div style="display:flex;justify-content:space-between;align-items:baseline">
          <b style="font-size:15px">${p.name}</b>
          <div style="display:flex;align-items:baseline;gap:6px">
            ${p.old ? `<s style="color:#4b5568;font-size:12px">${p.old}</s>` : ''}
            <span style="font-family:'Sora';font-weight:800;font-size:17px;color:${c1}">${p.price}</span>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
          <span style="font-size:12px;color:#6b7385">★ ${p.rating}</span>
          <button style="background:linear-gradient(135deg,${c1},${c2});border:none;color:#fff;padding:7px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer">Agregar</button>
        </div>
      </div>
    </div>`).join('');

  const extra = `
    header{text-align:center;padding:70px 24px 40px;max-width:700px;margin:0 auto}
    .cats{display:flex;gap:10px;justify-content:center;padding:20px 48px;flex-wrap:wrap}
    .pgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;padding:20px 48px;max-width:1100px;margin:0 auto}
    .pcard{background:#12151d;border:1px solid #ffffff14;border-radius:16px;overflow:hidden;opacity:0;transform:translateY(16px);animation:up .5s forwards calc(var(--i)*80ms);transition:.25s}
    .pcard:hover{transform:translateY(-4px)!important;border-color:${c1}66;animation-play-state:paused!important;opacity:1}
    .pimg{height:160px;padding:16px;display:flex;align-items:flex-end}
    .pbrowser{width:100%;background:rgba(8,9,14,.85);border:1px solid #ffffff14;border-radius:10px 10px 0 0;padding:0 10px}
    .pbar{display:flex;gap:4px;padding:7px 0 5px}.pbar i{width:6px;height:6px;border-radius:99px;background:#2a3042}.pbar i:first-child{background:${c1}}
    .ppage{padding:8px 0 12px}.pline{height:8px;border-radius:4px;background:#ffffff12;margin-bottom:6px}.w70{width:70%}.w50{width:50%}
    .pbtn{width:50px;height:12px;border-radius:4px;background:linear-gradient(135deg,${c1},${c2});margin-top:6px}
    .pinfo{padding:16px;display:flex;flex-direction:column;gap:4px}
    .shopbar{display:flex;justify-content:center;gap:16px;padding:36px 48px;border-top:1px solid #ffffff10;margin-top:20px;flex-wrap:wrap}
    .shopbar div{text-align:center}.shopbar b{font-size:22px;display:block}.shopbar span{color:#6b7385;font-size:11px;text-transform:uppercase;letter-spacing:1.2px}
    @media(max-width:640px){.pgrid{grid-template-columns:1fr 1fr;padding:20px}}`;

  const shopStats = `
    <div class="shopbar">
      <div><b>${t.sales.toLocaleString('es')}+</b><span>ventas</span></div>
      <div><b>★ ${t.rating}</b><span>valoración</span></div>
      <div><b>${t.pages}</b><span>productos</span></div>
      <div><b>24h</b><span>entrega</span></div>
    </div>`;

  return previewWrap(t, `${nav}${hero}<div class="cats">${cats}</div><div class="pgrid">${productCards}</div>${shopStats}${previewFooter(t.name)}`, extra);
}

/* ═══════════════════════════════════════════
   PORTFOLIO
   ═══════════════════════════════════════════ */
function buildPortfolioPreview(t: TemplateItem): string {
  const [c1, c2] = t.colors;
  const projects = [
    { name: 'Branding App Móvil', cat: 'Branding' },
    { name: 'Rediseño Web Fintech', cat: 'UI/UX' },
    { name: 'Campaña Instagram', cat: 'Social Media' },
    { name: 'Dashboard Analytics', cat: 'UI/UX' },
    { name: 'Landing SaaS', cat: 'Web Design' },
    { name: 'App Delivery', cat: 'Mobile' },
  ];

  const nav = previewNav(t.name, c1, c2, ['Proyectos', 'Sobre mí', 'Servicios', 'Contacto']);

  const hero = `
    <header style="text-align:center;padding:90px 24px 50px;max-width:680px;margin:0 auto">
      <span class="pill">Portfolio · ${t.name}</span>
      <h1>${t.tagline}</h1>
      <p style="color:#98a1b3;font-size:15px;line-height:1.65">${t.description.split('.')[0]}.</p>
      <div style="margin-top:24px;color:#6b7385;font-size:12.5px">★ ${t.rating} · ${t.sales.toLocaleString('es')} descargas</div>
    </header>`;

  const grid = projects.map((p, i) => `
    <div class="proj" style="--i:${i};--hue:${i * 45}">
      <div class="proj-img" style="background:linear-gradient(${135 + i * 20}deg,color-mix(in srgb,${c1} ${40 - i * 5}%,#1a1d28),#0c0e15)">
        <div class="proj-overlay"><span class="proj-cat">${p.cat}</span><span class="proj-name">${p.name}</span></div>
      </div>
    </div>`).join('');

  const extra = `
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:0 48px;max-width:1000px;margin:0 auto}
    .proj{border-radius:14px;overflow:hidden;cursor:pointer;opacity:0;animation:up .5s forwards calc(var(--i)*80ms)}
    .proj-img{aspect-ratio:4/3;position:relative;transition:transform .35s}
    .proj:hover .proj-img{transform:scale(1.03)}
    .proj-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.8));
      display:flex;flex-direction:column;justify-content:flex-end;padding:18px;opacity:0;transition:opacity .3s}
    .proj:hover .proj-overlay{opacity:1}
    .proj-cat{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${c1};margin-bottom:4px}
    .proj-name{font-size:15px;font-weight:700;color:#fff}
    .socials{display:flex;gap:14px;justify-content:center;margin-top:40px}
    .socials span{width:40px;height:40px;border-radius:10px;background:#ffffff0a;border:1px solid #ffffff12;display:grid;place-items:center;
      color:#6b7385;font-size:14px;cursor:pointer;transition:.2s}
    .socials span:hover{background:${c1}22;color:${c1};border-color:${c1}44}
    @media(max-width:700px){.grid{grid-template-columns:1fr 1fr;padding:0 20px}}`;

  return previewWrap(t, `${nav}${hero}<div class="grid">${grid}</div>
    <div class="socials"><span>𝕏</span><span>in</span><span>ig</span><span>gh</span></div>${previewFooter(t.name)}`, extra);
}

/* ═══════════════════════════════════════════
   BLOG
   ═══════════════════════════════════════════ */
function buildBlogPreview(t: TemplateItem): string {
  const [c1, c2] = t.colors;

  const nav = previewNav(t.name, c1, c2, ['Artículos', 'Categorías', 'Sobre', 'Newsletter']);

  const featured = `
    <header style="padding:60px 48px 0;max-width:1000px;margin:0 auto">
      <div style="display:grid;grid-template-columns:1.3fr 1fr;gap:36px;align-items:center">
        <div>
          <span class="pill">Destacado</span>
          <h1 style="font-size:clamp(24px,4vw,36px);margin:16px 0 12px">${t.tagline}</h1>
          <p style="color:#98a1b3;font-size:14.5px;line-height:1.7">${t.description.split('.')[0]}.</p>
          <div style="margin-top:20px;display:flex;gap:16px;align-items:center">
            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,${c1},${c2})"></div>
            <div><span style="font-size:13px;font-weight:700">Admin</span><br><span style="font-size:12px;color:#6b7385">Hace 2 días · 8 min lectura</span></div>
          </div>
        </div>
        <div style="aspect-ratio:16/10;border-radius:16px;background:linear-gradient(135deg,color-mix(in srgb,${c1} 25%,#12151d),#0c0e15);
          border:1px solid #ffffff14;display:flex;align-items:center;justify-content:center">
          <div style="text-align:center;color:#4b5568;font-size:13px">📸 Artículo destacado</div>
        </div>
      </div>
    </header>`;

  const posts = [
    { title: 'Guía completa de Angular Signals', cat: 'Angular', time: '12 min', date: 'Hace 3 días' },
    { title: '10 tips de UI/UX para tu SaaS', cat: 'Diseño', time: '6 min', date: 'Hace 5 días' },
    { title: 'Cómo elegir la plantilla correcta', cat: 'Guías', time: '8 min', date: 'Hace 1 semana' },
    { title: 'Tendencias web 2026', cat: 'Tendencias', time: '5 min', date: 'Hace 2 semanas' },
  ];

  const postCards = posts.map((p, i) => `
    <div class="post" style="--i:${i}">
      <div class="post-thumb" style="background:linear-gradient(${120 + i * 30}deg,color-mix(in srgb,${c1} ${20 + i * 5}%,#161922),#0c0e15)"></div>
      <div class="post-body">
        <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:${c1}">${p.cat}</span>
        <h3 style="margin:6px 0;font-size:15px;line-height:1.35">${p.title}</h3>
        <div style="font-size:12px;color:#6b7385;margin-top:auto">${p.date} · ${p.time} lectura</div>
      </div>
    </div>`).join('');

  const sidebar = `
    <aside class="sidebar">
      <div style="background:linear-gradient(135deg,${c1}22,${c2}18);border:1px solid ${c1}33;border-radius:14px;padding:22px;margin-bottom:20px">
        <b style="font-size:14px;display:block;margin-bottom:6px">Newsletter</b>
        <p style="font-size:12.5px;color:#98a1b3;margin:0 0 12px">Recibe los mejores artículos cada semana.</p>
        <div style="display:flex;gap:6px">
          <input style="flex:1;background:#0b0d12;border:1px solid #ffffff15;border-radius:8px;padding:9px 12px;color:#e7eaf2;font-size:12px" placeholder="tu@email.com" />
          <button style="background:linear-gradient(135deg,${c1},${c2});border:none;color:#fff;padding:9px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer">→</button>
        </div>
      </div>
      <div style="background:#12151d;border:1px solid #ffffff14;border-radius:14px;padding:18px">
        <b style="font-size:13px;display:block;margin-bottom:12px">Categorías</b>
        ${['Angular', 'Diseño', 'SaaS', 'Tendencias', 'Guías'].map(c =>
          `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #ffffff08;font-size:13px;color:#98a1b3;cursor:pointer">
            <span>${c}</span><span style="color:#4b5568">(${Math.floor(Math.random() * 20 + 5)})</span>
          </div>`).join('')}
      </div>
    </aside>`;

  const extra = `
    .posts{display:grid;grid-template-columns:1.5fr 1fr;gap:30px;padding:40px 48px;max-width:1000px;margin:0 auto}
    .post-list{display:flex;flex-direction:column;gap:16px}
    .post{display:flex;gap:16px;background:#12151d;border:1px solid #ffffff14;border-radius:14px;overflow:hidden;cursor:pointer;
      opacity:0;animation:up .5s forwards calc(var(--i)*80ms);transition:.25s}
    .post:hover{border-color:${c1}44;transform:translateY(-2px)}
    .post-thumb{width:120px;flex-shrink:0}
    .post-body{padding:14px 16px 14px 0;display:flex;flex-direction:column;flex:1}
    .sidebar{position:sticky;top:80px;align-self:start}
    @media(max-width:800px){.posts{grid-template-columns:1fr;padding:20px}header>div{grid-template-columns:1fr!important}}`;

  return previewWrap(t, `${nav}${featured}<div class="posts"><div class="post-list">${postCards}</div>${sidebar}</div>${previewFooter(t.name)}`, extra);
}

/* ═══════════════════════════════════════════
   SaaS / AGENCY
   ═══════════════════════════════════════════ */
function buildAgencyPreview(t: TemplateItem): string {
  const [c1, c2] = t.colors;

  const nav = previewNav(t.name, c1, t.accent, ['Servicios', 'Casos', 'Equipo', 'Contacto']);

  const hero = `
    <header style="text-align:center;padding:80px 24px 50px;max-width:720px;margin:0 auto">
      <span class="pill">Agency · ${t.name}</span>
      <h1>${t.tagline}</h1>
      <p style="color:#98a1b3;font-size:16px;line-height:1.65;max-width:520px;margin:0 auto">
        ${t.description.split('.')[0]}.
      </p>
      <div style="display:flex;gap:12px;justify-content:center;margin-top:28px">
        <button class="primary">Agendar llamada</button>
        <button class="ghost">Ver casos</button>
      </div>
    </header>`;

  const services = ['UI/UX Design', 'Desarrollo Web', 'Branding', 'Marketing Digital'].map((s, i) => `
    <div class="svc" style="--i:${i}">
      <div style="width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,${c1},${c2});display:grid;place-items:center;margin-bottom:14px">
        <span style="font-size:18px">${['🎨', '💻', '✨', '📈'][i]}</span>
      </div>
      <b style="font-size:15px;display:block;margin-bottom:6px">${s}</b>
      <small style="color:#6b7385;font-size:12.5px;line-height:1.5">Soluciones a medida para tu negocio con tecnología de vanguardia.</small>
    </div>`).join('');

  const cases = [
    { name: 'Fintech Corp', result: '+340% ROI' },
    { name: 'RetailPro', result: '+120% ventas' },
    { name: 'HealthApp', result: '50K usuarios' },
  ];

  const caseCards = cases.map((c, i) => `
    <div class="case" style="--i:${i}">
      <div style="height:120px;background:linear-gradient(${135 + i * 40}deg,color-mix(in srgb,${c1} ${30 - i * 8}%,#14171f),#0c0e15);border-radius:12px 12px 0 0"></div>
      <div style="padding:16px">
        <b style="font-size:14px">${c.name}</b>
        <div style="font-size:13px;color:${c1};font-weight:700;margin-top:4px">${c.result}</div>
      </div>
    </div>`).join('');

  const logos = ['StartupCo', 'TechLab', 'DataFlow', 'CloudBase', 'Innovate'].map(l =>
    `<span style="font-size:14px;font-weight:700;color:#2a3042;letter-spacing:1px">${l}</span>`
  ).join('');

  const extra = `
    .svcs{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:0 48px;max-width:1000px;margin:0 auto}
    .svc{background:#12151d;border:1px solid #ffffff14;border-radius:16px;padding:24px;opacity:0;animation:up .5s forwards calc(var(--i)*80ms);transition:.25s}
    .svc:hover{border-color:${c1}44;transform:translateY(-3px)}
    .logos{display:flex;justify-content:center;gap:40px;padding:40px 48px;border-top:1px solid #ffffff10;border-bottom:1px solid #ffffff10;margin:40px 60px;flex-wrap:wrap}
    .cases{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:0 48px;max-width:1000px;margin:0 auto}
    .case{background:#12151d;border:1px solid #ffffff14;border-radius:16px;overflow:hidden;cursor:pointer;opacity:0;animation:up .5s forwards calc(var(--i)*80ms);transition:.25s}
    .case:hover{border-color:${c1}44;transform:translateY(-3px)}
    .cta-section{text-align:center;padding:60px 24px;margin-top:20px}
    @media(max-width:800px){.svcs,.cases{grid-template-columns:1fr 1fr;padding:0 20px}.logos{gap:20px}}`;

  return previewWrap(t, `${nav}${hero}<div class="svcs">${services}</div>
    <div class="logos">${logos}</div>
    <div style="text-align:center;margin:40px 0 24px"><h2 style="font-size:24px">Casos de éxito</h2></div>
    <div class="cases">${cases.map((c, i) => `<div class="case" style="--i:${i}">
      <div style="height:120px;background:linear-gradient(${135 + i * 40}deg,color-mix(in srgb,${c1} ${30 - i * 8}%,#14171f),#0c0e15);border-radius:12px 12px 0 0"></div>
      <div style="padding:16px"><b style="font-size:14px">${c.name}</b><div style="font-size:13px;color:${c1};font-weight:700;margin-top:4px">${c.result}</div></div>
    </div>`).join('')}</div>
    <div class="cta-section"><h2 style="font-size:24px;margin-bottom:16px">¿Listo para crecer?</h2>
    <button class="primary" style="font-size:16px;padding:16px 36px">Contactar ahora</button></div>
    ${previewFooter(t.name)}`, extra);
}

/* ═══════════════════════════════════════════
   DOCUMENTATION
   ═══════════════════════════════════════════ */
function buildDocsPreview(t: TemplateItem): string {
  const [c1, c2] = t.colors;
  const accent = t.accent;

  const nav = `
    <nav style="display:flex;justify-content:space-between;align-items:center;padding:14px 24px;position:sticky;top:0;
      backdrop-filter:blur(14px);background:rgba(11,13,18,.85);border-bottom:1px solid #ffffff12;z-index:9">
      <div style="display:flex;align-items:center;gap:10px">
        <span style="width:22px;height:22px;border-radius:7px;background:linear-gradient(135deg,${c1},${c2})"></span>
        <b style="font-size:16px">${t.name}</b>
        <span style="font-size:11px;padding:3px 8px;border-radius:6px;background:${accent}18;color:${accent};font-weight:700">v2.4</span>
      </div>
      <div style="display:flex;align-items:center;gap:16px">
        <div style="display:flex;align-items:center;gap:8px;background:#ffffff08;border:1px solid #ffffff12;border-radius:8px;padding:7px 12px;width:200px">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4b5568" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <span style="color:#4b5568;font-size:12px">Cmd+K para buscar...</span>
        </div>
        <span style="color:#6b7385;font-size:13px;cursor:pointer">GitHub ↗</span>
      </div>
    </nav>`;

  const sidebar = `
    <aside style="width:240px;flex-shrink:0;padding:20px 16px;border-right:1px solid #ffffff10;overflow-y:auto;height:calc(100vh - 52px);position:sticky;top:52px">
      <div style="font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#4b5568;font-weight:700;padding:8px 0">Getting Started</div>
      ${['Instalación', 'Configuración rápida', 'Primeros pasos'].map((item, i) =>
        `<div style="padding:7px 12px;font-size:13px;border-radius:7px;cursor:pointer;margin-bottom:2px;
          ${i === 0 ? `background:${c1}18;color:${accent};font-weight:600` : 'color:#7a859a'}">${item}</div>`
      ).join('')}
      <div style="font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#4b5568;font-weight:700;padding:12px 0 8px">Core</div>
      ${['Conceptos', 'Componentes', 'Routing', 'Estado'].map(item =>
        `<div style="padding:7px 12px;font-size:13px;border-radius:7px;color:#7a859a;cursor:pointer;margin-bottom:2px">${item}</div>`
      ).join('')}
      <div style="font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#4b5568;font-weight:700;padding:12px 0 8px">API Reference</div>
      ${['Configuración', 'Hooks', 'Utilities', 'Types'].map(item =>
        `<div style="padding:7px 12px;font-size:13px;border-radius:7px;color:#7a859a;cursor:pointer;margin-bottom:2px">${item}</div>`
      ).join('')}
    </aside>`;

  const content = `
    <main style="flex:1;padding:32px 40px;max-width:740px">
      <div style="font-size:12px;color:#4b5568;margin-bottom:20px">Getting Started → Instalación</div>
      <h1 style="font-size:32px;font-weight:800;margin-bottom:16px;-webkit-text-fill-color:#e7eaf2;background:none">Instalación</h1>
      <p style="color:#98a1b3;font-size:15px;line-height:1.8;margin-bottom:24px">
        ${t.name} se instala en menos de 2 minutos. Sigue estos pasos para configurar tu entorno de desarrollo.
      </p>
      <div style="background:#0a0c14;border:1px solid #ffffff10;border-radius:10px;padding:16px 20px;margin-bottom:24px;font-family:'SF Mono',Consolas,monospace;font-size:13px;color:#e2e8f0;line-height:1.7">
        <div style="color:#6b7385">// Instalar dependencias</div>
        <div><span style="color:${c1}">npm</span> install ${t.name.toLowerCase()}</div>
        <div style="margin-top:8px;color:#6b7385">// Iniciar desarrollo</div>
        <div><span style="color:${c1}">npm</span> run dev</div>
      </div>
      <h2 style="font-size:20px;font-weight:700;margin:32px 0 14px">Requisitos previos</h2>
      <ul style="color:#98a1b3;font-size:14px;line-height:2;padding-left:20px">
        <li>Node.js 18+ instalado</li>
        <li>Angular CLI 18+</li>
        <li>Editor con soporte TypeScript (VS Code recomendado)</li>
      </ul>
      <div style="display:flex;justify-content:space-between;margin-top:40px;padding-top:20px;border-top:1px solid #ffffff10">
        <span style="color:#4b5568;font-size:13px;cursor:pointer">← Configuración rápida</span>
        <span style="color:${accent};font-size:13px;font-weight:600;cursor:pointer">Primeros pasos →</span>
      </div>
    </main>`;

  return `<!doctype html><html lang="es"><head><meta charset="utf-8"/>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:-apple-system,'Segoe UI',Roboto,sans-serif;background:#0b0d12;color:#e7eaf2}
    </style></head><body>
    ${nav}
    <div style="display:flex">${sidebar}${content}</div>
    </body></html>`;
}

/* ═══════════════════════════════════════════
   ADMIN PANEL
   ═══════════════════════════════════════════ */
function buildAdminPanelPreview(t: TemplateItem): string {
  const [c1, c2] = t.colors;
  const accent = t.accent;

  const rows = [
    { id: 'USR-001', name: 'María García', email: 'maria@mail.com', role: 'Admin', status: 'Activo' },
    { id: 'USR-002', name: 'Carlos Ruiz', email: 'carlos@mail.com', role: 'Editor', status: 'Activo' },
    { id: 'USR-003', name: 'Ana López', email: 'ana@mail.com', role: 'Viewer', status: 'Pendiente' },
    { id: 'USR-004', name: 'Pedro Sánchez', email: 'pedro@mail.com', role: 'Editor', status: 'Inactivo' },
    { id: 'USR-005', name: 'Laura Martín', email: 'laura@mail.com', role: 'Admin', status: 'Activo' },
  ];

  const statusColor: Record<string, string> = { Activo: '#22c55e', Pendiente: '#f59e0b', Inactivo: '#ef4444' };
  const tableRows = rows.map(r => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #ffffff08;color:#7a859a;font-family:'SF Mono',Consolas,monospace;font-size:12px">${r.id}</td>
      <td style="padding:12px 0;border-bottom:1px solid #ffffff08;color:#e2e8f0;font-weight:500">${r.name}</td>
      <td style="padding:12px 0;border-bottom:1px solid #ffffff08;color:#7a859a;font-size:12.5px">${r.email}</td>
      <td style="padding:12px 0;border-bottom:1px solid #ffffff08;color:#c8d1e0">${r.role}</td>
      <td style="padding:12px 0;border-bottom:1px solid #ffffff08"><span style="font-size:11.5px;font-weight:600;padding:3px 10px;border-radius:6px;color:${statusColor[r.status]};background:${statusColor[r.status]}18">${r.status}</span></td>
    </tr>`).join('');

  const nav = `
    <nav style="display:flex;justify-content:space-between;align-items:center;padding:14px 28px;border-bottom:1px solid #ffffff10;background:#0d101788;backdrop-filter:blur(12px)">
      <h2 style="font-size:18px;font-weight:700">Panel de Administración</h2>
      <div style="display:flex;align-items:center;gap:14px">
        <div style="display:flex;align-items:center;gap:8px;background:#ffffff08;border:1px solid #ffffff12;border-radius:10px;padding:8px 14px;width:200px">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4b5568" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <span style="color:#4b5568;font-size:12px">Buscar...</span>
        </div>
        <div style="width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,${c1},${c2});display:grid;place-items:center;font-size:13px;font-weight:700;color:#fff">A</div>
      </div>
    </nav>`;

  const content = `
    <div style="padding:24px 28px;display:flex;flex-direction:column;gap:20px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <h3 style="font-size:20px;font-weight:700">Usuarios</h3>
          <p style="font-size:13px;color:#6b7385;margin-top:2px">Gestiona los usuarios de tu plataforma</p>
        </div>
        <button style="background:linear-gradient(135deg,${c1},${c2});border:none;color:#fff;padding:10px 20px;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer">+ Nuevo usuario</button>
      </div>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
        <div style="background:#11141c;border:1px solid #ffffff10;border-radius:12px;padding:18px">
          <div style="font-size:12px;color:#7a859a;margin-bottom:6px">Total usuarios</div>
          <div style="font-size:24px;font-weight:800">2,847</div>
          <div style="font-size:11px;color:#22c55e;font-weight:600;margin-top:4px">+12% este mes</div>
        </div>
        <div style="background:#11141c;border:1px solid #ffffff10;border-radius:12px;padding:18px">
          <div style="font-size:12px;color:#7a859a;margin-bottom:6px">Activos</div>
          <div style="font-size:24px;font-weight:800">2,104</div>
          <div style="font-size:11px;color:#6b7385;margin-top:4px">73.9% del total</div>
        </div>
        <div style="background:#11141c;border:1px solid #ffffff10;border-radius:12px;padding:18px">
          <div style="font-size:12px;color:#7a859a;margin-bottom:6px">Pendientes</div>
          <div style="font-size:24px;font-weight:800">48</div>
          <div style="font-size:11px;color:#f59e0b;font-weight:600;margin-top:4px">Requieren revisión</div>
        </div>
      </div>

      <div style="background:#11141c;border:1px solid #ffffff10;border-radius:14px;padding:20px;overflow:hidden">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
          <div style="display:flex;gap:8px">
            ${['Todos', 'Admin', 'Editor', 'Viewer'].map((f, i) =>
              `<span style="padding:6px 14px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;
                ${i === 0 ? `background:${c1}22;color:${accent}` : 'color:#7a859a;background:#ffffff08;border:1px solid #ffffff10'}">${f}</span>`
            ).join('')}
          </div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead><tr>
            ${['ID', 'Nombre', 'Email', 'Rol', 'Estado'].map(h =>
              `<th style="text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1.2px;color:#4b5568;padding:0 0 12px;font-weight:700;border-bottom:1px solid #ffffff10">${h}</th>`
            ).join('')}
          </tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>
    </div>`;

  return `<!doctype html><html lang="es"><head><meta charset="utf-8"/>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:-apple-system,'Segoe UI',Roboto,sans-serif;background:#0a0c14;color:#e2e8f0;min-height:100vh}
    </style></head><body>
    ${nav}${content}
    </body></html>`;
}

/* ═══════════════════════════════════════════
   EDUCATION
   ═══════════════════════════════════════════ */
function buildEducationPreview(t: TemplateItem): string {
  const [c1, c2] = t.colors;

  const nav = previewNav(t.name, c1, c2, ['Cursos', 'Instructores', 'Planes', 'Comunidad']);

  const hero = `
    <header style="text-align:center;padding:70px 24px 40px;max-width:700px;margin:0 auto">
      <span class="pill">Education · ${t.name}</span>
      <h1>${t.tagline}</h1>
      <p style="color:#98a1b3;font-size:15px;line-height:1.65;max-width:480px;margin:0 auto">
        ${t.description.split('.')[0]}.
      </p>
      <div style="display:flex;gap:12px;justify-content:center;margin-top:24px">
        <button class="primary">Explorar cursos</button>
        <button class="ghost">Ser instructor</button>
      </div>
    </header>`;

  const courses = [
    { title: 'Angular desde cero', lessons: 42, students: '2.4K', level: 'Básico', progress: 0 },
    { title: 'TypeScript Pro', lessons: 28, students: '1.8K', level: 'Intermedio', progress: 0 },
    { title: 'UI/UX para Devs', lessons: 35, students: '3.1K', level: 'Básico', progress: 65 },
    { title: 'Arquitectura Angular', lessons: 18, students: '890', level: 'Avanzado', progress: 0 },
  ];

  const courseCards = courses.map((c, i) => `
    <div class="course" style="--i:${i}">
      <div style="height:100px;background:linear-gradient(${135 + i * 30}deg,color-mix(in srgb,${c1} ${35 - i * 5}%,#14171f),#0c0e15);border-radius:12px 12px 0 0;display:flex;align-items:center;justify-content:center">
        <span style="font-size:32px">${['📐', '🔷', '🎨', '🏗️'][i]}</span>
      </div>
      <div style="padding:16px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${c1}">${c.level}</span>
          <span style="font-size:11px;color:#6b7385">${c.lessons} lecciones</span>
        </div>
        <b style="font-size:14.5px;display:block;margin-bottom:8px">${c.title}</b>
        <div style="font-size:12px;color:#6b7385;margin-bottom:10px">${c.students} estudiantes</div>
        ${c.progress > 0 ? `
          <div style="background:#ffffff10;border-radius:99px;height:6px;overflow:hidden">
            <div style="width:${c.progress}%;height:100%;background:linear-gradient(90deg,${c1},${c2});border-radius:99px"></div>
          </div>
          <div style="font-size:11px;color:${c1};font-weight:600;margin-top:4px">${c.progress}% completado</div>
        ` : `
          <button style="width:100%;background:linear-gradient(135deg,${c1},${c2});border:none;color:#fff;padding:9px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer">Empezar curso</button>
        `}
      </div>
    </div>`).join('');

  const stats = [
    { val: '12K+', label: 'Estudiantes' },
    { val: '85', label: 'Cursos' },
    { val: '4.8★', label: 'Rating' },
    { val: '95%', label: 'Completación' },
  ];

  const statsHtml = stats.map(s => `<div style="text-align:center"><b style="font-size:22px;display:block">${s.val}</b><span style="color:#6b7385;font-size:11px;text-transform:uppercase;letter-spacing:1.2px">${s.label}</span></div>`).join('');

  const extra = `
    .courses{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:0 48px;max-width:1100px;margin:0 auto}
    .course{background:#12151d;border:1px solid #ffffff14;border-radius:16px;overflow:hidden;cursor:pointer;opacity:0;animation:up .5s forwards calc(var(--i)*80ms);transition:.25s}
    .course:hover{border-color:${c1}44;transform:translateY(-3px)}
    .estat{display:flex;justify-content:center;gap:48px;padding:36px 48px;border-top:1px solid #ffffff10;border-bottom:1px solid #ffffff10;margin:36px 60px;flex-wrap:wrap}
    @media(max-width:800px){.courses{grid-template-columns:1fr 1fr;padding:0 20px}.estat{gap:24px}}`;

  return previewWrap(t, `${nav}${hero}<div class="estat">${statsHtml}</div><div class="courses">${courseCards}</div>${previewFooter(t.name)}`, extra);
}

/* ═══════════════════════════════════════════
   DASHBOARD (existing, kept as-is)
   ═══════════════════════════════════════════ */
function buildDashboardPreview(t: TemplateItem): string {
  const [c1, c2] = t.colors;
  const accent = t.accent;

  const kpis = [
    { label: 'Ingresos', value: '$48,290', change: '+12.5%', up: true, spark: 'M10,22 L18,18 L26,20 L34,14 L42,10 L50,12 L58,6' },
    { label: 'Usuarios', value: '2,847', change: '+8.2%', up: true, spark: 'M10,20 L18,22 L26,16 L34,18 L42,12 L50,14 L58,8' },
    { label: 'Órdenes', value: '1,394', change: '+23.1%', up: true, spark: 'M10,24 L18,20 L26,22 L34,16 L42,14 L50,10 L58,6' },
    { label: 'Churn', value: '2.4%', change: '-0.8%', up: false, spark: 'M10,8 L18,10 L26,12 L34,14 L42,16 L50,18 L58,20' },
  ];

  const kpiCards = kpis.map((k, i) => `
    <div class="kpi" style="--i:${i}">
      <div class="kpi-top"><span class="kpi-label">${k.label}</span><span class="kpi-change ${k.up ? 'up' : 'down'}">${k.change}</span></div>
      <div class="kpi-value">${k.value}</div>
      <svg class="spark" viewBox="0 0 68 28"><polyline points="${k.spark}" fill="none" stroke="${k.up ? '#22c55e' : '#ef4444'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>`).join('');

  const linePoints = '0,140 40,120 80,130 120,90 160,100 200,60 240,70 280,40 320,50 360,20 400,30 440,10';
  const lineArea = linePoints + ' 440,160 0,160';

  const barData = [65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95, 70];
  const months = ['E','F','M','A','M','J','J','A','S','O','N','D'];
  const bars = barData.map((v, i) => `<rect x="${i * 37 + 4}" y="${160 - v * 1.5}" width="24" height="${v * 1.5}" rx="4" fill="url(#barGrad)" opacity="0.85"><animate attributeName="height" from="0" to="${v * 1.5}" dur="0.6s" begin="${i * 0.05}s" fill="freeze"/><animate attributeName="y" from="160" to="${160 - v * 1.5}" dur="0.6s" begin="${i * 0.05}s" fill="freeze"/></rect>`).join('');

  const donutSegments = [
    { pct: 35, color: c1, label: 'Premium' },
    { pct: 25, color: c2, label: 'Pro' },
    { pct: 20, color: accent, label: 'Enterprise' },
    { pct: 20, color: '#64748b', label: 'Free' },
  ];
  let cumPct = 0;
  const donutPaths = donutSegments.map(s => {
    const start = cumPct;
    cumPct += s.pct;
    const r = 54, cx = 70, cy = 70;
    const startAngle = (start / 100) * 2 * Math.PI - Math.PI / 2;
    const endAngle = (cumPct / 100) * 2 * Math.PI - Math.PI / 2;
    const largeArc = s.pct > 50 ? 1 : 0;
    const x1 = cx + r * Math.cos(startAngle), y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle), y2 = cy + r * Math.sin(endAngle);
    return `<path d="M${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2}" fill="none" stroke="${s.color}" stroke-width="18" stroke-linecap="round" opacity="0.9"><animate attributeName="stroke-dasharray" from="0,400" to="${(s.pct / 100) * 340},400" dur="0.8s" begin="${cumPct * 8}ms" fill="freeze"/></path>`;
  }).join('');

  const donutLegend = donutSegments.map(s => `<div class="legend-item"><span class="legend-dot" style="background:${s.color}"></span>${s.label} <b>${s.pct}%</b></div>`).join('');

  const orders = [
    { id: '#38291', client: 'María García', amount: '$2,450', status: 'Completado', date: 'Hace 2h' },
    { id: '#38290', client: 'Carlos Ruiz', amount: '$890', status: 'Pendiente', date: 'Hace 4h' },
    { id: '#38289', client: 'Ana López', amount: '$3,200', status: 'Completado', date: 'Hace 6h' },
    { id: '#38288', client: ' Pedro Sánchez', amount: '$1,100', status: 'Procesando', date: 'Hace 8h' },
    { id: '#38287', client: 'Laura Martín', amount: '$4,750', status: 'Completado', date: 'Hace 12h' },
  ];

  const statusClass: Record<string, string> = { Completado: 'st-ok', Pendiente: 'st-warn', Procesando: 'st-proc' };
  const orderRows = orders.map(o => `
    <tr>
      <td class="mono">${o.id}</td>
      <td>${o.client}</td>
      <td class="mono">${o.amount}</td>
      <td><span class="st ${statusClass[o.status]}">${o.status}</span></td>
      <td class="dim">${o.date}</td>
    </tr>`).join('');

  const activities = [
    { icon: '💰', text: 'Nuevo pago de $2,450 recibido', time: 'Hace 2 min' },
    { icon: '👤', text: 'María García se unió al plan Pro', time: 'Hace 15 min' },
    { icon: '📦', text: 'Orden #38291 marcada como completada', time: 'Hace 1 h' },
    { icon: '⚡', text: 'Pico de tráfico: 1,240 usuarios activos', time: 'Hace 3 h' },
    { icon: '🔔', text: 'Alerta: CPU al 87% en srv-02', time: 'Hace 5 h' },
  ];

  const activityItems = activities.map(a => `
    <div class="act-item">
      <span class="act-icon">${a.icon}</span>
      <div><span class="act-text">${a.text}</span><span class="act-time">${a.time}</span></div>
    </div>`).join('');

  return `<!doctype html><html lang="es"><head><meta charset="utf-8"/>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,'Segoe UI',Roboto,sans-serif;background:#0a0c14;color:#e2e8f0;display:flex;height:100vh;overflow:hidden}
    .sidebar{width:232px;background:#0d1017;border-right:1px solid #ffffff10;display:flex;flex-direction:column;padding:18px 0;flex-shrink:0}
    .sb-brand{display:flex;align-items:center;gap:10px;padding:0 20px 22px;border-bottom:1px solid #ffffff10}
    .sb-dot{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,${c1},${c2});box-shadow:0 4px 16px ${c1}55}
    .sb-name{font-weight:800;font-size:17px;letter-spacing:-.3px}
    .sb-nav{flex:1;padding:16px 10px;display:flex;flex-direction:column;gap:2px}
    .sb-item{display:flex;align-items:center;gap:11px;padding:10px 14px;border-radius:10px;color:#7a859a;font-size:13.5px;cursor:pointer;transition:.18s;font-weight:500}
    .sb-item:hover{background:#ffffff0a;color:#c8d1e0}
    .sb-item.active{background:linear-gradient(135deg,${c1}22,${c2}18);color:#fff;font-weight:600}
    .sb-item.active::before{content:'';position:absolute;left:0;width:3px;height:20px;border-radius:0 4px 4px 0;background:linear-gradient(180deg,${c1},${c2})}
    .sb-item svg{width:18px;height:18px;flex-shrink:0;opacity:.7}
    .sb-item.active svg{opacity:1}
    .sb-section{font-size:10px;text-transform:uppercase;letter-spacing:1.6px;color:#4b5568;padding:18px 14px 6px;font-weight:700}
    .sb-footer{padding:14px 16px;border-top:1px solid #ffffff10;display:flex;align-items:center;gap:10px}
    .sb-avatar{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,${c1},${c2});display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff}
    .sb-user{font-size:12.5px;font-weight:600}.sb-role{font-size:11px;color:#5b6478}
    .main{flex:1;display:flex;flex-direction:column;overflow:hidden}
    .topbar{display:flex;align-items:center;justify-content:space-between;padding:14px 28px;border-bottom:1px solid #ffffff10;background:#0d101788;backdrop-filter:blur(12px)}
    .topbar h2{font-size:18px;font-weight:700;letter-spacing:-.4px}
    .topbar-right{display:flex;align-items:center;gap:16px}
    .search{display:flex;align-items:center;gap:8px;background:#ffffff08;border:1px solid #ffffff12;border-radius:10px;padding:8px 14px;width:220px}
    .search input{background:none;border:none;outline:none;color:#c8d1e0;font-size:13px;width:100%}
    .search input::placeholder{color:#4b5568}
    .search svg{color:#4b5568;width:16px;height:16px;flex-shrink:0}
    .icon-btn{width:36px;height:36px;border-radius:10px;border:1px solid #ffffff12;background:#ffffff06;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:.2s;position:relative}
    .icon-btn:hover{background:#ffffff12;border-color:#ffffff22}
    .icon-btn svg{width:17px;height:17px;color:#7a859a}
    .notif-dot{position:absolute;top:7px;right:7px;width:7px;height:7px;border-radius:50%;background:${c1};box-shadow:0 0 8px ${c1}88}
    .tb-avatar{width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,${c1},${c2});display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;cursor:pointer}
    .content{flex:1;overflow-y:auto;padding:24px 28px;display:flex;flex-direction:column;gap:22px}
    .content::-webkit-scrollbar{width:6px}.content::-webkit-scrollbar-thumb{background:#ffffff15;border-radius:3px}
    .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
    .kpi{background:#11141c;border:1px solid #ffffff10;border-radius:14px;padding:18px 20px;opacity:0;transform:translateY(12px);animation:fadeUp .45s forwards calc(var(--i)*80ms)}
    .kpi:hover{border-color:${accent}44;transform:translateY(-2px)!important;opacity:1}
    .kpi-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
    .kpi-label{font-size:12.5px;color:#7a859a;font-weight:500}
    .kpi-change{font-size:11.5px;font-weight:700;padding:2px 8px;border-radius:6px}
    .kpi-change.up{color:#22c55e;background:#22c55e18}
    .kpi-change.down{color:#ef4444;background:#ef444418}
    .kpi-value{font-size:26px;font-weight:800;letter-spacing:-.8px;margin-bottom:8px}
    .spark{width:100%;height:28px;opacity:.7}
    .charts{display:grid;grid-template-columns:1.6fr 1fr;gap:16px}
    .chart-card{background:#11141c;border:1px solid #ffffff10;border-radius:14px;padding:20px}
    .chart-title{font-size:14px;font-weight:700;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center}
    .chart-title .tab{font-size:11.5px;color:#7a859a;font-weight:500;cursor:pointer;padding:4px 10px;border-radius:6px;transition:.2s}
    .chart-title .tab.active{background:#ffffff10;color:#e2e8f0}
    .chart-area{position:relative}
    .chart-area svg{width:100%;height:auto}
    .chart-grid line{stroke:#ffffff0a;stroke-width:1}
    .chart-labels{display:flex;justify-content:space-between;padding:8px 4px 0}
    .chart-labels span{font-size:10px;color:#4b5568}
    .bar-labels{display:flex;justify-content:space-between;padding:6px 4px 0}
    .bar-labels span{font-size:10px;color:#4b5568}
    .donut-wrap{display:flex;flex-direction:column;align-items:center;gap:16px}
    .donut-svg{width:140px;height:140px}
    .donut-center{font-size:22px;font-weight:800;fill:#e2e8f0}
    .donut-sub{font-size:11px;fill:#7a859a}
    .legend{display:flex;flex-wrap:wrap;gap:10px 18px;justify-content:center}
    .legend-item{display:flex;align-items:center;gap:6px;font-size:12px;color:#98a1b3}
    .legend-dot{width:8px;height:8px;border-radius:3px;flex-shrink:0}
    .legend-item b{color:#e2e8f0;font-weight:700}
    .bottom{display:grid;grid-template-columns:1.5fr 1fr;gap:16px}
    .table-wrap{background:#11141c;border:1px solid #ffffff10;border-radius:14px;padding:20px;overflow:hidden}
    .table-wrap table{width:100%;border-collapse:collapse;font-size:13px}
    .table-wrap th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1.2px;color:#4b5568;padding:0 0 12px;font-weight:700;border-bottom:1px solid #ffffff10}
    .table-wrap td{padding:12px 0;border-bottom:1px solid #ffffff08;color:#c8d1e0}
    .table-wrap tr:last-child td{border-bottom:none}
    .mono{font-family:'SF Mono',Consolas,monospace;font-size:12px;color:#7a859a}
    .dim{color:#4b5568;font-size:12px}
    .st{font-size:11.5px;font-weight:600;padding:3px 10px;border-radius:6px}
    .st-ok{color:#22c55e;background:#22c55e16}
    .st-warn{color:#f59e0b;background:#f59e0b16}
    .st-proc{color:#3b82f6;background:#3b82f616}
    .activity{background:#11141c;border:1px solid #ffffff10;border-radius:14px;padding:20px}
    .activity h3{font-size:14px;font-weight:700;margin-bottom:16px}
    .act-item{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #ffffff08}
    .act-item:last-child{border-bottom:none}
    .act-icon{font-size:18px;flex-shrink:0;margin-top:2px}
    .act-text{font-size:13px;color:#c8d1e0;display:block;line-height:1.4}
    .act-time{font-size:11px;color:#4b5568;margin-top:3px;display:block}
    @keyframes fadeUp{to{opacity:1;transform:none}}
    @media(max-width:1100px){.kpis{grid-template-columns:repeat(2,1fr)}.charts,.bottom{grid-template-columns:1fr}}
    @media(max-width:768px){.sidebar{display:none}.kpis{grid-template-columns:1fr}}
  </style></head><body>
  <aside class="sidebar">
    <div class="sb-brand"><div class="sb-dot"></div><span class="sb-name">${t.name}</span></div>
    <nav class="sb-nav">
      <div class="sb-section">Principal</div>
      <div class="sb-item active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>Dashboard</div>
      <div class="sb-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>Analytics</div>
      <div class="sb-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>Usuarios</div>
      <div class="sb-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>Pagos</div>
      <div class="sb-section">Herramientas</div>
      <div class="sb-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>Reportes</div>
      <div class="sb-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>Config</div>
    </nav>
    <div class="sb-footer"><div class="sb-avatar">JD</div><div><div class="sb-user">Juan Díaz</div><div class="sb-role">Admin</div></div></div>
  </aside>
  <div class="main">
    <header class="topbar"><h2>Dashboard</h2><div class="topbar-right">
      <div class="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input placeholder="Buscar..." readonly></div>
      <div class="icon-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg><div class="notif-dot"></div></div>
      <div class="tb-avatar">JD</div>
    </div></header>
    <div class="content">
      <div class="kpis">${kpiCards}</div>
      <div class="charts">
        <div class="chart-card">
          <div class="chart-title">Ingresos mensuales <div><span class="tab active">12M</span><span class="tab">6M</span><span class="tab">30D</span></div></div>
          <div class="chart-area">
            <svg viewBox="0 0 450 170">
              <defs><linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c1}" stop-opacity="0.3"/><stop offset="100%" stop-color="${c1}" stop-opacity="0"/></linearGradient></defs>
              <g class="chart-grid"><line x1="0" y1="40" x2="450" y2="40"/><line x1="0" y1="80" x2="450" y2="80"/><line x1="0" y1="120" x2="450" y2="120"/><line x1="0" y1="160" x2="450" y2="160"/></g>
              <polygon points="${lineArea}" fill="url(#lineGrad)"><animate attributeName="opacity" from="0" to="1" dur="0.8s" fill="freeze"/></polygon>
              <polyline points="${linePoints}" fill="none" stroke="${c1}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><animate attributeName="stroke-dasharray" from="0,800" to="800,0" dur="1.2s" fill="freeze"/></polyline>
            </svg>
            <div class="chart-labels"><span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span><span>Ago</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dic</span></div>
          </div>
        </div>
        <div class="chart-card">
          <div class="chart-title">Distribución</div>
          <div class="donut-wrap">
            <svg class="donut-svg" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="54" fill="none" stroke="#ffffff08" stroke-width="18"/>
              ${donutPaths}
              <text class="donut-center" x="70" y="68" text-anchor="middle" dominant-baseline="middle">100%</text>
              <text class="donut-sub" x="70" y="84" text-anchor="middle">total</text>
            </svg>
            <div class="legend">${donutLegend}</div>
          </div>
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-title">Órdenes por mes</div>
        <svg viewBox="0 0 450 175" style="width:100%;height:auto">
          <defs><linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c2}"/><stop offset="100%" stop-color="${c1}"/></linearGradient></defs>
          <g class="chart-grid"><line x1="0" y1="40" x2="450" y2="40"/><line x1="0" y1="80" x2="450" y2="80"/><line x1="0" y1="120" x2="450" y2="120"/><line x1="0" y1="160" x2="450" y2="160"/></g>
          ${bars}
        </svg>
        <div class="bar-labels">${months.map(m => `<span>${m}</span>`).join('')}</div>
      </div>
      <div class="bottom">
        <div class="table-wrap">
          <div class="chart-title">Órdenes recientes</div>
          <table><thead><tr><th>ID</th><th>Cliente</th><th>Monto</th><th>Estado</th><th>Fecha</th></tr></thead><tbody>${orderRows}</tbody></table>
        </div>
        <div class="activity"><h3>Actividad reciente</h3>${activityItems}</div>
      </div>
    </div>
  </div></body></html>`;
}
