"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app/core/data/templates.data.ts
var TEMPLATES = [
  {
    id: "storefront-gatsby",
    name: "Storefront Pro",
    tagline: "Premium Headless WooCommerce",
    description: "Storefront Pro es una plantilla premium para WooCommerce creada de forma headless con Gatsby. Ofrece velocidades de carga ultrarr\xE1pidas, SEO optimizado y una experiencia de usuario incre\xEDble. Integraci\xF3n perfecta con WordPress backend.",
    category: "ecommerce",
    price: 149,
    rating: 5,
    reviews: 42,
    sales: 320,
    tech: ["Gatsby", "React", "WooCommerce", "GraphQL"],
    features: [
      "PWA Ready (carga instant\xE1nea)",
      "Checkout optimizado sin recargas",
      "Integraci\xF3n con Stripe y PayPal",
      "B\xFAsqueda y filtros ultra r\xE1pidos",
      "Panel de control en WordPress",
      "Soporte premium 6 meses"
    ],
    pages: 35,
    colors: ["#8b5cf6", "#ec4899"],
    accent: "#d946ef",
    isFeatured: true,
    isNew: true,
    releasedAt: "2026-09-01"
  },
  {
    id: "aurora",
    name: "Aurora",
    tagline: "Landing HTML5 pura \u2014 cero frameworks",
    description: "Aurora es una landing hecha solo con HTML5 y CSS moderno: sin build, sin dependencias y con Lighthouse perfecto. Incluye tema dual persistente, bento grid responsive, animaciones de scroll accesibles y un CSS de 14 KB comentado por secciones. La plantilla perfecta para entender c\xF3mo se construye la web r\xE1pida.",
    category: "landing",
    price: 0,
    rating: 4.9,
    reviews: 41,
    sales: 1870,
    tech: ["HTML5", "CSS3", "Vanilla JS"],
    features: [
      "100/100 Lighthouse, sin build",
      "Tema claro y oscuro con persistencia",
      "Bento grid responsive fluido",
      "Reveal on scroll con IntersectionObserver",
      "14 KB de CSS comentado y ordenado",
      "Gratis para proyectos personales y comerciales"
    ],
    pages: 1,
    colors: ["#c084fc", "#67e8f9"],
    accent: "#c084fc",
    isFeatured: true,
    isNew: true,
    releasedAt: "2026-08-24"
  },
  {
    id: "nova-saas",
    name: "Nova SaaS",
    tagline: "Landing + app para productos de software",
    description: "Nova SaaS es la plantilla definitiva para lanzar tu producto digital. Incluye landing de alta conversi\xF3n, pricing din\xE1mico, blog integrado y panel de cliente. Dise\xF1ada con un sistema de dise\xF1o completo y animaciones fluidas.",
    category: "saas",
    price: 79,
    oldPrice: 129,
    rating: 4.9,
    reviews: 214,
    sales: 1830,
    tech: ["Angular", "Tailwind", "TypeScript"],
    features: [
      "Landing de alta conversi\xF3n",
      "Pricing con toggle mensual/anual",
      "Blog y documentaci\xF3n integrados",
      "Modo oscuro incluido",
      "Animaciones con scroll",
      "SEO y Open Graph listos"
    ],
    pages: 18,
    colors: ["#7c3aed", "#06b6d4"],
    accent: "#8b5cf6",
    isFeatured: true,
    isNew: true,
    releasedAt: "2026-07-02"
  },
  {
    id: "atlas-store",
    name: "Atlas Store",
    tagline: "E-commerce moderno que convierte",
    description: "Tienda online completa con fichas de producto inmersivas, checkout optimizado, filtros instant\xE1neos y wishlist. Pensada para marcas que quieren destacar con una experiencia de compra premium.",
    category: "ecommerce",
    price: 89,
    rating: 4.8,
    reviews: 167,
    sales: 1420,
    tech: ["Angular", "Signals", "SCSS"],
    features: [
      "Fichas de producto inmersivas",
      "Checkout en un paso",
      "Filtros y b\xFAsqueda instant\xE1nea",
      "Wishlist y comparador",
      "Micro-interacciones en todo el flujo",
      "Integraci\xF3n pasarela de pago"
    ],
    pages: 22,
    colors: ["#f59e0b", "#ef4444"],
    accent: "#f97316",
    isFeatured: true,
    releasedAt: "2026-05-18"
  },
  {
    id: "lumen-landing",
    name: "Lumen",
    tagline: "Landing page minimalista de alto impacto",
    description: "Una landing limpia y directa: hero cinematogr\xE1fico, secciones que cuentan tu historia y CTAs que convierten. Perfecta para apps m\xF3viles, cursos o campa\xF1as.",
    category: "landing",
    price: 0,
    rating: 4.7,
    reviews: 98,
    sales: 5210,
    tech: ["Angular", "CSS Grid"],
    features: [
      "Hero cinematogr\xE1fico",
      "100% responsive",
      "Formulario conectable a cualquier API",
      "Puntuaci\xF3n Lighthouse 98+",
      "Gratis para proyectos personales y comerciales"
    ],
    pages: 3,
    colors: ["#3b82f6", "#22d3ee"],
    accent: "#38bdf8",
    releasedAt: "2026-04-10"
  },
  {
    id: "monogram",
    name: "Monogram",
    tagline: "Portfolio para dise\xF1adores y estudios",
    description: "Portfolio editorial con transiciones de p\xE1gina suaves, casos de estudio a pantalla completa y una galer\xEDa que hace que tu trabajo hable por ti.",
    category: "portfolio",
    price: 49,
    oldPrice: 69,
    rating: 4.9,
    reviews: 143,
    sales: 980,
    tech: ["Angular", "GSAP-ready"],
    features: [
      "Casos de estudio fullscreen",
      "Transiciones entre p\xE1ginas",
      "Cursor personalizado",
      "Galer\xEDa con lazy loading",
      "CMS-ready"
    ],
    pages: 8,
    colors: ["#111827", "#6b7280"],
    accent: "#e11d48",
    isFeatured: true,
    releasedAt: "2026-03-22"
  },
  {
    id: "pulse-dashboard",
    name: "Pulse",
    tagline: "Dashboard anal\xEDtico con gr\xE1ficas vivas",
    description: "Panel de administraci\xF3n con m\xE1s de 30 componentes: gr\xE1ficas animadas, tablas inteligentes, calendario y sistema de roles. Todo con datos reactivos desde el primer segundo.",
    category: "dashboard",
    price: 99,
    rating: 4.8,
    reviews: 189,
    sales: 1240,
    tech: ["Angular", "Signals", "SVG Charts"],
    features: [
      "30+ componentes listos",
      "Gr\xE1ficas SVG animadas sin dependencias",
      "Tablas con orden y filtrado",
      "Sistema de roles y permisos",
      "Layout colapsable multi-panel"
    ],
    pages: 26,
    colors: ["#10b981", "#0ea5e9"],
    accent: "#14b8a6",
    isNew: true,
    releasedAt: "2026-07-28"
  },
  {
    id: "ink-blog",
    name: "Ink",
    tagline: "Blog editorial centrado en la lectura",
    description: "Tipograf\xEDa cuidada, modo lectura y newsletter integrada. Ink convierte visitantes en lectores fieles con una experiencia de blog impecable.",
    category: "blog",
    price: 0,
    rating: 4.6,
    reviews: 76,
    sales: 3980,
    tech: ["Angular", "RSS"],
    features: [
      "Tipograf\xEDa optimizada para lectura",
      "Newsletter integrada",
      "Etiquetas y b\xFAsqueda",
      "RSS autom\xE1tico",
      "Gratis para siempre"
    ],
    pages: 6,
    colors: ["#f43f5e", "#fb923c"],
    accent: "#fb7185",
    releasedAt: "2026-02-14"
  },
  {
    id: "orbit-startup",
    name: "Orbit",
    tagline: "Site corporativo para startups tech",
    description: "Web completa para startups: producto, equipo, careers y blog. Con animaciones profesionales y un sistema de contenido f\xE1cil de mantener.",
    category: "saas",
    price: 69,
    rating: 4.7,
    reviews: 112,
    sales: 860,
    tech: ["Angular", "Tailwind"],
    features: [
      "P\xE1ginas producto/equipo/careers",
      "Animaciones profesionales",
      "Multi-idioma ready",
      "Formularios validados",
      "CI/CD friendly"
    ],
    pages: 14,
    colors: ["#6366f1", "#a855f7"],
    accent: "#818cf8",
    releasedAt: "2026-01-30"
  },
  {
    id: "crate-shop",
    name: "Crate",
    tagline: "Mini-tienda para creadores y productos digitales",
    description: "Vende ebooks, cursos o assets digitales con una tienda ligera y elegante. P\xE1gina de producto con previews, rese\xF1as y entrega autom\xE1tica.",
    category: "ecommerce",
    price: 0,
    rating: 4.5,
    reviews: 64,
    sales: 2760,
    tech: ["Angular", "Stripe-ready"],
    features: [
      "Productos digitales con preview",
      "Rese\xF1as verificadas",
      "Entrega tras compra",
      "Cupones de descuento",
      "Gratis para empezar a vender hoy"
    ],
    pages: 7,
    colors: ["#84cc16", "#16a34a"],
    accent: "#a3e635",
    isNew: true,
    releasedAt: "2026-08-05"
  },
  {
    id: "frame-folio",
    name: "Frame",
    tagline: "Portfolio fotogr\xE1fico a pantalla completa",
    description: "Galer\xEDas inmersivas con navegaci\xF3n por gestos, lightbox cinematogr\xE1fico y modo exposici\xF3n. Para fot\xF3grafos y artistas visuales.",
    category: "portfolio",
    price: 39,
    rating: 4.6,
    reviews: 58,
    sales: 430,
    tech: ["Angular", "WebGL-lite"],
    features: [
      "Lightbox cinematogr\xE1fico",
      "Navegaci\xF3n por gestos",
      "Precarga inteligente de im\xE1genes",
      "Protecci\xF3n de im\xE1genes",
      "Modo exposici\xF3n p\xFAblica"
    ],
    pages: 5,
    colors: ["#0ea5e9", "#8b5cf6"],
    accent: "#60a5fa",
    releasedAt: "2025-12-12"
  },
  {
    id: "launch-one",
    name: "Launch One",
    tagline: "Coming soon + waitlist que genera expectativa",
    description: "La plantilla perfecta antes del lanzamiento: cuenta atr\xE1s, waitlist viral con posici\xF3n en cola y actualizaciones por email.",
    category: "landing",
    price: 19,
    rating: 4.5,
    reviews: 41,
    sales: 620,
    tech: ["Angular"],
    features: [
      "Cuenta atr\xE1s animada",
      "Waitlist con posici\xF3n en cola",
      "Compartir en redes sube posiciones",
      "Panel simple de suscriptores",
      "Despliegue en 5 minutos"
    ],
    pages: 2,
    colors: ["#f472b6", "#c084fc"],
    accent: "#e879f9",
    releasedAt: "2025-11-08"
  },
  {
    id: "ledger-finance",
    name: "Ledger",
    tagline: "Dashboard financiero con reportes claros",
    description: "Visualiza KPIs financieros, flujos de caja y proyecciones con un dashboard serio y elegante. Exportaci\xF3n a PDF incluida.",
    category: "dashboard",
    price: 89,
    oldPrice: 119,
    rating: 4.7,
    reviews: 87,
    sales: 540,
    tech: ["Angular", "Signals"],
    features: [
      "KPIs y proyecciones",
      "Exportaci\xF3n a PDF",
      "Multi-divisa",
      "Tema claro/oscuro",
      "Datos mock realistas"
    ],
    pages: 15,
    colors: ["#334155", "#0ea5e9"],
    accent: "#0284c7",
    releasedAt: "2026-06-15"
  },
  {
    id: "journal-minimal",
    name: "Journal",
    tagline: "Blog minimalista de una columna",
    description: "Menos es m\xE1s: un blog ultra r\xE1pido, sin distracciones, con tipograf\xEDa serif moderna y RSS. Ideal para escritores.",
    category: "blog",
    price: 29,
    rating: 4.4,
    reviews: 33,
    sales: 310,
    tech: ["Angular"],
    features: [
      "Ultra r\xE1pido (<50KB JS)",
      "Tipograf\xEDa serif moderna",
      "Dark mode autom\xE1tico",
      "Archivo por a\xF1os",
      "Sin dependencias externas"
    ],
    pages: 4,
    colors: ["#78716c", "#fbbf24"],
    accent: "#d6d3d1",
    releasedAt: "2026-03-03"
  },
  {
    id: "solaris-portfolio",
    name: "Solaris",
    tagline: "Portfolio fotogr\xE1fico inmersivo con lightbox y filtros",
    description: "Solaris es el portfolio definitivo para fot\xF3grafos y artistas visuales. Galer\xEDa masonry con filtros por categor\xEDa, lightbox cinematogr\xE1fico, secci\xF3n about personal y testimonios de clientes. Todo con tema dual, animaciones de scroll y una est\xE9tica que pone tu trabajo en el centro.",
    category: "portfolio",
    price: 0,
    rating: 4.8,
    reviews: 92,
    sales: 1340,
    tech: ["HTML5", "CSS3", "Vanilla JS"],
    features: [
      "Galer\xEDa masonry con filtros por categor\xEDa",
      "Lightbox cinematogr\xE1fico con navegaci\xF3n",
      "Secci\xF3n about con herramientas",
      "Testimonios de clientes",
      "Tema dual con persistencia",
      "Animaciones reveal on scroll",
      "Gratis para siempre"
    ],
    pages: 1,
    colors: ["#e879f9", "#fbbf24"],
    accent: "#e879f9",
    isNew: true,
    releasedAt: "2026-08-27"
  },
  {
    id: "nexa-saas",
    name: "Nexa",
    tagline: "SaaS landing con pricing, mockup y automatizaciones IA",
    description: "Nexa es la plantilla de landing SaaS m\xE1s completa del mercado. Hero con mockup interactivo de la app, bento grid de features, pricing tiers, FAQ accordion, logos de clientes animados y secci\xF3n de testimonials. Dise\xF1ada para convertir visitantes en usuarios.",
    category: "saas",
    price: 49,
    oldPrice: 79,
    rating: 4.9,
    reviews: 156,
    sales: 720,
    tech: ["HTML5", "CSS3", "Vanilla JS"],
    features: [
      "Hero con mockup interactivo de la app",
      "Bento grid de features",
      "Pricing tiers con badge popular",
      "FAQ accordion nativo",
      "Logos de clientes animados",
      "Testimonials grid",
      "Footer completo multi-columna",
      "Tema dual con persistencia"
    ],
    pages: 1,
    colors: ["#22d3ee", "#8b5cf6"],
    accent: "#22d3ee",
    isNew: true,
    releasedAt: "2026-08-27"
  }
];

// src/app/core/models/template.model.ts
var CATEGORY_LABELS = {
  saas: "SaaS",
  ecommerce: "E-commerce",
  landing: "Landing",
  portfolio: "Portfolio",
  blog: "Blog",
  dashboard: "Dashboard",
  agency: "Agency",
  education: "Education",
  documentation: "Documentation",
  "admin-panel": "Admin Panel"
};

// src/app/core/services/preview-shared.ts
function previewBaseCSS() {
  return `
    *{margin:0;padding:0;box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{background:#0b0d12;color:#e7eaf2}
    a{text-decoration:none;color:inherit}
    img{max-width:100%;display:block}
  `;
}
function previewNav(name, c1, c2, links = ["Inicio", "Producto", "Precios", "Contacto"]) {
  const linkHtml = links.map((l, i) => `<a${i === 0 ? ' class="active"' : ""}>${l}</a>`).join("");
  return `
    <nav>
      <div class="brand"><span class="dot"></span>${name}</div>
      <div class="links">${linkHtml}
        <button class="cta">Empezar</button>
      </div>
    </nav>`;
}
function previewFooter(name) {
  return `<footer>\xA9 2026 ${name} \u2014 vista previa generada desde Templa</footer>`;
}
function previewSharedStyles(c1, c2, accent, bodyFont = "-apple-system,'Segoe UI',Roboto,sans-serif") {
  return `
    body{font-family:${bodyFont}}
    nav{display:flex;justify-content:space-between;align-items:center;padding:18px 34px;position:sticky;top:0;
        backdrop-filter:blur(14px);background:rgba(11,13,18,.75);border-bottom:1px solid #ffffff12;z-index:9}
    .brand{font-weight:800;font-size:17px;display:flex;gap:9px;align-items:center}
    .dot{width:22px;height:22px;border-radius:7px;background:linear-gradient(135deg,${c1},${c2});box-shadow:0 4px 14px ${c1}66}
    .links{display:flex;gap:20px;align-items:center;font-size:13.5px;color:#98a1b3}
    .links a{cursor:pointer;transition:.2s}.links a:hover,.links a.active{color:#fff}
    .cta{background:linear-gradient(135deg,${c1},${c2});border:none;color:#fff;padding:9px 16px;border-radius:10px;
         font-weight:700;cursor:pointer;font-size:13px;transition:.2s}
    .cta:hover{transform:translateY(-1px);filter:brightness(1.1)}
    .pill{font-size:12px;color:${accent};border:1px solid ${accent}55;padding:5px 13px;border-radius:99px;
          background:${accent}14;font-weight:600;display:inline-block}
    h1{font-size:clamp(28px,5vw,48px);line-height:1.08;margin:22px 0 16px;font-weight:850;letter-spacing:-1.5px;
       background:linear-gradient(120deg,#fff 30%,#aab3c5);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .primary{background:linear-gradient(135deg,${c1},${c2});color:#fff;border:none;padding:13px 26px;border-radius:12px;
             font-weight:700;cursor:pointer;font-size:15px;box-shadow:0 8px 30px ${c1}44;transition:.25s}
    .primary:hover{transform:translateY(-2px);box-shadow:0 14px 40px ${c1}66}
    .ghost{background:transparent;color:#c6cddc;border:1px solid #ffffff26;padding:13px 26px;border-radius:12px;
           cursor:pointer;font-size:15px;transition:.2s}
    .ghost:hover{border-color:#ffffff55}
    footer{padding:30px;text-align:center;color:#565e70;font-size:12px;border-top:1px solid #ffffff10;margin-top:20px}
    @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
    @keyframes up{to{opacity:1;transform:none}}
  `;
}
function previewWrap(t, bodyContent, extraCSS = "", fontImport, bodyFont) {
  const [c1, c2] = t.colors;
  const fontLink = fontImport ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="${fontImport}" rel="stylesheet">` : "";
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"/>
  ${fontLink}
  <style>${previewBaseCSS()}${previewSharedStyles(c1, c2, t.accent, bodyFont)}${extraCSS}</style></head><body>
  ${bodyContent}
  </body></html>`;
}

// src/app/core/services/preview.builder.ts
function buildPreviewHtml(t) {
  switch (t.id) {
    case "aurora":
      return buildAuroraPreview(t);
    case "nova-saas":
      return buildNovaSaasPreview(t);
    case "atlas-store":
      return buildAtlasStorePreview(t);
    case "lumen-landing":
      return buildLumenPreview(t);
    case "monogram":
      return buildMonogramPreview(t);
    case "pulse-dashboard":
      return buildPulsePreview(t);
    case "ink-blog":
      return buildInkBlogPreview(t);
    case "orbit-startup":
      return buildOrbitPreview(t);
    case "crate-shop":
      return buildCrateShopPreview(t);
    case "frame-folio":
      return buildFrameFolioPreview(t);
    case "launch-one":
      return buildLaunchOnePreview(t);
    case "ledger-finance":
      return buildLedgerPreview(t);
    case "journal-minimal":
      return buildJournalPreview(t);
    case "solaris-portfolio":
      return buildSolarisPreview(t);
    case "nexa-saas":
      return buildNexaPreview(t);
    case "storefront-gatsby":
      return buildStorefrontPreview(t);
    default:
      return buildGenericPreview(t);
  }
}
function buildAuroraPreview(t) {
  const [c1, c2] = t.colors;
  const gFont = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap";
  const nav = `
    <nav>
      <div class="brand"><span class="dot"></span>${t.name}</div>
      <div class="links"><a class="active">Inicio</a><a>Sobre</a><a>Stack</a>
        <button class="cta">Descargar</button>
      </div>
    </nav>`;
  const hero = `
    <div class="mesh"></div>
    <header>
      <span class="pill">HTML5 puro \xB7 Sin frameworks \xB7 Lighthouse 100</span>
      <h1>${t.tagline}</h1>
      <p class="lead">${t.description.split(".")[0]}.</p>
      <div class="ctas">
        <button class="primary">Descargar gratis \u2192</button>
        <button class="ghost">Ver demo</button>
      </div>
    </header>`;
  const bento = `
    <div class="bento">
      <div class="b-card b-big" style="background:linear-gradient(135deg,${c1}22,${c2}12);border-color:${c1}33">
        <div class="b-icon" style="background:linear-gradient(135deg,${c1},${c2})">\u26A1</div>
        <b>Lighthouse 100/100</b>
        <small>Performance \xB7 Accesibilidad \xB7 SEO \xB7 Best Practices \u2014 todo perfecto, sin trampa.</small>
        <div class="b-score"><span style="color:${c1};font-size:42px;font-weight:800;letter-spacing:-2px">100</span><span style="color:#6b7385;font-size:13px;margin-left:6px">/ 100</span></div>
      </div>
      <div class="b-card" style="background:linear-gradient(135deg,${c2}18,transparent)">
        <div class="b-icon" style="background:linear-gradient(135deg,${c2},${c1})">\u{1F317}</div>
        <b>Tema dual</b>
        <small>Modo claro y oscuro con persistencia en localStorage.</small>
      </div>
      <div class="b-card">
        <div class="b-icon" style="background:linear-gradient(135deg,${c1},${c2})">\u{1F4D0}</div>
        <b>Bento Grid</b>
        <small>Layout responsive con CSS Grid moderno y sin media queries extras.</small>
      </div>
      <div class="b-card">
        <div class="b-icon" style="background:linear-gradient(135deg,${c2},${c1})">\u{1F441}</div>
        <b>Scroll reveal</b>
        <small>Animaciones con IntersectionObserver. Accesibles y performantes.</small>
      </div>
      <div class="b-card b-wide" style="background:linear-gradient(90deg,${c1}15,${c2}10)">
        <div style="display:flex;gap:24px;align-items:center">
          <div class="b-icon" style="background:linear-gradient(135deg,${c1},${c2});flex-shrink:0">\u{1F4E6}</div>
          <div><b>14 KB de CSS comentado</b><small style="display:block;margin-top:4px">Todo el estilo en un solo archivo ordenado por secciones. Sin build, sin dependencias.</small></div>
          <div style="margin-left:auto;font-size:36px;font-weight:800;color:${c1};opacity:.6">14<span style="font-size:16px">KB</span></div>
        </div>
      </div>
    </div>`;
  const stats = `
    <div class="aurora-stats">
      <div><b>${t.sales.toLocaleString("es")}+</b><span>descargas</span></div>
      <div><b>\u2605 ${t.rating}</b><span>valoraci\xF3n</span></div>
      <div><b>14 KB</b><span>CSS total</span></div>
      <div><b>0</b><span>dependencias</span></div>
    </div>`;
  const extra = `
    .mesh{position:fixed;inset:-20%;z-index:-1;filter:blur(70px);
      background:radial-gradient(40% 36% at 15% 10%,${c1}50,transparent 70%),
                 radial-gradient(34% 30% at 85% 20%,${c2}40,transparent 70%),
                 radial-gradient(40% 38% at 50% 90%,${c1}28,transparent 70%);
      animation:drift 24s ease-in-out infinite alternate}
    @keyframes drift{to{transform:translate(-5%,6%) scale(1.1) rotate(-3deg)}}
    header{position:relative;text-align:center;padding:80px 24px 48px;max-width:760px;margin:0 auto}
    .lead{color:#8a93a8;font-size:16px;line-height:1.7;max-width:500px;margin:0 auto}
    .ctas{display:flex;gap:12px;justify-content:center;margin-top:28px}
    .bento{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:auto auto;gap:14px;padding:0 48px 40px;max-width:1040px;margin:0 auto}
    .b-card{background:#12151e;border:1px solid #ffffff14;border-radius:20px;padding:24px;display:flex;flex-direction:column;gap:8px}
    .b-big{grid-column:span 1;grid-row:span 2;justify-content:space-between}
    .b-wide{grid-column:span 2}
    .b-icon{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-size:20px;flex-shrink:0}
    .b-card b{font-size:15px;font-weight:700}
    .b-card small{color:#6b7385;font-size:12.5px;line-height:1.5}
    .b-score{margin-top:auto;padding-top:16px}
    .aurora-stats{display:flex;justify-content:center;gap:60px;padding:36px 24px;border-top:1px solid #ffffff10;flex-wrap:wrap}
    .aurora-stats div{text-align:center}
    .aurora-stats b{font-size:26px;display:block;color:#fff;font-weight:800}
    .aurora-stats span{color:#6b7385;font-size:11px;text-transform:uppercase;letter-spacing:1.4px}
    @media(max-width:700px){.bento{grid-template-columns:1fr;padding:0 20px 30px}.b-big,.b-wide{grid-column:span 1}.aurora-stats{gap:28px}}`;
  return previewWrap(t, `${nav}${hero}${bento}${stats}${previewFooter(t.name)}`, extra, gFont, "'Syne', sans-serif");
}
function buildNovaSaasPreview(t) {
  const [c1, c2] = t.colors;
  const gFont = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
  const nav = previewNav(t.name, c1, c2, ["Producto", "Precios", "Blog", "Docs"]);
  const hero = `
    <div class="mesh"></div>
    <section class="hero-split">
      <div class="hero-text">
        <span class="pill">SaaS \xB7 v2.4 \xB7 Premium</span>
        <h1>${t.tagline}</h1>
        <p class="lead">${t.description.split(".")[0]}.</p>
        <div class="ctas"><button class="primary">Empezar gratis \u2192</button><button class="ghost">Ver demo</button></div>
        <div class="trust">
          <div class="avatars">
            ${[c1, c2, "#8b5cf6", "#06b6d4"].map((c) => `<div class="av" style="background:linear-gradient(135deg,${c},${c1})"></div>`).join("")}
          </div>
          <span>+${t.sales.toLocaleString("es")} equipos conf\xEDan en ${t.name}</span>
        </div>
      </div>
      <div class="hero-mockup">
        <div class="mockup-shell">
          <div class="mock-bar"><i></i><i></i><i></i></div>
          <div class="mock-body">
            <div class="mock-sidebar">
              ${["Dashboard", "Analytics", "Usuarios", "Config"].map((l, i) => `<div class="mock-nav-item${i === 0 ? " active" : ""}" style="${i === 0 ? `background:linear-gradient(135deg,${c1}33,${c2}22);color:#fff` : ""}">${l}</div>`).join("")}
            </div>
            <div class="mock-content">
              <div class="mock-kpis">
                ${["$48K", "2.4K", "98%", "4.9\u2605"].map((v, i) => `<div class="mock-kpi"><div class="mk-val" style="color:${i === 0 ? c1 : "#e7eaf2"}">${v}</div><div class="mk-lbl">${["Ingresos", "Usuarios", "Uptime", "Rating"][i]}</div></div>`).join("")}
              </div>
              <div class="mock-chart">
                <svg viewBox="0 0 200 60" style="width:100%;height:auto">
                  <defs><linearGradient id="ng" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c1}" stop-opacity=".4"/><stop offset="100%" stop-color="${c1}" stop-opacity="0"/></linearGradient></defs>
                  <polygon points="0,60 20,45 40,48 60,32 80,36 100,20 120,24 140,10 160,14 200,4 200,60" fill="url(#ng)"/>
                  <polyline points="0,60 20,45 40,48 60,32 80,36 100,20 120,24 140,10 160,14 200,4" fill="none" stroke="${c1}" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  const logos = `
    <div class="logos-bar">
      <span class="logos-label">Usado por equipos en</span>
      ${["Stripe", "Vercel", "Linear", "Notion", "Figma"].map((l) => `<span class="logo-name">${l}</span>`).join("")}
    </div>`;
  const features = t.features.slice(0, 6).map((f, i) => `
    <div class="feat-card" style="--i:${i}">
      <div class="feat-ic" style="background:linear-gradient(135deg,${c1},${c2})">\u2726</div>
      <b>${f}</b>
    </div>`).join("");
  const extra = `
    .mesh{position:fixed;inset:-20%;z-index:-1;filter:blur(80px);
      background:radial-gradient(38% 36% at 70% 20%,${c1}44,transparent 70%),
                 radial-gradient(32% 30% at 20% 60%,${c2}38,transparent 70%);
      animation:drift 22s ease-in-out infinite alternate}
    @keyframes drift{to{transform:translate(-4%,5%) scale(1.1)}}
    .hero-split{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;padding:70px 48px 50px;max-width:1100px;margin:0 auto}
    .lead{color:#8a93a8;font-size:15.5px;line-height:1.7;margin-bottom:28px}
    .ctas{display:flex;gap:12px;flex-wrap:wrap}
    .trust{display:flex;align-items:center;gap:12px;margin-top:20px}
    .avatars{display:flex}.av{width:28px;height:28px;border-radius:50%;border:2px solid #0b0d12;margin-left:-8px}
    .avatars .av:first-child{margin-left:0}
    .trust span{font-size:12.5px;color:#6b7385}
    .mockup-shell{background:#0d1017;border:1px solid #ffffff18;border-radius:16px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6)}
    .mock-bar{display:flex;gap:5px;padding:10px 14px;background:#0a0c14;border-bottom:1px solid #ffffff10}
    .mock-bar i{width:8px;height:8px;border-radius:50%;background:#2a3042}
    .mock-bar i:first-child{background:${c1}}
    .mock-body{display:flex;min-height:200px}
    .mock-sidebar{width:90px;padding:12px 8px;border-right:1px solid #ffffff10;display:flex;flex-direction:column;gap:4px}
    .mock-nav-item{font-size:10px;padding:6px 8px;border-radius:6px;color:#6b7385;cursor:pointer}
    .mock-nav-item.active{font-weight:700}
    .mock-content{flex:1;padding:12px}
    .mock-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px}
    .mock-kpi{background:#ffffff06;border:1px solid #ffffff10;border-radius:8px;padding:8px;text-align:center}
    .mk-val{font-size:13px;font-weight:800}
    .mk-lbl{font-size:9px;color:#6b7385;margin-top:2px}
    .mock-chart{background:#ffffff06;border:1px solid #ffffff10;border-radius:8px;padding:10px}
    .logos-bar{display:flex;align-items:center;justify-content:center;gap:28px;padding:20px 48px;border-top:1px solid #ffffff10;border-bottom:1px solid #ffffff10;flex-wrap:wrap}
    .logos-label{font-size:12px;color:#4b5568;white-space:nowrap}
    .logo-name{font-size:14px;font-weight:700;color:#2a3042;letter-spacing:.5px}
    .feats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:36px 48px;max-width:1100px;margin:0 auto}
    .feat-card{background:#12151e;border:1px solid #ffffff14;border-radius:16px;padding:22px;display:flex;align-items:center;gap:14px;opacity:0;animation:up .5s forwards calc(var(--i)*70ms);transition:.25s}
    .feat-card:hover{border-color:${c1}55;transform:translateY(-2px)}
    .feat-ic{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;font-size:16px;flex-shrink:0;color:#fff}
    .feat-card b{font-size:13.5px;line-height:1.4}
    @media(max-width:900px){.hero-split{grid-template-columns:1fr;padding:50px 24px 30px}.feats{grid-template-columns:1fr 1fr;padding:24px}}`;
  return previewWrap(t, `${nav}${hero}${logos}<div class="feats">${features}</div>${previewFooter(t.name)}`, extra, gFont, "'Plus Jakarta Sans', sans-serif");
}
function buildAtlasStorePreview(t) {
  const [c1, c2] = t.colors;
  const gFont = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap";
  const products = [
    { name: "Varsity Jacket", price: "$129", old: "$179", badge: "Best seller", cat: "Moda" },
    { name: "Minimal Watch", price: "$249", old: "", badge: "Nuevo", cat: "Accesorios" },
    { name: "Canvas Tote", price: "$49", old: "$69", badge: "", cat: "Bolsas" },
    { name: "Air Sneakers", price: "$189", old: "", badge: "Popular", cat: "Calzado" }
  ];
  const nav = `
    <nav>
      <div class="brand"><span class="dot"></span>${t.name}</div>
      <div class="links">
        <a class="active">Tienda</a><a>Novedades</a><a>Sale</a>
        <span class="cart-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span class="cart-count" style="background:linear-gradient(135deg,${c1},${c2})">3</span>
        </span>
        <button class="cta">Mi cuenta</button>
      </div>
    </nav>`;
  const hero = `
    <section class="shop-hero">
      <div class="shop-hero-text">
        <div class="hero-badge" style="background:${c1}18;border:1px solid ${c1}44;color:${c1}">\u2726 Nueva colecci\xF3n 2026</div>
        <h1 style="font-size:clamp(32px,5vw,58px);line-height:1.0;letter-spacing:-2px">${t.tagline}</h1>
        <p style="color:#8a93a8;font-size:16px;line-height:1.6;max-width:420px">${t.description.split(".")[0]}.</p>
        <div style="display:flex;gap:12px;margin-top:28px">
          <button class="primary">Ver colecci\xF3n</button>
          <button class="ghost">Ofertas \u2193</button>
        </div>
      </div>
      <div class="shop-hero-visual">
        <div class="hero-img-card" style="background:linear-gradient(150deg,${c1}22,${c2}15,#12151e)">
          <div style="position:absolute;bottom:20px;left:20px;right:20px">
            <div style="font-size:11px;color:${c1};font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px">Destacado</div>
            <div style="font-size:18px;font-weight:800">Atlas Premium Kit</div>
            <div style="font-size:22px;font-weight:800;color:${c1};margin-top:4px">$299</div>
          </div>
          <div class="hero-tag" style="background:linear-gradient(135deg,${c1},${c2})">-40%</div>
        </div>
      </div>
    </section>`;
  const filters = ["Todos", "Moda", "Accesorios", "Calzado", "Bolsas"].map(
    (f, i) => `<button class="filter-btn${i === 0 ? " active" : ""}" style="${i === 0 ? `background:linear-gradient(135deg,${c1},${c2});color:#fff;border-color:transparent` : ""}">${f}</button>`
  ).join("");
  const productCards = products.map((p, i) => `
    <div class="prod-card" style="--i:${i}">
      <div class="prod-img" style="background:linear-gradient(${140 + i * 25}deg,color-mix(in srgb,${c1} ${30 - i * 4}%,#12151e),#0c0e15)">
        ${p.badge ? `<span class="prod-badge" style="background:linear-gradient(135deg,${c1},${c2})">${p.badge}</span>` : ""}
        <button class="prod-wish">\u2661</button>
      </div>
      <div class="prod-info">
        <div style="font-size:11px;color:#6b7385;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">${p.cat}</div>
        <b style="font-size:15px;display:block;margin-bottom:8px">${p.name}</b>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="display:flex;align-items:baseline;gap:6px">
            ${p.old ? `<s style="color:#4b5568;font-size:12px">${p.old}</s>` : ""}
            <span style="font-size:18px;font-weight:800;color:${c1}">${p.price}</span>
          </div>
          <button class="add-btn" style="background:linear-gradient(135deg,${c1},${c2})">+</button>
        </div>
      </div>
    </div>`).join("");
  const extra = `
    .shop-hero{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center;padding:60px 48px 40px;max-width:1100px;margin:0 auto}
    .hero-badge{display:inline-block;font-size:12px;font-weight:700;padding:6px 14px;border-radius:99px;margin-bottom:16px}
    .hero-img-card{position:relative;aspect-ratio:4/5;border-radius:24px;border:1px solid #ffffff14;overflow:hidden;cursor:pointer}
    .hero-tag{position:absolute;top:16px;right:16px;font-size:13px;font-weight:800;color:#fff;padding:6px 12px;border-radius:99px}
    .filters{display:flex;gap:10px;padding:0 48px 24px;flex-wrap:wrap}
    .filter-btn{padding:8px 20px;border-radius:99px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid #ffffff18;background:transparent;color:#98a1b3;transition:.2s}
    .filter-btn:hover{border-color:#ffffff35;color:#fff}
    .filter-btn.active{}
    .prod-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:0 48px 40px;max-width:1100px;margin:0 auto}
    .prod-card{background:#11141c;border:1px solid #ffffff12;border-radius:18px;overflow:hidden;opacity:0;animation:up .5s forwards calc(var(--i)*80ms);transition:.25s}
    .prod-card:hover{transform:translateY(-4px)!important;border-color:${c1}55;opacity:1}
    .prod-img{aspect-ratio:1/1;position:relative;display:flex;align-items:flex-start;justify-content:flex-end;padding:12px}
    .prod-badge{font-size:10px;font-weight:800;color:#fff;padding:4px 10px;border-radius:99px;text-transform:uppercase;letter-spacing:.5px}
    .prod-wish{position:absolute;top:12px;left:12px;background:#ffffff10;border:none;border-radius:50%;width:30px;height:30px;color:#fff;cursor:pointer;font-size:14px;display:grid;place-items:center}
    .prod-info{padding:14px 16px 18px}
    .add-btn{border:none;color:#fff;width:32px;height:32px;border-radius:10px;font-size:18px;cursor:pointer;display:grid;place-items:center}
    .cart-btn{position:relative;cursor:pointer;color:#98a1b3;display:flex;align-items:center}
    .cart-count{position:absolute;top:-6px;right:-8px;font-size:9px;font-weight:800;color:#fff;width:15px;height:15px;border-radius:50%;display:grid;place-items:center}
    @media(max-width:900px){.shop-hero{grid-template-columns:1fr;padding:40px 24px}.prod-grid{grid-template-columns:1fr 1fr;padding:0 20px 30px}}`;
  return previewWrap(t, `${nav}${hero}<div class="filters">${filters}</div><div class="prod-grid">${productCards}</div>${previewFooter(t.name)}`, extra, gFont, "'DM Sans', sans-serif");
}
function buildLumenPreview(t) {
  const [c1, c2] = t.colors;
  const gFont = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&display=swap";
  const nav = previewNav(t.name, c1, c2, ["Inicio", "Features", "Precios", "Contacto"]);
  const hero = `
    <div class="mesh"></div>
    <section class="lumen-hero">
      <span class="pill">Landing \xB7 Lighthouse 98+ \xB7 Gratis</span>
      <h1 class="lumen-h1">${t.tagline}</h1>
      <div class="lumen-line" style="background:linear-gradient(90deg,transparent,${c1},${c2},transparent)"></div>
      <p class="lead">${t.description.split(".")[0]}.</p>
      <div class="ctas">
        <button class="primary">Usar gratis \u2192</button>
        <button class="ghost">Ver demo en vivo</button>
      </div>
      <div class="lumen-meta">
        <div class="lumen-stat"><span style="color:${c1};font-weight:700">${t.sales.toLocaleString("es")}+</span> descargas</div>
        <div class="lumen-dot"></div>
        <div class="lumen-stat"><span style="color:${c1};font-weight:700">\u2605 ${t.rating}</span> valoraci\xF3n</div>
        <div class="lumen-dot"></div>
        <div class="lumen-stat"><span style="color:${c1};font-weight:700">98+</span> Lighthouse</div>
      </div>
    </section>`;
  const features = t.features.slice(0, 5).map((f, i) => `
    <div class="lumen-feat" style="--i:${i}">
      <div class="lf-num" style="color:${c1}">0${i + 1}</div>
      <div class="lf-text">
        <b>${f}</b>
      </div>
    </div>`).join("");
  const showcase = `
    <section class="lumen-showcase">
      <div class="ls-screen" style="background:#0a0c14">
        <div class="ls-bar"><i></i><i></i><i style="background:${c1}"></i></div>
        <div class="ls-content" style="padding:0">
          <!-- Mockup of a Dashboard -->
          <div style="display:flex; height:260px;">
            <!-- Sidebar -->
            <div style="width:60px; border-right:1px solid #ffffff10; display:flex; flex-direction:column; align-items:center; padding:16px 0; gap:16px; background:#080a12">
              <div style="width:24px; height:24px; border-radius:6px; background:linear-gradient(135deg,${c1},${c2})"></div>
              <div style="width:20px; height:20px; border-radius:4px; background:#ffffff10"></div>
              <div style="width:20px; height:20px; border-radius:4px; background:#ffffff10"></div>
              <div style="width:20px; height:20px; border-radius:4px; background:#ffffff10"></div>
            </div>
            <!-- Main Content -->
            <div style="flex:1; padding:24px; display:flex; flex-direction:column; gap:20px">
              <!-- Top -->
              <div style="display:flex; justify-content:space-between; align-items:center">
                <div style="width:120px; height:12px; border-radius:6px; background:#ffffff1a"></div>
                <div style="display:flex; gap:8px">
                   <div style="width:80px; height:24px; border-radius:12px; background:#ffffff0a"></div>
                   <div style="width:24px; height:24px; border-radius:12px; background:linear-gradient(135deg,${c1},${c2})"></div>
                </div>
              </div>
              <!-- Cards -->
              <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px">
                <div style="background:#11141c; border:1px solid #ffffff0a; border-radius:12px; padding:16px">
                  <div style="width:40px; height:8px; border-radius:4px; background:#ffffff10; margin-bottom:12px"></div>
                  <div style="width:60px; height:18px; border-radius:4px; background:linear-gradient(90deg,${c1},${c2})"></div>
                </div>
                <div style="background:#11141c; border:1px solid #ffffff0a; border-radius:12px; padding:16px">
                  <div style="width:40px; height:8px; border-radius:4px; background:#ffffff10; margin-bottom:12px"></div>
                  <div style="width:80px; height:18px; border-radius:4px; background:#ffffff22"></div>
                </div>
                <div style="background:#11141c; border:1px solid #ffffff0a; border-radius:12px; padding:16px">
                  <div style="width:40px; height:8px; border-radius:4px; background:#ffffff10; margin-bottom:12px"></div>
                  <div style="width:50px; height:18px; border-radius:4px; background:#ffffff22"></div>
                </div>
              </div>
              <!-- Chart area -->
              <div style="flex:1; background:#11141c; border:1px solid #ffffff0a; border-radius:12px; position:relative; overflow:hidden">
                <svg viewBox="0 0 400 100" style="position:absolute; bottom:0; width:100%; height:100%; preserveAspectRatio:none">
                  <defs><linearGradient id="lsGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c2}" stop-opacity="0.4"/><stop offset="100%" stop-color="${c2}" stop-opacity="0"/></linearGradient></defs>
                  <polygon points="0,100 0,60 50,70 100,40 150,55 200,30 250,45 300,10 350,35 400,20 400,100" fill="url(#lsGrad)"/>
                  <polyline points="0,60 50,70 100,40 150,55 200,30 250,45 300,10 350,35 400,20" fill="none" stroke="${c2}" stroke-width="2"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  const extra = `
    .mesh{position:fixed;inset:-25%;z-index:-1;filter:blur(90px);
      background:radial-gradient(36% 32% at 50% 10%,${c1}50,transparent 70%),
                 radial-gradient(30% 28% at 80% 70%,${c2}40,transparent 70%);
      animation:drift 26s ease-in-out infinite alternate}
    @keyframes drift{to{transform:translate(-3%,4%) scale(1.08)}}
    .lumen-hero{text-align:center;padding:90px 24px 50px;max-width:800px;margin:0 auto}
    .lumen-h1{font-size:clamp(36px,7vw,72px);line-height:.98;font-weight:900;letter-spacing:-3px;margin:20px 0;background:linear-gradient(120deg,#fff 40%,#aab3c5);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .lumen-line{height:2px;width:120px;margin:0 auto 24px;border-radius:2px}
    .lead{color:#8a93a8;font-size:16px;line-height:1.7;max-width:520px;margin:0 auto 28px}
    .ctas{display:flex;gap:12px;justify-content:center;margin-bottom:32px}
    .lumen-meta{display:flex;align-items:center;justify-content:center;gap:16px;font-size:13.5px;color:#6b7385}
    .lumen-dot{width:3px;height:3px;border-radius:50%;background:#3a3f50}
    .lumen-feats{display:flex;flex-direction:column;gap:0;max-width:680px;margin:0 auto;padding:20px 48px 0}
    .lumen-feat{display:flex;align-items:center;gap:20px;padding:20px 0;border-bottom:1px solid #ffffff0d;opacity:0;animation:up .5s forwards calc(var(--i)*80ms)}
    .lf-num{font-size:13px;font-weight:700;font-variant-numeric:tabular-nums;min-width:24px}
    .lf-text b{font-size:14.5px;font-weight:600}
    .lumen-showcase{padding:40px 48px;max-width:800px;margin:0 auto}
    .ls-screen{border:1px solid #ffffff14;border-radius:16px;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.5)}
    .ls-bar{display:flex;gap:5px;padding:10px 14px;background:#0a0c14;border-bottom:1px solid #ffffff10}
    .ls-bar i{width:8px;height:8px;border-radius:50%;background:#2a3042}
    .ls-content{padding:24px}
    .ls-p{height:8px;border-radius:4px;background:#ffffff10;margin-bottom:8px}
    @media(max-width:700px){.lumen-feats,.lumen-showcase{padding:20px}.lumen-meta{flex-wrap:wrap}}`;
  return previewWrap(t, `${nav}${hero}<div class="lumen-feats">${features}</div>${showcase}${previewFooter(t.name)}`, extra, gFont, "'Outfit', sans-serif");
}
function buildMonogramPreview(t) {
  const [c1, c2] = t.colors;
  const gFont = "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,700;0,900;1,300;1,700&family=DM+Sans:wght@400;500;600&display=swap";
  const nav = `
    <nav>
      <div class="brand" style="font-family:'Fraunces',serif;font-weight:700;font-style:italic;letter-spacing:-0.5px;font-size:20px">${t.name}</div>
      <div class="links"><a class="active">Trabajo</a><a>Proceso</a><a>Sobre m\xED</a>
        <button class="cta">Contactar</button>
      </div>
    </nav>`;
  const hero = `
    <section class="mono-hero">
      <div class="mono-tag" style="border-color:${c1}44;color:${c1}">Portfolio \xB7 Dise\xF1o & Direcci\xF3n</div>
      <h1 class="mono-title">Dise\xF1o que<br><em style="color:${c1};font-style:italic">habla</em> por ti</h1>
      <p class="mono-sub">Casos de estudio a pantalla completa. Transiciones de p\xE1gina fluidas. Un portfolio que hace que tu trabajo brille.</p>
    </section>`;
  const projects = [
    { name: "Branding App M\xF3vil", cat: "Branding", year: "2026", span: "col-span-2" },
    { name: "Redise\xF1o Fintech", cat: "UI/UX", year: "2026", span: "" },
    { name: "Campa\xF1a Social", cat: "Social Media", year: "2025", span: "" },
    { name: "Dashboard Analytics", cat: "UI/UX", year: "2025", span: "col-span-2" }
  ];
  const grid = projects.map((p, i) => `
    <div class="mono-proj ${p.span}" style="--i:${i}">
      <div class="mono-proj-img" style="background:linear-gradient(${135 + i * 30}deg,color-mix(in srgb,${c1} ${35 - i * 6}%,#0f111a),#090b12)">
        <div class="mono-proj-info">
          <div class="mono-proj-cat" style="color:${c1}">${p.cat} \xB7 ${p.year}</div>
          <div class="mono-proj-name">${p.name}</div>
          <div class="mono-proj-arrow" style="color:${c1}">\u2192</div>
        </div>
      </div>
    </div>`).join("");
  const extra = `
    .mono-hero{text-align:center;padding:80px 48px 50px}
    .mono-tag{display:inline-block;font-size:12px;font-weight:500;padding:6px 16px;border-radius:99px;border:1px solid;margin-bottom:24px;letter-spacing:.5px}
    .mono-title{font-family:'Fraunces',serif;font-size:clamp(40px,6vw,72px);line-height:1.0;font-weight:900;letter-spacing:-2px;color:#fff;margin-bottom:20px;-webkit-text-fill-color:#fff}
    .mono-sub{color:#7a859a;font-size:15px;line-height:1.7;max-width:480px;margin:0 auto}
    .mono-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:0 48px 40px;max-width:1080px;margin:0 auto}
    .mono-proj{border-radius:18px;overflow:hidden;cursor:pointer;opacity:0;animation:up .5s forwards calc(var(--i)*90ms)}
    .col-span-2{grid-column:span 2}
    .mono-proj-img{aspect-ratio:4/3;position:relative;transition:transform .4s}
    .mono-proj:hover .mono-proj-img{transform:scale(1.02)}
    .mono-proj-info{position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,.85));display:flex;flex-direction:column;justify-content:flex-end;padding:24px;transform:translateY(10px);opacity:0;transition:.35s}
    .mono-proj:hover .mono-proj-info{opacity:1;transform:none}
    .mono-proj-cat{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px}
    .mono-proj-name{font-family:'Fraunces',serif;font-size:20px;font-weight:700;color:#fff;line-height:1.2}
    .mono-proj-arrow{font-size:20px;margin-top:8px}
    .mono-stats{display:flex;justify-content:center;gap:60px;padding:30px 48px;border-top:1px solid #ffffff10;flex-wrap:wrap}
    .mono-stats div{text-align:center}
    .mono-stats b{font-family:'Fraunces',serif;font-size:32px;display:block;color:#fff}
    .mono-stats span{font-size:11px;color:#6b7385;letter-spacing:1.2px;text-transform:uppercase}
    @media(max-width:700px){.mono-grid{grid-template-columns:1fr;padding:0 20px}.col-span-2{grid-column:span 1}.mono-hero{padding:60px 24px 30px}}`;
  const stats = `
    <div class="mono-stats">
      <div><b>${t.sales.toLocaleString("es")}+</b><span>Proyectos entregados</span></div>
      <div><b>\u2605 ${t.rating}</b><span>Valoraci\xF3n</span></div>
      <div><b>${t.pages}</b><span>P\xE1ginas incluidas</span></div>
    </div>`;
  return previewWrap(t, `${nav}${hero}<div class="mono-grid">${grid}</div>${stats}${previewFooter(t.name)}`, extra, gFont, "'DM Sans', sans-serif");
}
function buildPulsePreview(t) {
  const [c1, c2] = t.colors;
  const accent = t.accent;
  const gFont = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
  const kpis = [
    { label: "Ingresos", value: "$48,290", change: "+12.5%", up: true, spark: "M10,22 L18,18 L26,20 L34,14 L42,10 L50,12 L58,6" },
    { label: "Usuarios", value: "2,847", change: "+8.2%", up: true, spark: "M10,20 L18,22 L26,16 L34,18 L42,12 L50,14 L58,8" },
    { label: "\xD3rdenes", value: "1,394", change: "+23.1%", up: true, spark: "M10,24 L18,20 L26,22 L34,16 L42,14 L50,10 L58,6" },
    { label: "Churn", value: "2.4%", change: "-0.8%", up: false, spark: "M10,8 L18,10 L26,12 L34,14 L42,16 L50,18 L58,20" }
  ];
  const kpiCards = kpis.map((k, i) => `
    <div class="kpi" style="--i:${i}">
      <div class="kpi-top"><span class="kpi-label">${k.label}</span><span class="kpi-change ${k.up ? "up" : "down"}">${k.change}</span></div>
      <div class="kpi-value">${k.value}</div>
      <svg class="spark" viewBox="0 0 68 28"><polyline points="${k.spark}" fill="none" stroke="${k.up ? "#22c55e" : "#ef4444"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>`).join("");
  const linePoints = "0,140 40,120 80,130 120,90 160,100 200,60 240,70 280,40 320,50 360,20 400,30 440,10";
  const lineArea = linePoints + " 440,160 0,160";
  const barData = [65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95, 70];
  const months = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const bars = barData.map((v, i) => `<rect x="${i * 37 + 4}" y="${160 - v * 1.5}" width="24" height="${v * 1.5}" rx="4" fill="url(#barGrad)" opacity="0.85"><animate attributeName="height" from="0" to="${v * 1.5}" dur="0.6s" begin="${i * 0.05}s" fill="freeze"/><animate attributeName="y" from="160" to="${160 - v * 1.5}" dur="0.6s" begin="${i * 0.05}s" fill="freeze"/></rect>`).join("");
  const donutSegments = [
    { pct: 35, color: c1, label: "Premium" },
    { pct: 25, color: c2, label: "Pro" },
    { pct: 20, color: accent, label: "Enterprise" },
    { pct: 20, color: "#64748b", label: "Free" }
  ];
  let cumPct = 0;
  const donutPaths = donutSegments.map((s) => {
    const start = cumPct;
    cumPct += s.pct;
    const r = 54, cx = 70, cy = 70;
    const startAngle = start / 100 * 2 * Math.PI - Math.PI / 2;
    const endAngle = cumPct / 100 * 2 * Math.PI - Math.PI / 2;
    const largeArc = s.pct > 50 ? 1 : 0;
    const x1 = cx + r * Math.cos(startAngle), y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle), y2 = cy + r * Math.sin(endAngle);
    return `<path d="M${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2}" fill="none" stroke="${s.color}" stroke-width="18" stroke-linecap="round" opacity="0.9"><animate attributeName="stroke-dasharray" from="0,400" to="${s.pct / 100 * 340},400" dur="0.8s" begin="${cumPct * 8}ms" fill="freeze"/></path>`;
  }).join("");
  const donutLegend = donutSegments.map((s) => `<div class="legend-item"><span class="legend-dot" style="background:${s.color}"></span>${s.label} <b>${s.pct}%</b></div>`).join("");
  const orders = [
    { id: "#38291", client: "Mar\xEDa Garc\xEDa", amount: "$2,450", status: "Completado", date: "Hace 2h" },
    { id: "#38290", client: "Carlos Ruiz", amount: "$890", status: "Pendiente", date: "Hace 4h" },
    { id: "#38289", client: "Ana L\xF3pez", amount: "$3,200", status: "Completado", date: "Hace 6h" }
  ];
  const statusClass = { Completado: "st-ok", Pendiente: "st-warn", Procesando: "st-proc" };
  const orderRows = orders.map((o) => `
    <tr>
      <td class="mono">${o.id}</td><td>${o.client}</td>
      <td class="mono">${o.amount}</td>
      <td><span class="st ${statusClass[o.status]}">${o.status}</span></td>
      <td class="dim">${o.date}</td>
    </tr>`).join("");
  const sidebarItems = [
    { icon: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>', label: "Dashboard", active: true },
    { icon: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>', label: "Analytics", active: false },
    { icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', label: "Usuarios", active: false },
    { icon: '<rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/>', label: "Pagos", active: false },
    { icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>', label: "Reportes", active: false }
  ];
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="${gFont}" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Inter',sans-serif;background:#0a0c14;color:#e2e8f0;display:flex;height:100vh;overflow:hidden}
    .sidebar{width:220px;background:#0d1017;border-right:1px solid #ffffff10;display:flex;flex-direction:column;padding:18px 0;flex-shrink:0}
    .sb-brand{display:flex;align-items:center;gap:10px;padding:0 18px 20px;border-bottom:1px solid #ffffff10}
    .sb-dot{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,${c1},${c2});box-shadow:0 4px 16px ${c1}55}
    .sb-name{font-weight:800;font-size:16px;letter-spacing:-.3px}
    .sb-nav{flex:1;padding:14px 8px;display:flex;flex-direction:column;gap:2px}
    .sb-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;color:#7a859a;font-size:13px;cursor:pointer;font-weight:500}
    .sb-item.active{background:linear-gradient(135deg,${c1}22,${c2}18);color:#fff;font-weight:600}
    .sb-item svg{width:16px;height:16px;flex-shrink:0}
    .sb-footer{padding:14px 14px;border-top:1px solid #ffffff10;display:flex;align-items:center;gap:10px}
    .sb-avatar{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,${c1},${c2});display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff}
    .sb-user{font-size:12px;font-weight:600}.sb-role{font-size:10px;color:#5b6478}
    .main{flex:1;display:flex;flex-direction:column;overflow:hidden}
    .topbar{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;border-bottom:1px solid #ffffff10;background:#0d101788;backdrop-filter:blur(12px)}
    .topbar h2{font-size:17px;font-weight:700}
    .search{display:flex;align-items:center;gap:8px;background:#ffffff08;border:1px solid #ffffff12;border-radius:9px;padding:7px 12px;width:200px}
    .search svg{color:#4b5568;width:14px;height:14px}
    .search span{color:#4b5568;font-size:12px}
    .tb-avatar{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,${c1},${c2});display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;cursor:pointer}
    .content{flex:1;overflow-y:auto;padding:20px 24px;display:flex;flex-direction:column;gap:18px}
    .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
    .kpi{background:#11141c;border:1px solid #ffffff10;border-radius:13px;padding:16px 18px;opacity:0;animation:fadeUp .45s forwards calc(var(--i)*80ms)}
    .kpi:hover{border-color:${accent}44}
    .kpi-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
    .kpi-label{font-size:12px;color:#7a859a;font-weight:500}
    .kpi-change{font-size:11px;font-weight:700;padding:2px 7px;border-radius:5px}
    .kpi-change.up{color:#22c55e;background:#22c55e18}
    .kpi-change.down{color:#ef4444;background:#ef444418}
    .kpi-value{font-size:24px;font-weight:800;letter-spacing:-.6px;margin-bottom:6px}
    .spark{width:100%;height:26px;opacity:.7}
    .charts{display:grid;grid-template-columns:1.6fr 1fr;gap:14px}
    .chart-card{background:#11141c;border:1px solid #ffffff10;border-radius:13px;padding:18px}
    .chart-title{font-size:13px;font-weight:700;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center}
    .chart-title .tab{font-size:11px;color:#7a859a;padding:3px 8px;border-radius:5px;cursor:pointer}
    .chart-title .tab.active{background:#ffffff10;color:#e2e8f0}
    .chart-grid line{stroke:#ffffff0a;stroke-width:1}
    .chart-labels{display:flex;justify-content:space-between;padding:6px 2px 0}
    .chart-labels span{font-size:9px;color:#4b5568}
    .bar-labels{display:flex;justify-content:space-between;padding:5px 4px 0}
    .bar-labels span{font-size:9px;color:#4b5568}
    .donut-wrap{display:flex;flex-direction:column;align-items:center;gap:14px}
    .donut-svg{width:130px;height:130px}
    .donut-center{font-size:20px;font-weight:800;fill:#e2e8f0}
    .donut-sub{font-size:10px;fill:#7a859a}
    .legend{display:flex;flex-wrap:wrap;gap:8px 14px;justify-content:center}
    .legend-item{display:flex;align-items:center;gap:5px;font-size:11px;color:#98a1b3}
    .legend-dot{width:7px;height:7px;border-radius:2px;flex-shrink:0}
    .legend-item b{color:#e2e8f0}
    .bottom{display:grid;grid-template-columns:1fr;gap:14px}
    .table-wrap{background:#11141c;border:1px solid #ffffff10;border-radius:13px;padding:18px;overflow:hidden}
    .table-wrap table{width:100%;border-collapse:collapse;font-size:12.5px}
    .table-wrap th{text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:1.2px;color:#4b5568;padding:0 0 10px;font-weight:700;border-bottom:1px solid #ffffff10}
    .table-wrap td{padding:10px 0;border-bottom:1px solid #ffffff08;color:#c8d1e0}
    .table-wrap tr:last-child td{border-bottom:none}
    .mono{font-family:'IBM Plex Mono','SF Mono',Consolas,monospace;font-size:11.5px;color:#7a859a}
    .dim{color:#4b5568;font-size:11px}
    .st{font-size:11px;font-weight:600;padding:2px 8px;border-radius:5px}
    .st-ok{color:#22c55e;background:#22c55e16}
    .st-warn{color:#f59e0b;background:#f59e0b16}
    .st-proc{color:#3b82f6;background:#3b82f616}
    @keyframes fadeUp{to{opacity:1;transform:none}}
    @media(max-width:1100px){.kpis{grid-template-columns:repeat(2,1fr)}.charts{grid-template-columns:1fr}}
    @media(max-width:768px){.sidebar{display:none}.kpis{grid-template-columns:1fr 1fr}}
  </style></head><body>
  <aside class="sidebar">
    <div class="sb-brand"><div class="sb-dot"></div><span class="sb-name">${t.name}</span></div>
    <nav class="sb-nav">
      ${sidebarItems.map((item) => `
      <div class="sb-item${item.active ? " active" : ""}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${item.icon}</svg>${item.label}
      </div>`).join("")}
    </nav>
    <div class="sb-footer"><div class="sb-avatar">JD</div><div><div class="sb-user">Juan D\xEDaz</div><div class="sb-role">Admin</div></div></div>
  </aside>
  <div class="main">
    <header class="topbar"><h2>Dashboard</h2><div style="display:flex;align-items:center;gap:12px">
      <div class="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><span>Buscar...</span></div>
      <div class="tb-avatar">JD</div>
    </div></header>
    <div class="content">
      <div class="kpis">${kpiCards}</div>
      <div class="charts">
        <div class="chart-card">
          <div class="chart-title">Ingresos mensuales <div><span class="tab active">12M</span><span class="tab">6M</span><span class="tab">30D</span></div></div>
          <svg viewBox="0 0 450 170">
            <defs><linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c1}" stop-opacity="0.3"/><stop offset="100%" stop-color="${c1}" stop-opacity="0"/></linearGradient></defs>
            <g class="chart-grid"><line x1="0" y1="40" x2="450" y2="40"/><line x1="0" y1="80" x2="450" y2="80"/><line x1="0" y1="120" x2="450" y2="120"/><line x1="0" y1="160" x2="450" y2="160"/></g>
            <polygon points="${lineArea}" fill="url(#lineGrad)"><animate attributeName="opacity" from="0" to="1" dur="0.8s" fill="freeze"/></polygon>
            <polyline points="${linePoints}" fill="none" stroke="${c1}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><animate attributeName="stroke-dasharray" from="0,800" to="800,0" dur="1.2s" fill="freeze"/></polyline>
          </svg>
          <div class="chart-labels"><span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span><span>Ago</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dic</span></div>
        </div>
        <div class="chart-card">
          <div class="chart-title">Distribuci\xF3n</div>
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
        <div class="chart-title">\xD3rdenes por mes</div>
        <svg viewBox="0 0 450 175" style="width:100%;height:auto">
          <defs><linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c2}"/><stop offset="100%" stop-color="${c1}"/></linearGradient></defs>
          <g class="chart-grid"><line x1="0" y1="40" x2="450" y2="40"/><line x1="0" y1="80" x2="450" y2="80"/><line x1="0" y1="120" x2="450" y2="120"/><line x1="0" y1="160" x2="450" y2="160"/></g>
          ${bars}
        </svg>
        <div class="bar-labels">${months.map((m) => `<span>${m}</span>`).join("")}</div>
      </div>
      <div class="bottom">
        <div class="table-wrap">
          <div class="chart-title">\xD3rdenes recientes</div>
          <table><thead><tr><th>ID</th><th>Cliente</th><th>Monto</th><th>Estado</th><th>Fecha</th></tr></thead>
          <tbody>${orderRows}</tbody></table>
        </div>
      </div>
    </div>
  </div></body></html>`;
}
function buildInkBlogPreview(t) {
  const [c1, c2] = t.colors;
  const gFont = "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@400;500;600&display=swap";
  const nav = `
    <nav style="display:flex;justify-content:space-between;align-items:center;padding:18px 34px;position:sticky;top:0;backdrop-filter:blur(14px);background:rgba(11,13,18,.8);border-bottom:1px solid #ffffff12;z-index:9">
      <div style="font-family:'Lora',serif;font-weight:700;font-size:20px;font-style:italic;color:#fff">${t.name}</div>
      <div style="display:flex;gap:20px;align-items:center;font-size:13px;color:#98a1b3">
        <a style="cursor:pointer;color:#fff">Art\xEDculos</a><a style="cursor:pointer">Categor\xEDas</a><a style="cursor:pointer">Sobre</a>
        <button style="background:linear-gradient(135deg,${c1},${c2});border:none;color:#fff;padding:8px 16px;border-radius:99px;font-weight:600;cursor:pointer;font-size:12px">Newsletter</button>
      </div>
    </nav>`;
  const featured = `
    <div class="ink-featured">
      <div class="ink-feat-img" style="background:radial-gradient(circle at 70% 30%, ${c1}, transparent 70%), radial-gradient(circle at 20% 80%, ${c2}, transparent 70%), #0c0e15; box-shadow: inset 0 0 60px rgba(0,0,0,0.5)">
        <div class="ink-feat-overlay">
          <div class="ink-tag" style="background:rgba(11,13,18,0.7);backdrop-filter:blur(8px);color:${c1};border-color:${c1}44">Art\xEDculo destacado</div>
        </div>
      </div>
      <div class="ink-feat-text">
        <div class="ink-meta" style="color:${c1}">Angular \xB7 12 min lectura \xB7 Hace 2 d\xEDas</div>
        <h1 class="ink-h1">${t.tagline}</h1>
        <p class="ink-lead">${t.description.split(".")[0]}.</p>
        <div class="ink-author">
          <div class="ink-av" style="background:linear-gradient(135deg,${c1},${c2})"></div>
          <div><span class="ink-an">Admin Ink</span><br><span class="ink-ad">Editor \xB7 ${t.sales.toLocaleString("es")} lectores</span></div>
        </div>
      </div>
    </div>`;
  const posts = [
    { title: "Gu\xEDa completa de Angular Signals", cat: "Angular", time: "12 min", date: "Hace 3 d\xEDas", bg: `linear-gradient(145deg, ${c2}, #0c0e15 80%)` },
    { title: "10 tips de UI/UX que transformar\xE1n tu SaaS", cat: "Dise\xF1o", time: "6 min", date: "Hace 5 d\xEDas", bg: `conic-gradient(from 180deg at 50% 50%, ${c1}44, ${c2}66, #0c0e15 60%)` },
    { title: "C\xF3mo elegir la plantilla correcta para tu proyecto", cat: "Gu\xEDas", time: "8 min", date: "Hace 1 semana", bg: `radial-gradient(circle at 10% 10%, ${c1}88, #0c0e15 60%)` }
  ];
  const postList = posts.map((p, i) => `
    <article class="ink-post" style="--i:${i}">
      <div class="ink-post-thumb" style="background:${p.bg}; box-shadow: inset 0 0 20px rgba(0,0,0,0.4)"></div>
      <div class="ink-post-body">
        <div class="ink-tag" style="color:${c1};border-color:${c1}44">${p.cat}</div>
        <h3 class="ink-post-title">${p.title}</h3>
        <div class="ink-post-meta">${p.date} \xB7 ${p.time} lectura</div>
      </div>
    </article>`).join("");
  const newsletter = `
    <div class="ink-nl" style="background:linear-gradient(135deg,${c1}18,${c2}12);border:1px solid ${c1}33">
      <div class="ink-nl-icon" style="color:${c1}">\u2709</div>
      <h3 class="ink-nl-title">Suscr\xEDbete a ${t.name}</h3>
      <p class="ink-nl-sub">Recibe los mejores art\xEDculos cada semana. Sin spam, siempre.</p>
      <div class="ink-nl-form">
        <input placeholder="tu@email.com" class="ink-input"/>
        <button style="background:linear-gradient(135deg,${c1},${c2});border:none;color:#fff;padding:10px 20px;border-radius:99px;font-weight:600;cursor:pointer;font-size:13px">Suscribirme \u2192</button>
      </div>
    </div>`;
  const extra = `
    .ink-featured{display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:center;padding:50px 48px 40px;max-width:1000px;margin:0 auto}
    .ink-feat-img{aspect-ratio:16/10;border-radius:18px;position:relative;border:1px solid #ffffff14;overflow:hidden}
    .ink-feat-overlay{position:absolute;inset:0;padding:20px;display:flex;align-items:flex-end}
    .ink-tag{display:inline-block;font-size:11px;font-weight:600;padding:4px 12px;border-radius:99px;border:1px solid;letter-spacing:.5px}
    .ink-feat-text{}
    .ink-meta{font-size:12px;font-weight:500;letter-spacing:.5px;margin-bottom:12px;text-transform:uppercase}
    .ink-h1{font-family:'Lora',serif;font-size:clamp(22px,3.5vw,36px);line-height:1.2;font-weight:700;color:#fff;margin-bottom:14px;-webkit-text-fill-color:#fff}
    .ink-lead{font-size:15px;color:#8a93a8;line-height:1.7;margin-bottom:20px;font-family:'Inter',sans-serif}
    .ink-author{display:flex;align-items:center;gap:12px}
    .ink-av{width:38px;height:38px;border-radius:50%;flex-shrink:0}
    .ink-an{font-size:13.5px;font-weight:600;color:#fff}
    .ink-ad{font-size:12px;color:#6b7385}
    .ink-posts-section{max-width:1000px;margin:0 auto;padding:0 48px}
    .ink-posts-title{font-family:'Lora',serif;font-size:22px;font-weight:700;font-style:italic;color:#fff;margin-bottom:20px;border-bottom:1px solid #ffffff12;padding-bottom:14px}
    .ink-post{display:flex;gap:18px;background:#11141c;border:1px solid #ffffff12;border-radius:14px;overflow:hidden;cursor:pointer;margin-bottom:14px;opacity:0;animation:up .5s forwards calc(var(--i)*80ms);transition:.25s}
    .ink-post:hover{border-color:${c1}44;transform:translateX(4px)}
    .ink-post-thumb{width:100px;flex-shrink:0;min-height:80px}
    .ink-post-body{padding:14px 16px 14px 0;display:flex;flex-direction:column;gap:6px;flex:1}
    .ink-post-title{font-family:'Lora',serif;font-size:15px;font-weight:600;color:#e7eaf2;line-height:1.35}
    .ink-post-meta{font-size:12px;color:#6b7385;margin-top:auto}
    .ink-nl{border-radius:18px;padding:28px;text-align:center;margin:30px 48px 0;max-width:904px}
    .ink-nl-icon{font-size:28px;margin-bottom:10px}
    .ink-nl-title{font-family:'Lora',serif;font-size:22px;font-weight:700;color:#fff;margin-bottom:8px}
    .ink-nl-sub{font-size:14px;color:#8a93a8;margin-bottom:20px}
    .ink-nl-form{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
    .ink-input{background:#0b0d12;border:1px solid #ffffff18;border-radius:99px;padding:10px 18px;color:#e7eaf2;font-size:13px;width:220px}
    @media(max-width:800px){.ink-featured{grid-template-columns:1fr;padding:30px 24px}.ink-posts-section,.ink-nl{padding:0 20px;margin:20px 20px 0}}`;
  return previewWrap(t, `${nav}${featured}<div class="ink-posts-section"><div class="ink-posts-title">\xDAltimos art\xEDculos</div>${postList}</div>${newsletter}${previewFooter(t.name)}`, extra, gFont, "'Inter', sans-serif");
}
function buildOrbitPreview(t) {
  const [c1, c2] = t.colors;
  const gFont = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap";
  const nav = previewNav(t.name, c1, c2, ["Producto", "Equipo", "Careers", "Blog"]);
  const hero = `
    <div class="orbit-bg"></div>
    <section class="orbit-hero">
      <span class="pill">Startup \xB7 ${t.name} \xB7 v2.0</span>
      <h1>${t.tagline}</h1>
      <p class="lead">${t.description.split(".")[0]}.</p>
      <div class="ctas"><button class="primary">Ver producto \u2192</button><button class="ghost">Hablar con ventas</button></div>
      <div class="orbit-ring">
        <div class="orbit-circle" style="border-color:${c1}22"></div>
        <div class="orbit-circle orbit-c2" style="border-color:${c2}18"></div>
        <div class="orbit-dot" style="background:${c1}"></div>
        <div class="orbit-dot orbit-d2" style="background:${c2}"></div>
        <div class="orbit-dot orbit-d3" style="background:${c1};width:6px;height:6px"></div>
      </div>
    </section>`;
  const services = ["Producto", "Plataforma", "Equipo", "Careers"].map((s, i) => `
    <div class="orbit-feat" style="--i:${i}">
      <div class="of-ic" style="background:linear-gradient(135deg,${c1},${c2})">
        <span>${["\u{1F680}", "\u26A1", "\u{1F465}", "\u{1F4BC}"][i]}</span>
      </div>
      <b>${s}</b>
      <small>${t.features[i] || "Tecnolog\xEDa de vanguardia para tu empresa"}</small>
    </div>`).join("");
  const team = [
    { name: "Ana Garc\xEDa", role: "CEO & Co-fundadora", initial: "A" },
    { name: "Carlos Ruiz", role: "CTO", initial: "C" },
    { name: "Mar\xEDa L\xF3pez", role: "Head of Design", initial: "M" },
    { name: "Pedro S\xE1nchez", role: "Head of Growth", initial: "P" }
  ];
  const teamCards = team.map((m, i) => `
    <div class="orbit-team-card" style="--i:${i}">
      <div class="otm-av" style="background:linear-gradient(135deg,color-mix(in srgb,${c1} ${60 - i * 12}%,${c2}),${c2})">${m.initial}</div>
      <b>${m.name}</b>
      <small>${m.role}</small>
    </div>`).join("");
  const extra = `
    .orbit-bg{position:fixed;inset:-30%;z-index:-1;filter:blur(100px);
      background:radial-gradient(32% 30% at 30% 20%,${c1}40,transparent 70%),
                 radial-gradient(28% 26% at 75% 65%,${c2}35,transparent 70%);
      animation:drift 28s ease-in-out infinite alternate}
    @keyframes drift{to{transform:translate(-3%,4%) scale(1.06)}}
    .orbit-hero{text-align:center;padding:90px 24px 60px;max-width:760px;margin:0 auto;position:relative;overflow:hidden}
    .lead{color:#8a93a8;font-size:16px;line-height:1.7;max-width:500px;margin:0 auto 28px}
    .ctas{display:flex;gap:12px;justify-content:center}
    .orbit-ring{position:absolute;inset:0;z-index:-1;pointer-events:none}
    .orbit-circle{border:1px solid;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}
    .orbit-circle{width:300px;height:300px;animation:spin 20s linear infinite}
    .orbit-c2{width:450px;height:450px;animation:spin 35s linear infinite reverse}
    @keyframes spin{to{transform:translate(-50%,-50%) rotate(360deg)}}
    .orbit-dot{width:10px;height:10px;border-radius:50%;position:absolute;top:calc(50% - 150px);left:50%;margin-left:-5px;animation:spin 20s linear infinite}
    .orbit-d2{top:calc(50% - 225px);animation:spin 35s linear infinite reverse}
    .orbit-d3{top:calc(50% + 140px);animation:spin 20s linear infinite}
    .orbit-feats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;padding:0 48px;max-width:1040px;margin:0 auto}
    .orbit-feat{background:#11141c;border:1px solid #ffffff14;border-radius:16px;padding:22px;text-align:center;opacity:0;animation:up .5s forwards calc(var(--i)*80ms);transition:.25s}
    .orbit-feat:hover{border-color:${c1}44;transform:translateY(-3px)}
    .of-ic{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;margin:0 auto 14px;font-size:20px}
    .orbit-feat b{display:block;font-size:15px;margin-bottom:6px}
    .orbit-feat small{color:#6b7385;font-size:12.5px;line-height:1.5}
    .orbit-section-title{text-align:center;font-size:22px;font-weight:700;margin:40px 0 24px;letter-spacing:-.5px}
    .orbit-team{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;padding:0 48px;max-width:1040px;margin:0 auto}
    .orbit-team-card{background:#11141c;border:1px solid #ffffff14;border-radius:16px;padding:24px;text-align:center;opacity:0;animation:up .5s forwards calc(var(--i)*80ms);transition:.25s}
    .orbit-team-card:hover{border-color:${c1}44;transform:translateY(-2px)}
    .otm-av{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#fff;margin:0 auto 14px}
    .orbit-team-card b{display:block;font-size:14px;font-weight:700;margin-bottom:4px}
    .orbit-team-card small{color:#6b7385;font-size:12px}
    @media(max-width:800px){.orbit-feats,.orbit-team{grid-template-columns:1fr 1fr;padding:0 20px}}`;
  return previewWrap(t, `${nav}${hero}<div class="orbit-feats">${services}</div><div class="orbit-section-title">El equipo</div><div class="orbit-team">${teamCards}</div>${previewFooter(t.name)}`, extra, gFont, "'Space Grotesk', sans-serif");
}
function buildCrateShopPreview(t) {
  const [c1, c2] = t.colors;
  const gFont = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap";
  const nav = previewNav(t.name, c1, c2, ["Explorar", "Tendencias", "Gratis", "Creadores"]);
  const hero = `
    <section class="crate-hero">
      <div class="crate-hero-bg" style="background:radial-gradient(60% 60% at 50% 0%,${c1}30,transparent 70%)"></div>
      <span class="pill">Mini-tienda \xB7 Productos digitales \xB7 Gratis</span>
      <h1 style="font-size:clamp(30px,5vw,52px);font-weight:900;letter-spacing:-1.5px;line-height:1.05;margin:16px 0 14px">${t.tagline}</h1>
      <p style="color:#8a93a8;font-size:15.5px;line-height:1.65;max-width:480px;margin:0 auto 28px">${t.description.split(".")[0]}.</p>
      <div style="display:flex;gap:12px;justify-content:center">
        <button class="primary">Explorar productos</button>
        <button class="ghost">Vender aqu\xED</button>
      </div>
    </section>`;
  const categories = ["Ebooks", "Cursos", "Templates", "Assets", "Plugins"].map((c, i) => `
    <div class="crate-cat" style="--i:${i};background:${i === 0 ? `linear-gradient(135deg,${c1},${c2})` : "#12151e"};border-color:${i === 0 ? "transparent" : "#ffffff14"};color:${i === 0 ? "#fff" : "#98a1b3"}">
      ${["\u{1F4D6}", "\u{1F393}", "\u{1F3A8}", "\u{1F5BC}", "\u{1F50C}"][i]} ${c}
    </div>`).join("");
  const products = [
    { name: "Angular UI Kit Pro", type: "Template", price: "Gratis", emoji: "\u{1F3A8}", reviews: "4.9", bg: `linear-gradient(135deg, ${c1}88, ${c2}88, #111 70%)` },
    { name: "SaaS Launchpad", type: "Curso", price: "$29", emoji: "\u{1F680}", reviews: "4.8", bg: `radial-gradient(circle at top right, ${c2}88, #111 70%)` },
    { name: "Icon Pack 2026", type: "Asset", price: "$9", emoji: "\u2B50", reviews: "4.7", bg: `conic-gradient(from 90deg, ${c1}44, ${c2}44, #111)` },
    { name: "CSS Animation Guide", type: "Ebook", price: "Gratis", emoji: "\u{1F4D6}", reviews: "4.9", bg: `linear-gradient(to bottom, ${c1}66, #111)` },
    { name: "TypeScript Mastery", type: "Curso", price: "$49", emoji: "\u{1F537}", reviews: "4.8", bg: `radial-gradient(ellipse at bottom, ${c2}aa, #111 60%)` },
    { name: "Figma Component Set", type: "Asset", price: "$19", emoji: "\u{1F3AF}", reviews: "5.0", bg: `linear-gradient(45deg, ${c1}55, ${c2}55, #111)` }
  ];
  const productCards = products.map((p, i) => `
    <div class="crate-prod" style="--i:${i}">
      <div class="cp-cover" style="height:120px; border-radius:12px; margin-bottom:16px; background:${p.bg}; display:grid; place-items:center; font-size:40px; box-shadow: inset 0 0 20px rgba(0,0,0,0.5)">
        ${p.emoji}
      </div>
      <div class="cp-type" style="color:${c1}; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px">${p.type}</div>
      <b class="cp-name" style="display:block; font-size:15px; margin-bottom:12px">${p.name}</b>
      <div class="cp-footer" style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #ffffff10; padding-top:12px; margin-top:auto">
        <span class="cp-price" style="font-weight:700; color:${p.price === "Gratis" ? "#22c55e" : "#fff"}">${p.price}</span>
        <span class="cp-rating" style="font-size:12px; color:#98a1b3">\u2605 ${p.reviews}</span>
      </div>
    </div>`).join("");
  const extra = `
    .crate-hero{text-align:center;padding:70px 24px 40px;max-width:760px;margin:0 auto;position:relative}
    .crate-hero-bg{position:absolute;inset:0;z-index:-1;pointer-events:none}
    .crate-cats{display:flex;gap:10px;padding:0 48px 30px;flex-wrap:wrap;justify-content:center}
    .crate-cat{font-size:13px;font-weight:700;padding:9px 18px;border-radius:12px;border:1px solid;cursor:pointer;opacity:0;animation:up .4s forwards calc(var(--i)*60ms);transition:.2s}
    .crate-cat:hover{border-color:${c1}44!important;color:#fff!important}
    .crate-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:0 48px 40px;max-width:1080px;margin:0 auto}
    .crate-prod{background:#11141c;border:1px solid #ffffff12;border-radius:18px;padding:22px;opacity:0;animation:up .5s forwards calc(var(--i)*70ms);transition:.25s;cursor:pointer}
    .crate-prod:hover{border-color:${c1}44;transform:translateY(-3px)}
    .cp-emoji{font-size:28px;width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px}
    .cp-type{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
    .cp-name{font-size:15px;font-weight:800;display:block;margin-bottom:14px;line-height:1.3}
    .cp-footer{display:flex;justify-content:space-between;align-items:center}
    .cp-price{font-size:17px;font-weight:800}
    .cp-rating{font-size:12px;color:#6b7385}
    @media(max-width:800px){.crate-grid{grid-template-columns:1fr 1fr;padding:0 20px}.crate-cats{padding:0 20px 20px}}`;
  return previewWrap(t, `${nav}${hero}<div class="crate-cats">${categories}</div><div class="crate-grid">${productCards}</div>${previewFooter(t.name)}`, extra, gFont, "'Nunito', sans-serif");
}
function buildFrameFolioPreview(t) {
  const [c1, c2] = t.colors;
  const gFont = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=Inter:wght@400;500&display=swap";
  const nav = `
    <nav>
      <div class="brand" style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;font-style:italic;letter-spacing:.5px">${t.name}</div>
      <div class="links"><a class="active">Galer\xEDa</a><a>Series</a><a>Sobre</a><a>Contacto</a></div>
    </nav>`;
  const hero = `
    <section class="frame-hero">
      <div class="fh-label" style="color:${c1}">Portfolio fotogr\xE1fico \xB7 ${t.sales.toLocaleString("es")} descargas</div>
      <h1 class="frame-h1">${t.tagline}</h1>
      <p class="frame-sub">${t.description.split(".")[0]}.</p>
      <button class="primary" style="margin-top:20px">Explorar galer\xEDa \u2192</button>
    </section>`;
  const photos = [
    { aspect: "portrait", span: "" },
    { aspect: "landscape", span: "grid-col-2" },
    { aspect: "portrait", span: "" },
    { aspect: "portrait", span: "" },
    { aspect: "landscape", span: "grid-col-2" },
    { aspect: "portrait", span: "" }
  ];
  const gallery = photos.map((p, i) => `
    <div class="frame-photo ${p.span}" style="--i:${i}">
      <div class="fp-img" style="background:linear-gradient(${130 + i * 30}deg,color-mix(in srgb,${c1} ${30 - i * 3}%,#0a0c15),#070810);aspect-ratio:${p.aspect === "portrait" ? "3/4" : "16/9"}">
        <div class="fp-overlay">
          <span class="fp-cat" style="color:${c1}">Serie ${String.fromCharCode(65 + i)}</span>
          <span class="fp-num" style="font-family:'Cormorant Garamond',serif">0${i + 1}</span>
        </div>
      </div>
    </div>`).join("");
  const extra = `
    .frame-hero{text-align:center;padding:80px 24px 40px;max-width:680px;margin:0 auto}
    .fh-label{font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px}
    .frame-h1{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,6vw,64px);line-height:1.05;font-weight:600;font-style:italic;color:#fff;margin-bottom:14px;-webkit-text-fill-color:#fff;letter-spacing:-1px}
    .frame-sub{font-size:15px;color:#7a859a;line-height:1.7}
    .frame-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:20px 32px 40px;max-width:1080px;margin:0 auto;align-items:start}
    .frame-photo{border-radius:12px;overflow:hidden;opacity:0;animation:up .6s forwards calc(var(--i)*90ms);cursor:pointer}
    .grid-col-2{grid-column:span 2}
    .fp-img{position:relative;transition:transform .5s cubic-bezier(.2,0,.2,1)}
    .frame-photo:hover .fp-img{transform:scale(1.03)}
    .fp-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(0,0,0,.7));display:flex;flex-direction:column;justify-content:flex-end;padding:18px;opacity:0;transition:opacity .4s}
    .frame-photo:hover .fp-overlay{opacity:1}
    .fp-cat{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:2px;margin-bottom:4px}
    .fp-num{font-size:28px;color:#fff;line-height:1;font-style:italic}
    .frame-stats{display:flex;justify-content:center;gap:56px;padding:28px;border-top:1px solid #ffffff10;flex-wrap:wrap}
    .frame-stats div{text-align:center}
    .frame-stats b{font-family:'Cormorant Garamond',serif;font-size:30px;display:block;color:#fff;font-style:italic}
    .frame-stats span{font-size:11px;color:#6b7385;text-transform:uppercase;letter-spacing:1.5px}
    @media(max-width:700px){.frame-gallery{grid-template-columns:1fr 1fr;padding:10px 16px 30px}.grid-col-2{grid-column:span 2}}`;
  const stats = `
    <div class="frame-stats">
      <div><b>${t.pages}</b><span>P\xE1ginas</span></div>
      <div><b>\u2605 ${t.rating}</b><span>Rating</span></div>
      <div><b>${t.sales}+</b><span>Descargas</span></div>
    </div>`;
  return previewWrap(t, `${nav}${hero}<div class="frame-gallery">${gallery}</div>${stats}${previewFooter(t.name)}`, extra, gFont, "'Inter', sans-serif");
}
function buildLaunchOnePreview(t) {
  const [c1, c2] = t.colors;
  const gFont = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@400;500;600;700&display=swap";
  const nav = `
    <nav>
      <div class="brand" style="font-family:'Bebas Neue',cursive;font-size:22px;letter-spacing:2px">${t.name}</div>
      <div class="links"><a class="active">Inicio</a><a>Actualizaciones</a>
        <button class="cta">Unirme \u2192</button>
      </div>
    </nav>`;
  const hero = `
    <div class="launch-bg"></div>
    <section class="launch-hero">
      <span class="pill">Coming soon \xB7 Lanzamiento pr\xF3ximo</span>
      <h1 class="launch-h1">${t.tagline}</h1>
      <p class="launch-sub">${t.description.split(".")[0]}.</p>
      <div class="countdown">
        <div class="cd-unit"><div class="cd-num" style="color:${c1}">14</div><div class="cd-lbl">d\xEDas</div></div>
        <div class="cd-sep" style="color:${c1}">:</div>
        <div class="cd-unit"><div class="cd-num" style="color:${c1}">08</div><div class="cd-lbl">horas</div></div>
        <div class="cd-sep" style="color:${c1}">:</div>
        <div class="cd-unit"><div class="cd-num" style="color:${c1}">32</div><div class="cd-lbl">min</div></div>
        <div class="cd-sep" style="color:${c1}">:</div>
        <div class="cd-unit"><div class="cd-num" style="color:${c1}">57</div><div class="cd-lbl">seg</div></div>
      </div>
      <div class="waitlist-form">
        <input class="wl-input" placeholder="tu@email.com"/>
        <button class="primary" style="padding:14px 28px">Reservar mi lugar \u2192</button>
      </div>
      <div class="wl-social">
        <div class="wl-avatars">
          ${[c1, c2, "#8b5cf6", "#06b6d4", c1].map((c) => `<div class="wl-av" style="background:linear-gradient(135deg,${c},${c2})"></div>`).join("")}
        </div>
        <span><b style="color:#fff">${t.sales.toLocaleString("es")}+</b> personas ya en lista</span>
      </div>
    </section>`;
  const features = t.features.slice(0, 4).map((f, i) => `
    <div class="launch-feat" style="--i:${i}">
      <div class="lf-dot" style="background:linear-gradient(135deg,${c1},${c2})"></div>
      <span>${f}</span>
    </div>`).join("");
  const extra = `
    .launch-bg{position:fixed;inset:-20%;z-index:-1;filter:blur(80px);
      background:radial-gradient(40% 38% at 50% 50%,${c1}50,transparent 70%),
                 radial-gradient(30% 28% at 80% 80%,${c2}35,transparent 70%);
      animation:pulse 8s ease-in-out infinite alternate}
    @keyframes pulse{to{transform:scale(1.08)}}
    .launch-hero{text-align:center;padding:80px 24px 50px;max-width:720px;margin:0 auto}
    .launch-h1{font-family:'Bebas Neue',cursive;font-size:clamp(50px,9vw,90px);line-height:.95;color:#fff;margin:18px 0 16px;letter-spacing:2px;-webkit-text-fill-color:#fff}
    .launch-sub{font-size:15.5px;color:#8a93a8;line-height:1.7;max-width:460px;margin:0 auto 32px}
    .countdown{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:32px}
    .cd-unit{text-align:center;background:#11141c;border:1px solid #ffffff14;border-radius:14px;padding:14px 20px;min-width:72px}
    .cd-num{font-family:'Bebas Neue',cursive;font-size:44px;line-height:1}
    .cd-lbl{font-size:10px;color:#6b7385;text-transform:uppercase;letter-spacing:1.5px;margin-top:4px}
    .cd-sep{font-family:'Bebas Neue',cursive;font-size:40px;margin-bottom:16px}
    .waitlist-form{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:20px}
    .wl-input{background:#11141c;border:1px solid #ffffff18;border-radius:12px;padding:14px 20px;color:#e7eaf2;font-size:14px;width:240px}
    .wl-social{display:flex;align-items:center;justify-content:center;gap:12px;font-size:13px;color:#6b7385}
    .wl-avatars{display:flex}.wl-av{width:26px;height:26px;border-radius:50%;border:2px solid #0b0d12;margin-left:-6px}
    .wl-avatars .wl-av:first-child{margin-left:0}
    .launch-feats{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;max-width:640px;margin:0 auto;padding:20px 48px 40px}
    .launch-feat{display:flex;align-items:center;gap:12px;background:#11141c;border:1px solid #ffffff12;border-radius:12px;padding:14px 18px;opacity:0;animation:up .5s forwards calc(var(--i)*80ms)}
    .lf-dot{width:10px;height:10px;border-radius:3px;flex-shrink:0}
    .launch-feat span{font-size:13.5px;color:#c6cddc}
    @media(max-width:600px){.countdown{gap:6px}.cd-unit{min-width:58px;padding:10px 14px}.launch-feats{grid-template-columns:1fr;padding:20px}}`;
  return previewWrap(t, `${nav}${hero}<div class="launch-feats">${features}</div>${previewFooter(t.name)}`, extra, gFont, "'Outfit', sans-serif");
}
function buildLedgerPreview(t) {
  const [c1, c2] = t.colors;
  const gFont = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700;800&display=swap";
  const kpis = [
    { label: "Ingresos netos", value: "$284,390", change: "+12.5%", up: true },
    { label: "Gastos totales", value: "$98,240", change: "+3.2%", up: false },
    { label: "Flujo de caja", value: "$186,150", change: "+18.7%", up: true },
    { label: "ROI anual", value: "34.8%", change: "+4.1pp", up: true }
  ];
  const kpiCards = kpis.map((k, i) => `
    <div class="ledger-kpi" style="--i:${i}">
      <div class="lk-label">${k.label}</div>
      <div class="lk-value" style="font-family:'IBM Plex Mono',monospace">${k.value}</div>
      <div class="lk-change ${k.up ? "up" : "down"}">${k.up ? "\u25B2" : "\u25BC"} ${k.change}</div>
    </div>`).join("");
  const linePoints = "0,90 50,80 100,85 150,60 200,70 250,40 300,50 350,25 400,35 450,10";
  const lineArea = linePoints + " 450,100 0,100";
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct"];
  const cashflow = [42, 38, 55, 47, 68, 72, 61, 80, 75, 92];
  const bars = cashflow.map((v, i) => `
    <g>
      <rect x="${i * 46 + 3}" y="${100 - v}" width="18" height="${v}" rx="3" fill="${c1}" opacity="0.7">
        <animate attributeName="height" from="0" to="${v}" dur="0.5s" begin="${i * 0.06}s" fill="freeze"/>
        <animate attributeName="y" from="100" to="${100 - v}" dur="0.5s" begin="${i * 0.06}s" fill="freeze"/>
      </rect>
      <rect x="${i * 46 + 23}" y="${100 - v * 0.7}" width="18" height="${v * 0.7}" rx="3" fill="${c2}" opacity="0.5">
        <animate attributeName="height" from="0" to="${v * 0.7}" dur="0.5s" begin="${i * 0.06 + 0.1}s" fill="freeze"/>
        <animate attributeName="y" from="100" to="${100 - v * 0.7}" dur="0.5s" begin="${i * 0.06 + 0.1}s" fill="freeze"/>
      </rect>
    </g>`).join("");
  const transactions = [
    { date: "2026-08-28", desc: "Pago cliente Enterprise A", amount: "+$12,400", type: "Ingreso" },
    { date: "2026-08-27", desc: "N\xF3mina agosto", amount: "-$8,200", type: "Gasto" },
    { date: "2026-08-26", desc: "Licencias software", amount: "-$1,340", type: "Gasto" },
    { date: "2026-08-25", desc: "Pago cliente Pro B", amount: "+$4,890", type: "Ingreso" },
    { date: "2026-08-24", desc: "Marketing digital", amount: "-$2,100", type: "Gasto" }
  ];
  const txRows = transactions.map((tx) => `
    <tr>
      <td style="font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:#6b7385">${tx.date}</td>
      <td style="font-size:13px">${tx.desc}</td>
      <td style="font-family:'IBM Plex Mono',monospace;font-size:13px;font-weight:600;color:${tx.amount.startsWith("+") ? "#22c55e" : "#ef4444"}">${tx.amount}</td>
      <td><span style="font-size:11px;padding:3px 10px;border-radius:5px;font-weight:600;background:${tx.type === "Ingreso" ? "#22c55e18" : "#ef444418"};color:${tx.type === "Ingreso" ? "#22c55e" : "#ef4444"}">${tx.type}</span></td>
    </tr>`).join("");
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="${gFont}" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Inter',sans-serif;background:#0a0c14;color:#e2e8f0;display:flex;height:100vh;overflow:hidden}
    .sidebar{width:220px;background:#0d1017;border-right:1px solid #ffffff10;display:flex;flex-direction:column;padding:18px 0;flex-shrink:0}
    .sb-brand{display:flex;align-items:center;gap:10px;padding:0 18px 20px;border-bottom:1px solid #ffffff10}
    .sb-dot{width:26px;height:26px;border-radius:7px;background:linear-gradient(135deg,${c1},${c2})}
    .sb-name{font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:15px;letter-spacing:-.3px}
    .sb-nav{flex:1;padding:14px 8px;display:flex;flex-direction:column;gap:2px}
    .sb-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;color:#7a859a;font-size:12.5px;cursor:pointer;font-weight:500}
    .sb-item.active{background:${c1}18;color:${c1};font-weight:600;border-left:2px solid ${c1}}
    .sb-item svg{width:15px;height:15px;flex-shrink:0}
    .main{flex:1;display:flex;flex-direction:column;overflow:hidden}
    .topbar{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;border-bottom:1px solid #ffffff10;background:#0d101788;backdrop-filter:blur(12px)}
    .topbar h2{font-size:16px;font-weight:700}
    .tb-period{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#6b7385;background:#ffffff08;border:1px solid #ffffff12;padding:5px 12px;border-radius:6px}
    .content{flex:1;overflow-y:auto;padding:20px 24px;display:flex;flex-direction:column;gap:16px}
    .ledger-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
    .ledger-kpi{background:#11141c;border:1px solid #ffffff10;border-radius:12px;padding:16px 18px;opacity:0;animation:fadeUp .45s forwards calc(var(--i)*80ms)}
    .lk-label{font-size:11px;color:#7a859a;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;font-weight:500}
    .lk-value{font-size:22px;font-weight:600;letter-spacing:-1px;margin-bottom:6px;color:#e2e8f0}
    .lk-change{font-size:11.5px;font-weight:600;padding:2px 7px;border-radius:5px;display:inline-block}
    .lk-change.up{color:#22c55e;background:#22c55e18}
    .lk-change.down{color:#ef4444;background:#ef444418}
    .charts-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    .chart-box{background:#11141c;border:1px solid #ffffff10;border-radius:12px;padding:18px}
    .chart-box-title{font-size:13px;font-weight:600;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center}
    .chart-box-title span{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#6b7385}
    .chart-grid line{stroke:#ffffff08;stroke-width:1}
    .months{display:flex;justify-content:space-between;margin-top:6px}
    .months span{font-size:9px;color:#4b5568;font-family:'IBM Plex Mono',monospace}
    .ledger-legend{display:flex;gap:16px;margin-bottom:10px}
    .ll-item{display:flex;align-items:center;gap:6px;font-size:11px;color:#98a1b3}
    .ll-dot{width:8px;height:8px;border-radius:2px}
    .table-box{background:#11141c;border:1px solid #ffffff10;border-radius:12px;padding:18px}
    .table-box-title{font-size:13px;font-weight:600;margin-bottom:14px}
    .table-box table{width:100%;border-collapse:collapse}
    .table-box th{text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:1.2px;color:#4b5568;padding:0 0 10px;font-weight:700;border-bottom:1px solid #ffffff10}
    .table-box td{padding:10px 0;border-bottom:1px solid #ffffff08;color:#c8d1e0}
    .table-box tr:last-child td{border-bottom:none}
    @keyframes fadeUp{to{opacity:1;transform:none}}
    @media(max-width:1100px){.ledger-kpis{grid-template-columns:repeat(2,1fr)}.charts-row{grid-template-columns:1fr}}
    @media(max-width:768px){.sidebar{display:none}.ledger-kpis{grid-template-columns:1fr 1fr}}
  </style></head><body>
  <aside class="sidebar">
    <div class="sb-brand"><div class="sb-dot"></div><span class="sb-name">${t.name}</span></div>
    <nav class="sb-nav">
      ${["Dashboard", "Ingresos", "Gastos", "Proyecciones", "Reportes", "Config"].map((l, i) => `
      <div class="sb-item${i === 0 ? " active" : ""}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
        ${l}</div>`).join("")}
    </nav>
    <div style="padding:14px;border-top:1px solid #ffffff10;font-family:'IBM Plex Mono',monospace;font-size:10px;color:#4b5568">v1.4.2 \xB7 Ledger Finance</div>
  </aside>
  <div class="main">
    <header class="topbar"><h2>Dashboard financiero</h2>
      <div style="display:flex;align-items:center;gap:12px">
        <span class="tb-period">Ago 2026</span>
        <button style="background:linear-gradient(135deg,${c1},${c2});border:none;color:#fff;padding:8px 16px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer">Exportar PDF</button>
      </div>
    </header>
    <div class="content">
      <div class="ledger-kpis">${kpiCards}</div>
      <div class="charts-row">
        <div class="chart-box">
          <div class="chart-box-title">Flujo de caja mensual <span>Proyectado vs. Real</span></div>
          <div class="ledger-legend">
            <div class="ll-item"><div class="ll-dot" style="background:${c1}"></div>Real</div>
            <div class="ll-item"><div class="ll-dot" style="background:${c2}"></div>Proyectado</div>
          </div>
          <svg viewBox="0 0 460 110" style="width:100%;height:auto">
            <g class="chart-grid"><line x1="0" y1="25" x2="460" y2="25"/><line x1="0" y1="50" x2="460" y2="50"/><line x1="0" y1="75" x2="460" y2="75"/><line x1="0" y1="100" x2="460" y2="100"/></g>
            ${bars}
          </svg>
          <div class="months">${months.map((m) => `<span>${m}</span>`).join("")}</div>
        </div>
        <div class="chart-box">
          <div class="chart-box-title">Tendencia ingresos</div>
          <svg viewBox="0 0 460 110" style="width:100%;height:auto">
            <defs><linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c1}" stop-opacity=".4"/><stop offset="100%" stop-color="${c1}" stop-opacity="0"/></linearGradient></defs>
            <g class="chart-grid"><line x1="0" y1="25" x2="460" y2="25"/><line x1="0" y1="50" x2="460" y2="50"/><line x1="0" y1="75" x2="460" y2="75"/><line x1="0" y1="100" x2="460" y2="100"/></g>
            <polygon points="${lineArea}" fill="url(#lg2)"/>
            <polyline points="${linePoints}" fill="none" stroke="${c1}" stroke-width="2" stroke-linecap="round"><animate attributeName="stroke-dasharray" from="0,600" to="600,0" dur="1.2s" fill="freeze"/></polyline>
          </svg>
          <div class="months">${months.map((m) => `<span>${m}</span>`).join("")}</div>
        </div>
      </div>
      <div class="table-box">
        <div class="table-box-title">Transacciones recientes</div>
        <table><thead><tr><th>Fecha</th><th>Descripci\xF3n</th><th>Monto</th><th>Tipo</th></tr></thead>
        <tbody>${txRows}</tbody></table>
      </div>
    </div>
  </div></body></html>`;
}
function buildJournalPreview(t) {
  const [c1, c2] = t.colors;
  const gFont = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Source+Serif+4:wght@300;400;600&display=swap";
  const nav = `
    <nav style="display:flex;justify-content:space-between;align-items:center;padding:20px 48px;position:sticky;top:0;backdrop-filter:blur(12px);background:rgba(11,13,18,.9);border-bottom:1px solid #ffffff08;z-index:9">
      <div style="font-family:'Playfair Display',serif;font-weight:700;font-size:22px;font-style:italic;color:#fff">${t.name}</div>
      <div style="display:flex;gap:24px;font-size:13px;color:#7a859a;align-items:center">
        <a style="cursor:pointer;color:#fff">Inicio</a>
        <a style="cursor:pointer">Archivo</a>
        <a style="cursor:pointer">Sobre</a>
        <a style="cursor:pointer">RSS</a>
      </div>
    </nav>`;
  const hero = `
    <section style="max-width:680px;margin:0 auto;padding:60px 24px 50px;border-bottom:1px solid #ffffff0d">
      <div style="font-size:11px;color:${c1};text-transform:uppercase;letter-spacing:2px;font-weight:600;margin-bottom:16px">Art\xEDculo destacado</div>
      <h1 style="font-family:'Playfair Display',serif;font-size:clamp(28px,5vw,46px);font-weight:700;line-height:1.15;color:#fff;margin-bottom:16px;-webkit-text-fill-color:#fff">${t.tagline}</h1>
      <p style="font-family:'Source Serif 4',serif;font-size:17px;color:#8a93a8;line-height:1.8;margin-bottom:24px;font-weight:300">${t.description.split(".")[0]}.</p>
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,${c1},${c2})"></div>
        <div>
          <div style="font-size:13.5px;font-weight:600;color:#fff">Admin Journal</div>
          <div style="font-size:12px;color:#6b7385">Hace 2 d\xEDas \xB7 8 min lectura</div>
        </div>
        <div style="margin-left:auto;font-size:13px;color:${c1};font-weight:500">Leer \u2192</div>
      </div>
    </section>`;
  const posts = [
    { title: "Tipograf\xEDa serif en la web moderna: gu\xEDa completa", date: "Hace 4 d\xEDas", time: "10 min", cat: "Dise\xF1o" },
    { title: "\xBFPor qu\xE9 los blogs minimalistas convierten m\xE1s?", date: "Hace 6 d\xEDas", time: "7 min", cat: "Marketing" },
    { title: "El arte de escribir un titular que engancha", date: "Hace 1 semana", time: "5 min", cat: "Escritura" },
    { title: "Dark mode sin JavaScript: puro CSS moderno", date: "Hace 10 d\xEDas", time: "6 min", cat: "CSS" }
  ];
  const postList = posts.map((p, i) => `
    <article style="padding:28px 0;border-bottom:1px solid #ffffff0d;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:start;cursor:pointer;opacity:0;animation:up .5s forwards ${i * 80}ms">
      <div>
        <div style="font-size:11px;color:${c1};text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:10px">${p.cat}</div>
        <h2 style="font-family:'Playfair Display',serif;font-size:clamp(16px,2.5vw,22px);font-weight:700;color:#e7eaf2;line-height:1.25;margin-bottom:8px;transition:.2s">${p.title}</h2>
        <div style="font-size:12px;color:#6b7385">${p.date} \xB7 ${p.time} lectura</div>
      </div>
      <div style="font-size:20px;color:#ffffff18;padding-top:4px">\u2192</div>
    </article>`).join("");
  const archive = ["2026", "2025", "2024"].map((y, i) => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #ffffff08;cursor:pointer">
      <span style="font-family:'Playfair Display',serif;font-size:15px;font-style:italic;color:#fff">${y}</span>
      <span style="font-size:12px;color:#6b7385">${[14, 22, 18][i]} art\xEDculos</span>
    </div>`).join("");
  const extra = `
    .journal-layout{display:grid;grid-template-columns:1.5fr 1fr;gap:0;max-width:1000px;margin:0 auto}
    .journal-main{padding:20px 48px 40px;border-right:1px solid #ffffff08}
    .journal-aside{padding:40px 32px;position:sticky;top:60px;align-self:start}
    .journal-section{margin-bottom:32px}
    .journal-section-title{font-family:'Playfair Display',serif;font-size:14px;font-style:italic;color:#6b7385;margin-bottom:16px;text-transform:lowercase;letter-spacing:.5px}
    @media(max-width:768px){.journal-layout{grid-template-columns:1fr}.journal-main{padding:20px 24px}.journal-aside{display:none}}`;
  const aside = `
    <div class="journal-section">
      <div class="journal-section-title">archivo</div>
      ${archive}
    </div>
    <div class="journal-section">
      <div class="journal-section-title">newsletter</div>
      <p style="font-family:'Source Serif 4',serif;font-size:14px;color:#7a859a;line-height:1.7;margin-bottom:14px;font-weight:300">Recibe mis art\xEDculos cuando los escriba. Sin algoritmos.</p>
      <div style="display:flex;flex-direction:column;gap:8px">
        <input style="background:#11141c;border:1px solid #ffffff12;border-radius:8px;padding:10px 14px;color:#e7eaf2;font-size:13px;font-family:'Source Serif 4',serif" placeholder="tu@email.com"/>
        <button style="background:linear-gradient(135deg,${c1},${c2});border:none;color:#fff;padding:10px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer">Suscribirme</button>
      </div>
    </div>`;
  return previewWrap(t, `${nav}${hero}<div class="journal-layout"><div class="journal-main">${postList}</div><aside class="journal-aside">${aside}</aside></div>${previewFooter(t.name)}`, extra, gFont, "'Source Serif 4', serif");
}
function buildSolarisPreview(t) {
  const [c1, c2] = t.colors;
  const gFont = "https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Raleway:wght@300;400;500;600;700&display=swap";
  const nav = `
    <nav>
      <div class="brand" style="font-family:'Syncopate',sans-serif;font-weight:700;letter-spacing:2px;font-size:14px;text-transform:uppercase">${t.name}</div>
      <div class="links">
        <a class="active">Galer\xEDa</a><a>Filtros</a><a>About</a><a>Contacto</a>
      </div>
    </nav>`;
  const filters = ["Todos", "Naturaleza", "Urbano", "Retrato", "Abstracto"].map((f, i) => `
    <button class="sol-filter${i === 0 ? " active" : ""}" style="${i === 0 ? `background:linear-gradient(135deg,${c1},${c2});color:#fff;border-color:transparent` : ""}">${f}</button>`).join("");
  const photos = [
    { h: "tall", row: "span 2" },
    { h: "short", row: "" },
    { h: "short", row: "" },
    { h: "short", row: "" },
    { h: "tall", row: "span 2" },
    { h: "short", row: "" }
  ];
  const gallery = photos.map((p, i) => {
    const gradients = [
      `radial-gradient(circle at 30% 30%, ${c1}, transparent 60%), radial-gradient(circle at 80% 80%, ${c2}, transparent 60%), #0a0c15`,
      `linear-gradient(145deg, ${c2}, #111 60%)`,
      `conic-gradient(from 120deg at 50% 50%, ${c1}33, ${c2}44, ${c1}33, #0a0c15 60%)`,
      `radial-gradient(ellipse at center, ${c2}88 0%, #0a0c15 70%)`,
      `linear-gradient(200deg, ${c1}, transparent 50%), linear-gradient(60deg, ${c2}, transparent 60%), #090b12`,
      `linear-gradient(to top right, ${c1}22, ${c2}66)`
    ];
    const bg = gradients[i % gradients.length];
    return `
    <div class="sol-photo" style="--i:${i};grid-row:${p.row || "span 1"}">
      <div class="sol-img" style="background:${bg}; box-shadow: inset 0 0 40px rgba(0,0,0,0.5)">
        <div class="sol-overlay">
          <div class="sol-series" style="font-family:'Syncopate',sans-serif;color:${c1};font-size:9px;letter-spacing:2px;text-transform:uppercase">Serie ${String.fromCharCode(65 + i)}</div>
          <div style="font-family:'Raleway',sans-serif;font-size:14px;font-weight:600;color:#fff">Imagen 0${i + 1}</div>
        </div>
        <div class="sol-num" style="font-family:'Syncopate',sans-serif;color:rgba(255,255,255,0.7)">0${i + 1}</div>
      </div>
    </div>`;
  }).join("");
  const extra = `
    .sol-hero{text-align:center;padding:70px 24px 30px;max-width:660px;margin:0 auto}
    .sol-title{font-family:'Syncopate',sans-serif;font-size:clamp(18px,4vw,36px);font-weight:700;letter-spacing:2px;text-transform:uppercase;line-height:1.2;color:#fff;margin:16px 0 12px;-webkit-text-fill-color:#fff}
    .sol-sub{font-family:'Raleway',sans-serif;font-size:15px;color:#7a859a;line-height:1.7;font-weight:400}
    .sol-filters{display:flex;gap:10px;justify-content:center;padding:20px 48px;flex-wrap:wrap}
    .sol-filter{font-family:'Raleway',sans-serif;font-size:12px;font-weight:600;padding:8px 18px;border-radius:99px;border:1px solid #ffffff18;background:transparent;color:#98a1b3;cursor:pointer;transition:.2s;letter-spacing:.5px}
    .sol-filter:hover{border-color:${c1}55;color:#fff}
    .sol-gallery{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:160px;gap:10px;padding:0 32px 40px;max-width:1060px;margin:0 auto}
    .sol-photo{border-radius:14px;overflow:hidden;opacity:0;animation:up .6s forwards calc(var(--i)*80ms);cursor:pointer}
    .sol-img{height:100%;position:relative;transition:transform .5s cubic-bezier(.2,0,.2,1)}
    .sol-photo:hover .sol-img{transform:scale(1.04)}
    .sol-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.8));display:flex;flex-direction:column;justify-content:flex-end;padding:16px;opacity:0;transition:opacity .4s}
    .sol-photo:hover .sol-overlay{opacity:1}
    .sol-series{margin-bottom:4px}
    .sol-num{position:absolute;top:12px;right:12px;font-size:13px;font-weight:700;letter-spacing:1px}
    .sol-about{display:flex;justify-content:center;gap:60px;padding:30px 48px;border-top:1px solid #ffffff10;flex-wrap:wrap}
    .sol-about div{text-align:center}
    .sol-about b{font-family:'Syncopate',sans-serif;font-size:24px;display:block;color:#fff;letter-spacing:1px}
    .sol-about span{font-family:'Raleway',sans-serif;font-size:11px;color:#6b7385;text-transform:uppercase;letter-spacing:2px;margin-top:4px;display:block}
    @media(max-width:700px){.sol-gallery{grid-template-columns:1fr 1fr;padding:0 16px 30px}.sol-photo{grid-row:span 1!important}}`;
  const about = `
    <div class="sol-about">
      <div><b>${t.sales.toLocaleString("es")}+</b><span>descargas</span></div>
      <div><b>\u2605 ${t.rating}</b><span>rating</span></div>
      <div><b>${t.pages}</b><span>p\xE1ginas</span></div>
    </div>`;
  const heroSection = `
    <div class="sol-hero">
      <span class="pill">Portfolio \xB7 Fotograf\xEDa \xB7 Visual</span>
      <h1 class="sol-title">${t.tagline}</h1>
      <p class="sol-sub">${t.description.split(".")[0]}.</p>
    </div>`;
  return previewWrap(t, `${nav}${heroSection}<div class="sol-filters">${filters}</div><div class="sol-gallery">${gallery}</div>${about}${previewFooter(t.name)}`, extra, gFont, "'Raleway', sans-serif");
}
function buildNexaPreview(t) {
  const [c1, c2] = t.colors;
  const gFont = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700;800&display=swap";
  const nav = previewNav(t.name, c1, c2, ["Producto", "Precios", "Docs", "Blog"]);
  const hero = `
    <div class="nexa-bg"></div>
    <section class="nexa-hero">
      <div class="nexa-badge" style="background:${c1}18;border:1px solid ${c1}33">
        <span style="color:${c1}">\u2726</span> SaaS + IA \xB7 Lanzado 2026
      </div>
      <h1 class="nexa-h1">${t.tagline}</h1>
      <p class="nexa-sub">${t.description.split(".")[0]}.</p>
      <div style="display:flex;gap:12px;justify-content:center;margin-bottom:36px">
        <button class="primary">Empezar gratis \u2192</button>
        <button class="ghost">Ver demo</button>
      </div>
      <div class="nexa-mockup">
        <div class="nm-shell">
          <div class="nm-bar"><i></i><i></i><i style="background:${c1}"></i></div>
          <div class="nm-body">
            <div class="nm-sidebar">
              <div class="nm-logo" style="background:linear-gradient(135deg,${c1},${c2})">N</div>
              ${["\u{1F4CA}", "\u26A1", "\u{1F916}", "\u{1F4C8}", "\u2699\uFE0F"].map((ic, i) => `<div class="nm-ic${i === 1 ? " active" : ""}" style="${i === 1 ? `color:${c1}` : ""}">${ic}</div>`).join("")}
            </div>
            <div class="nm-main">
              <div class="nm-topbar">
                <span class="nm-title">Automatizaciones IA</span>
                <button class="nm-btn" style="background:linear-gradient(135deg,${c1},${c2})">+ Nueva</button>
              </div>
              <div class="nm-automations">
                ${[
    { name: "Lead scoring", status: "Activo", runs: "1.2K" },
    { name: "Email sequences", status: "Activo", runs: "890" },
    { name: "Churn prediction", status: "Pausado", runs: "340" }
  ].map((a, i) => `
                <div class="nm-auto" style="border-color:#ffffff10">
                  <div class="nm-auto-dot" style="background:${a.status === "Activo" ? "#22c55e" : "#f59e0b"}"></div>
                  <span class="nm-auto-name">${a.name}</span>
                  <span class="nm-auto-runs">${a.runs} ejecuciones</span>
                  <span class="nm-auto-status" style="color:${a.status === "Activo" ? "#22c55e" : "#f59e0b"}">${a.status}</span>
                </div>`).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  const logos = `
    <div class="nexa-logos">
      <span style="font-size:11px;color:#4b5568;letter-spacing:1px;text-transform:uppercase">Usado por equipos en</span>
      ${["Stripe", "Linear", "Vercel", "Notion", "Figma"].map((l) => `<span style="font-size:14px;font-weight:700;color:#2a3042">${l}</span>`).join("")}
    </div>`;
  const bento = t.features.slice(0, 6).map((f, i) => `
    <div class="nexa-feat" style="--i:${i}${i === 0 ? ";grid-column:span 2;background:linear-gradient(135deg," + c1 + "18," + c2 + "12);border-color:" + c1 + "33" : ""}">
      <div class="nf-ic" style="background:${i === 0 ? `linear-gradient(135deg,${c1},${c2})` : "#ffffff0a"}">${["\u{1F916}", "\u26A1", "\u{1F4CA}", "\u{1F517}", "\u{1F3AF}", "\u{1F512}"][i]}</div>
      <b style="font-size:${i === 0 ? "16px" : "14px"}">${f}</b>
    </div>`).join("");
  const extra = `
    .nexa-bg{position:fixed;inset:-25%;z-index:-1;filter:blur(90px);
      background:radial-gradient(34% 32% at 20% 20%,${c2}45,transparent 70%),
                 radial-gradient(28% 26% at 80% 70%,${c1}50,transparent 70%);
      animation:drift 20s ease-in-out infinite alternate}
    @keyframes drift{to{transform:translate(-4%,5%) scale(1.1)}}
    .nexa-hero{text-align:center;padding:80px 24px 40px;max-width:860px;margin:0 auto}
    .nexa-badge{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;padding:6px 14px;border-radius:99px;margin-bottom:18px;letter-spacing:.3px}
    .nexa-h1{font-size:clamp(30px,5.5vw,58px);font-weight:800;line-height:1.0;letter-spacing:-2px;margin-bottom:16px;background:linear-gradient(120deg,#fff 35%,#aab3c5);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .nexa-sub{font-size:16px;color:#8a93a8;line-height:1.7;max-width:540px;margin:0 auto 28px}
    .nexa-mockup{max-width:680px;margin:0 auto}
    .nm-shell{background:#0d1017;border:1px solid #ffffff18;border-radius:16px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6)}
    .nm-bar{display:flex;gap:5px;padding:10px 14px;background:#0a0c14;border-bottom:1px solid #ffffff10}
    .nm-bar i{width:8px;height:8px;border-radius:50%;background:#2a3042}
    .nm-body{display:flex;min-height:220px}
    .nm-sidebar{width:50px;background:#080a12;border-right:1px solid #ffffff10;display:flex;flex-direction:column;align-items:center;padding:12px 0;gap:12px}
    .nm-logo{width:28px;height:28px;border-radius:8px;font-weight:800;font-size:14px;color:#fff;display:grid;place-items:center;margin-bottom:8px}
    .nm-ic{font-size:16px;cursor:pointer;opacity:.5;padding:4px}
    .nm-ic.active{opacity:1}
    .nm-main{flex:1;display:flex;flex-direction:column}
    .nm-topbar{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid #ffffff08}
    .nm-title{font-size:13px;font-weight:600}
    .nm-btn{border:none;color:#fff;padding:6px 12px;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer}
    .nm-automations{padding:10px 16px;display:flex;flex-direction:column;gap:8px}
    .nm-auto{display:flex;align-items:center;gap:10px;background:#ffffff04;border:1px solid;border-radius:8px;padding:8px 12px}
    .nm-auto-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
    .nm-auto-name{font-size:12px;font-weight:500;flex:1}
    .nm-auto-runs{font-size:10.5px;color:#6b7385}
    .nm-auto-status{font-size:11px;font-weight:600}
    .nexa-logos{display:flex;align-items:center;justify-content:center;gap:28px;padding:24px 48px;border-top:1px solid #ffffff10;border-bottom:1px solid #ffffff10;flex-wrap:wrap}
    .nexa-bento{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:32px 48px;max-width:1080px;margin:0 auto}
    .nexa-feat{background:#11141c;border:1px solid #ffffff14;border-radius:16px;padding:22px;display:flex;flex-direction:column;gap:10px;opacity:0;animation:up .5s forwards calc(var(--i)*70ms);transition:.25s}
    .nexa-feat:hover{border-color:${c1}44;transform:translateY(-2px)}
    .nf-ic{width:40px;height:40px;border-radius:11px;font-size:20px;display:grid;place-items:center;flex-shrink:0}
    .nexa-feat b{line-height:1.3}
    @media(max-width:800px){.nexa-bento{grid-template-columns:1fr 1fr;padding:20px}.nexa-feat:first-child{grid-column:span 2}}`;
  return previewWrap(t, `${nav}${hero}${logos}<div class="nexa-bento">${bento}</div>${previewFooter(t.name)}`, extra, gFont, "'Bricolage Grotesque', sans-serif");
}
function buildStorefrontPreview(t) {
  const [c1, c2] = t.colors;
  const gFont = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,600&display=swap";
  const nav = `
    <nav class="sf-nav">
      <div class="sf-brand">${t.name}</div>
      <div class="sf-links">
        <a class="active">Inicio</a>
        <a>Colecci\xF3n</a>
        <a>Mujer</a>
        <a>Hombre</a>
      </div>
      <div class="sf-actions">
        <span>B\xFAsqueda</span>
        <span>Favoritos</span>
        <div class="sf-cart">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span class="sf-badge">3</span>
        </div>
      </div>
    </nav>`;
  const hero = `
    <div class="sf-hero">
      <div class="sf-hero-bg" style="background:linear-gradient(135deg,${c1}18,${c2}10)">
        <div class="sf-img-placeholder">
           <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" width="80" height="80"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </div>
      </div>
      <div class="sf-hero-content">
        <span class="sf-tag">Nueva colecci\xF3n 2026</span>
        <h1 class="sf-h1">Eleva tu estilo con<br><i>Storefront Pro</i></h1>
        <p class="sf-lead">${t.description.split(".")[0]}.</p>
        <button class="sf-btn" style="background:linear-gradient(135deg,${c1},${c2})">Explorar colecci\xF3n \u2192</button>
      </div>
    </div>`;
  const products = [
    { n: "Bolso Minimal", p: "$120" },
    { n: "Chaqueta Urban", p: "$240", badge: "Nuevo" },
    { n: "Zapatillas Runner", p: "$95" },
    { n: "Gafas de sol", p: "$85", badge: "-20%" }
  ];
  const grid = `
    <div class="sf-section">
      <div class="sf-section-header">
        <h2 class="sf-h2">Tendencias</h2>
        <a class="sf-viewall" style="color:${c1}">Ver todo \u2192</a>
      </div>
      <div class="sf-grid">
        ${products.map((p, i) => `
          <div class="sf-card" style="--i:${i}">
            <div class="sf-card-img" style="background:linear-gradient(140deg,${c1}15,${c2}12,transparent)">
              ${p.badge ? `<span class="sf-card-badge" style="background:${p.badge.includes("%") ? "#ef4444" : "#10b981"}">${p.badge}</span>` : ""}
              <button class="sf-add">A\xF1adir</button>
            </div>
            <div class="sf-card-info">
              <b>${p.n}</b>
              <span>${p.p}</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>`;
  const extra = `
    .sf-nav{display:flex;justify-content:space-between;align-items:center;padding:20px 48px;border-bottom:1px solid #ffffff10;position:sticky;top:0;background:rgba(11,13,18,.9);backdrop-filter:blur(16px);z-index:10}
    .sf-brand{font-family:'Playfair Display',serif;font-size:24px;font-style:italic;font-weight:600}
    .sf-links{display:flex;gap:32px;font-size:13px;font-weight:500;color:#98a1b3}
    .sf-links a.active{color:#fff}
    .sf-actions{display:flex;gap:24px;align-items:center;font-size:13px;color:#98a1b3}
    .sf-cart{position:relative;display:flex;align-items:center}
    .sf-badge{position:absolute;top:-8px;right:-8px;background:${c1};color:#fff;font-size:10px;font-weight:700;width:16px;height:16px;border-radius:50%;display:grid;place-items:center}
    .sf-hero{position:relative;height:500px;display:flex;align-items:center;padding:0 48px;margin:24px;border-radius:24px;overflow:hidden;border:1px solid #ffffff10}
    .sf-hero-bg{position:absolute;inset:0;z-index:0;display:grid;place-items:center}
    .sf-hero-content{position:relative;z-index:1;max-width:560px}
    .sf-tag{display:inline-block;padding:6px 14px;border:1px solid #ffffff22;border-radius:99px;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:24px;color:#d1d5db;backdrop-filter:blur(10px)}
    .sf-h1{font-size:52px;font-weight:800;line-height:1.1;letter-spacing:-1.5px;margin-bottom:20px}
    .sf-h1 i{font-family:'Playfair Display',serif;font-weight:600;color:${c1}}
    .sf-lead{font-size:16px;color:#98a1b3;line-height:1.6;margin-bottom:32px}
    .sf-btn{border:none;color:#fff;padding:16px 32px;border-radius:99px;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 8px 24px ${c1}44}
    .sf-section{padding:48px;max-width:1200px;margin:0 auto}
    .sf-section-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:32px}
    .sf-h2{font-size:28px;font-weight:700;letter-spacing:-0.5px}
    .sf-viewall{font-size:13px;font-weight:600;cursor:pointer}
    .sf-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
    .sf-card{opacity:0;animation:up .6s forwards calc(var(--i)*100ms)}
    .sf-card-img{aspect-ratio:3/4;border-radius:16px;position:relative;margin-bottom:16px;overflow:hidden;border:1px solid #ffffff0a;display:flex;align-items:flex-end;padding:16px;justify-content:center}
    .sf-card-badge{position:absolute;top:12px;left:12px;color:#fff;font-size:10px;font-weight:700;padding:4px 8px;border-radius:4px;text-transform:uppercase;letter-spacing:0.5px}
    .sf-add{background:rgba(255,255,255,.1);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);color:#fff;width:100%;padding:12px;border-radius:10px;font-size:13px;font-weight:600;opacity:0;transform:translateY(10px);transition:.3s}
    .sf-card:hover .sf-add{opacity:1;transform:none}
    .sf-card-info{display:flex;justify-content:space-between;align-items:center}
    .sf-card-info b{font-size:14px;font-weight:600}
    .sf-card-info span{font-size:14px;color:#98a1b3}
    @media(max-width:900px){.sf-grid{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:600px){.sf-hero{height:auto;padding:60px 24px;text-align:center}.sf-hero-content{margin:0 auto}.sf-nav{padding:20px}.sf-links{display:none}}
  `;
  return previewWrap(t, `${nav}${hero}${grid}${previewFooter(t.name)}`, extra, gFont, "'Plus Jakarta Sans', sans-serif");
}
function buildGenericPreview(t) {
  const [c1, c2] = t.colors;
  const cat = CATEGORY_LABELS[t.category];
  const price = t.price === 0 ? "Gratis" : `$${t.price}`;
  const gFont = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
  const nav = previewNav(t.name, c1, c2);
  const hero = `
    <div class="mesh"></div>
    <header>
      <span class="pill">${cat} \xB7 v2.4 \xB7 Premium</span>
      <h1>${t.tagline}</h1>
      <p class="lead">${t.description.split(".")[0]}. Dise\xF1ada al detalle, lista para producci\xF3n.</p>
      <div class="ctas">
        <button class="primary">Probar ${price} <b aria-hidden="true">\u2192</b></button>
        <button class="ghost">Ver demo</button>
      </div>
      <div class="meta">\u2605 ${t.rating} \xB7 ${t.sales.toLocaleString("es")} ventas \xB7 ${t.pages} p\xE1ginas \xB7 Lighthouse 98</div>
      <div class="marquee" aria-hidden="true"><span>${t.name}</span><i>\u2726</i><span>HTML5</span><i>\u2726</i><span>PREMIUM</span><i>\u2726</i><span>VELOZ</span><i>\u2726</i><span>${t.name}</span><i>\u2726</i><span>HTML5</span><i>\u2726</i></div>
    </header>`;
  const cards = t.features.slice(0, 6).map((f, i) => `
    <div class="card" style="--i:${i}">
      <div class="ic"></div><b>${f}</b><small>Incluido en ${t.name}</small>
    </div>`).join("");
  const stats = `
    <section class="stats">
      <div><b>${t.sales.toLocaleString("es")}+</b><span>ventas</span></div>
      <div><b>${t.rating}\u2605</b><span>valoraci\xF3n</span></div>
      <div><b>${t.pages}</b><span>p\xE1ginas</span></div>
      <div><b>98</b><span>Lighthouse</span></div>
    </section>
    <section class="quotes">
      <div class="qcard"><div class="stars">\u2605\u2605\u2605\u2605\u2605</div><p>\xABLista para producci\xF3n. La abrimos y qued\xF3 online el mismo d\xEDa.\xBB</p><small><b>Mar\xEDa</b> \xB7 Cliente</small></div>
      <div class="qcard"><div class="stars">\u2605\u2605\u2605\u2605\u2605</div><p>\xABEst\xE9tica premium y cero peso de m\xE1s. Impresionante.\xBB</p><small><b>Diego</b> \xB7 CTO</small></div>
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
  return previewWrap(t, `${nav}${hero}${stats}<div class="grid">${cards}</div>${previewFooter(t.name)}`, extra, gFont, "'Plus Jakarta Sans', sans-serif");
}

// gen-previews.ts
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var outDir = path.join(process.cwd(), "preview-outputs");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
for (const t of TEMPLATES) {
  const html = buildPreviewHtml(t);
  fs.writeFileSync(path.join(outDir, t.id + ".html"), html, "utf8");
  console.log("Generated:", t.id, "(" + html.length + " bytes)");
}
