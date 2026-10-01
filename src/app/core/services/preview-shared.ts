/**
 * Utilidades compartidas para todos los renderers de preview.
 */

/** Luminancia relativa aproximada (0–1) de un color #rrggbb. */
function lum(hex: string): number {
  const n = parseInt(hex.replace('#', ''), 16);
  const f = (v: number) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  return 0.2126 * f((n >> 16) & 255) + 0.7152 * f((n >> 8) & 255) + 0.0722 * f(n & 255);
}

/** Devuelve colores legibles sobre fondo oscuro: si c1 es casi negro usa el acento. */
export function previewColors(t: { colors: [string, string]; accent: string }): [string, string] {
  const [a, b] = t.colors;
  const c1 = lum(a) < 0.08 ? t.accent : a;
  const c2 = lum(b) < 0.08 ? c1 : b;
  return [c1, c2];
}

export function previewBaseCSS(): string {
  return `
    *{margin:0;padding:0;box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{background:#0b0d12;color:#e7eaf2;min-height:100vh;overflow-x:hidden}
    a{text-decoration:none;color:inherit}
    img{max-width:100%;display:block}
    ::selection{background:#ffffff33;color:#fff}
    :focus-visible{outline:2px solid #fff;outline-offset:3px;border-radius:6px}
    button{font-family:inherit}
    button,.links a{-webkit-tap-highlight-color:transparent}
    @media(prefers-reduced-motion:reduce){
      *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;
        transition-duration:.001ms!important;scroll-behavior:auto!important}
    }
  `;
}

export function previewNav(name: string, c1: string, c2: string, links: string[] = ['Inicio', 'Producto', 'Precios', 'Contacto']): string {
  const linkHtml = links.map((l, i) => `<a href="#"${i === 0 ? ' class="active" aria-current="page"' : ''}>${l}</a>`).join('');
  return `
    <nav aria-label="Principal">
      <div class="brand"><span class="dot" aria-hidden="true"></span>${name}</div>
      <div class="links">${linkHtml}
        <button class="cta" type="button">Empezar</button>
      </div>
    </nav>`;
}

export function previewFooter(name: string): string {
  return `<footer>© 2026 ${name} — vista previa generada desde Templa</footer>`;
}

export function previewSharedStyles(c1: string, c2: string, accent: string, bodyFont: string = "-apple-system,'Segoe UI',Roboto,sans-serif"): string {
  return `
    body{font-family:${bodyFont};-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
    nav{display:flex;justify-content:space-between;align-items:center;padding:18px 34px;position:sticky;top:0;
        backdrop-filter:blur(14px);background:rgba(11,13,18,.75);border-bottom:1px solid #ffffff12;z-index:9}
    .brand{font-weight:800;font-size:17px;display:flex;gap:9px;align-items:center}
    .dot{width:22px;height:22px;border-radius:7px;background:linear-gradient(135deg,${c1},${c2});box-shadow:0 4px 14px ${c1}66}
    .links{display:flex;gap:20px;align-items:center;font-size:13.5px;color:#a4adbf}
    .links a{cursor:pointer;transition:color .2s;padding:8px 2px}.links a:hover,.links a.active{color:#fff}
    .cta{background:linear-gradient(135deg,${c1},${c2});border:none;color:#fff;padding:10px 16px;min-height:40px;border-radius:10px;
         font-weight:700;cursor:pointer;font-size:13px;transition:.2s}
    .cta:hover{transform:translateY(-1px);filter:brightness(1.1)}
    .pill{font-size:12px;color:${accent};border:1px solid ${accent}55;padding:5px 13px;border-radius:99px;
          background:${accent}14;font-weight:600;display:inline-block}
    h1{font-size:clamp(28px,5vw,48px);line-height:1.08;margin:22px 0 16px;font-weight:800;letter-spacing:-.04em;
       color:#f4f6fb;background:none;-webkit-text-fill-color:#f4f6fb}
    .primary{background:linear-gradient(135deg,${c1},${c2});color:#fff;border:none;padding:13px 26px;border-radius:12px;
             font-weight:700;cursor:pointer;font-size:15px;box-shadow:0 8px 30px ${c1}44;transition:.25s}
    .primary:hover{transform:translateY(-2px);box-shadow:0 14px 40px ${c1}66}
    .ghost{background:transparent;color:#c6cddc;border:1px solid #ffffff26;padding:13px 26px;border-radius:12px;
           cursor:pointer;font-size:15px;transition:.2s}
    .ghost:hover{border-color:#ffffff55}
    footer{padding:30px;text-align:center;color:#7d8599;font-size:12px;border-top:1px solid #ffffff10;margin-top:20px}
    @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
    @keyframes up{to{opacity:1;transform:none}}
    @media(max-width:560px){
      nav{padding:12px 14px}
      .links{gap:8px}
      .links a{display:none}
      h1{font-size:clamp(28px,8vw,38px)}
      .primary,.ghost{padding:12px 16px;font-size:14px;min-height:44px}
    }
  `;
}

/**
 * Genera el wrapper HTML completo para un preview.
 * @param fontImport - URL de Google Fonts para el @import (sin quotes)
 * @param bodyFont - familia CSS a aplicar al body
 */
export function previewWrap(
  t: { name: string; colors: [string, string]; accent: string },
  bodyContent: string,
  extraCSS: string = '',
  fontImport?: string,
  bodyFont?: string
): string {
  const [c1, c2] = previewColors(t);
  const fontLink = fontImport
    ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="${fontImport}" rel="stylesheet">`
    : '';
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="color-scheme" content="dark"/>
  <title>${t.name}</title>
  ${fontLink}
  <style>${previewBaseCSS()}${previewSharedStyles(c1, c2, t.accent, bodyFont)}${extraCSS}</style></head><body>
  ${bodyContent}
  </body></html>`;
}

/* ═══════════════════════════════════════════
   Bloques de conversión reutilizables
   (precios, FAQ, testimonios, confianza, CTA final)
   ═══════════════════════════════════════════ */
export type PreviewBlock = 'pricing' | 'faq' | 'testimonials' | 'trust' | 'newsletter' | 'cta';

interface BlockTheme { name: string; colors: [string, string]; accent: string }

export function previewBlocks(t: BlockTheme, blocks: PreviewBlock[], opts: { cta?: string; ctaTitle?: string; digital?: boolean } = {}): { html: string; css: string } {
  const [c1, c2] = previewColors(t);
  const cta = opts.cta ?? 'Empezar ahora';
  const parts: Record<PreviewBlock, string> = {
    pricing: `
      <section class="ux-sec" aria-labelledby="ux-pr"><h2 id="ux-pr">Planes simples, sin letra chica</h2>
        <p class="ux-sub">Cambia o cancela cuando quieras. Precios en USD, IVA incluido.</p>
        <div class="ux-plans">
          ${[['Básico', '$0', 'Para probar', ['1 proyecto', 'Soporte por email']],
             ['Pro', '$19', 'Lo más elegido', ['Proyectos ilimitados', 'Soporte prioritario', 'Dominio propio']],
             ['Equipo', '$49', 'Para crecer', ['Todo lo de Pro', '10 usuarios', 'Facturación']]]
            .map(([n, p, d, f], i) => `
            <article class="ux-plan${i === 1 ? ' hot' : ''}">
              ${i === 1 ? '<span class="ux-tag">Recomendado</span>' : ''}
              <h3>${n}</h3><small>${d}</small>
              <div class="ux-price"><b>${p}</b><span>/mes</span></div>
              <ul>${(f as string[]).map((x) => `<li>${x}</li>`).join('')}</ul>
              <button type="button" class="${i === 1 ? 'primary' : 'ghost'}">${i === 0 ? 'Empezar gratis' : 'Elegir ' + n}</button>
            </article>`).join('')}
        </div></section>`,
    trust: `
      <section class="ux-trust" aria-label="Garantías">
        ${[opts.digital ? ['⚡', 'Descarga inmediata', 'Acceso al pagar'] : ['🚚', 'Envío gratis', 'En compras sobre $50'], ['↩', opts.digital ? 'Garantía 14 días' : 'Devolución 30 días', 'Sin preguntas'], ['🔒', 'Pago seguro', 'Webpay, débito y crédito'], ['💬', 'Soporte humano', 'Lun a sáb, en español']]
          .map(([i, a, b]) => `<div><span aria-hidden="true">${i}</span><b>${a}</b><small>${b}</small></div>`).join('')}
      </section>`,
    testimonials: `
      <section class="ux-sec" aria-labelledby="ux-te"><h2 id="ux-te">Lo que dicen quienes ya lo usan</h2>
        <div class="ux-quotes">
          ${[['María José', 'Fundadora · Santiago', 'La publicamos en una tarde. Se ve carísima y carga al tiro.'],
             ['Diego', 'CTO · Valparaíso', 'Código limpio y fácil de adaptar. Nos ahorró semanas.'],
             ['Camila', 'Diseñadora · Concepción', 'Por fin una plantilla que respeta la tipografía y el espacio.']]
            .map(([n, r, q]) => `<figure><div class="ux-stars" aria-label="5 de 5">★★★★★</div><blockquote>«${q}»</blockquote><figcaption><b>${n}</b><small>${r}</small></figcaption></figure>`).join('')}
        </div></section>`,
    faq: `
      <section class="ux-sec narrow" aria-labelledby="ux-fq"><h2 id="ux-fq">Preguntas frecuentes</h2>
        ${[['¿Puedo usarla en proyectos comerciales?', 'Sí. La licencia incluye uso personal y comercial, sin atribución obligatoria.'],
           ['¿Qué incluye la compra?', 'El código fuente completo, guía de instalación y actualizaciones gratuitas.'],
           ['¿Cómo pago?', 'Con tarjeta de crédito o débito mediante Webpay. Recibes el enlace de descarga al instante.'],
           ['¿Tienen boleta o factura?', 'Sí, emitimos boleta o factura electrónica a pedido.']]
          .map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}</summary><p>${a}</p></details>`).join('')}
      </section>`,
    newsletter: `
      <section class="ux-sec narrow" aria-labelledby="ux-nl"><div class="ux-news"><h2 id="ux-nl">Recibe novedades y descuentos</h2>
        <p class="ux-sub">Un correo al mes. Sin spam, date de baja cuando quieras.</p>
        <form onsubmit="return false"><label class="sr" for="ux-em">Correo electrónico</label><input id="ux-em" type="email" placeholder="tu@correo.cl" autocomplete="email"/><button class="primary" type="submit">Suscribirme</button></form></div></section>`,
    cta: `
      <section class="ux-sec narrow"><div class="ux-final"><h2>${opts.ctaTitle ?? `Lleva ${t.name} a producción hoy`}</h2>
        <p class="ux-sub">Pago seguro con Webpay · Descarga inmediata · Garantía de 14 días</p>
        <button class="primary" type="button">${cta} →</button></div></section>`,
  };
  const css = `
    .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
    .ux-sec{max-width:1040px;margin:0 auto;padding:56px 24px}.ux-sec.narrow{max-width:760px}
    .ux-sec h2{font-size:clamp(24px,3.4vw,34px);letter-spacing:-.03em;text-align:center;margin-bottom:10px;line-height:1.15}
    .ux-sub{color:#a4adbf;text-align:center;font-size:14.5px;line-height:1.6;margin:0 auto 28px;max-width:52ch}
    .ux-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-items:stretch}
    .ux-plan{position:relative;display:flex;flex-direction:column;gap:6px;padding:26px 22px;border:1px solid #ffffff14;border-radius:20px;background:#ffffff06;transition:transform .25s,border-color .25s}
    .ux-plan:hover{transform:translateY(-3px);border-color:${c1}66}
    .ux-plan.hot{border-color:${c1};background:linear-gradient(170deg,${c1}1f,transparent 70%);box-shadow:0 20px 60px ${c1}22}
    .ux-plan h3{font-size:16px}.ux-plan small{color:#8a93a8;font-size:12.5px}
    .ux-tag{position:absolute;top:-11px;left:22px;font-size:11px;font-weight:700;padding:3px 10px;border-radius:99px;background:linear-gradient(135deg,${c1},${c2});color:#fff}
    .ux-price{display:flex;align-items:baseline;gap:4px;margin:10px 0}.ux-price b{font-size:40px;letter-spacing:-.04em}.ux-price span{color:#8a93a8;font-size:13px}
    .ux-plan ul{list-style:none;display:grid;gap:8px;margin-bottom:20px;flex:1;font-size:13.5px;color:#c6cddc}
    .ux-plan li::before{content:"✓";color:${c1};font-weight:800;margin-right:8px}
    .ux-plan button{width:100%}
    .ux-trust{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:1040px;margin:0 auto;padding:24px}
    .ux-trust div{display:grid;gap:2px;padding:16px;border:1px solid #ffffff12;border-radius:14px;background:#ffffff05}
    .ux-trust span{font-size:20px}.ux-trust b{font-size:14px}.ux-trust small{color:#8a93a8;font-size:12.5px}
    .ux-quotes{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:26px}
    .ux-quotes figure{padding:22px;border:1px solid #ffffff12;border-radius:18px;background:#ffffff05;display:flex;flex-direction:column;gap:12px}
    .ux-stars{color:${c1};letter-spacing:2px;font-size:14px}
    .ux-quotes blockquote{font-size:14.5px;line-height:1.6;color:#d5dbeb;flex:1}
    .ux-quotes figcaption b{display:block;font-size:13.5px}.ux-quotes figcaption small{color:#8a93a8;font-size:12px}
    details{border:1px solid #ffffff12;border-radius:14px;margin-bottom:10px;background:#ffffff05;transition:border-color .2s}
    details[open]{border-color:${c1}55}
    summary{cursor:pointer;padding:16px 18px;font-weight:600;font-size:15px;list-style:none;display:flex;justify-content:space-between;gap:12px;min-height:48px;align-items:center}
    summary::-webkit-details-marker{display:none}summary::after{content:"+";color:${c1};font-size:20px;line-height:1}
    details[open] summary::after{content:"–"}
    details p{padding:0 18px 18px;color:#a4adbf;font-size:14px;line-height:1.65}
    .ux-news,.ux-final{text-align:center;padding:40px 24px;border:1px solid ${c1}33;border-radius:24px;background:radial-gradient(80% 120% at 50% 0%,${c1}22,transparent 70%),#ffffff05}
    .ux-news form{display:flex;gap:10px;max-width:440px;margin:0 auto;flex-wrap:wrap;justify-content:center}
    .ux-news input{flex:1;min-width:200px;background:#ffffff0a;border:1px solid #ffffff24;border-radius:12px;padding:13px 16px;color:#fff;font:inherit;font-size:14.5px}
    .ux-news input::placeholder{color:#8a93a8}
    @media(max-width:860px){.ux-plans,.ux-quotes{grid-template-columns:1fr}.ux-trust{grid-template-columns:1fr 1fr}.ux-sec{padding:40px 18px}}`;
  return { html: blocks.map((b) => parts[b]).join(''), css };
}
