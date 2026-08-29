/**
 * Utilidades compartidas para todos los renderers de preview.
 */

export function previewBaseCSS(): string {
  return `
    *{margin:0;padding:0;box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{font-family:-apple-system,'Segoe UI',Roboto,sans-serif;background:#0b0d12;color:#e7eaf2}
    a{text-decoration:none;color:inherit}
    img{max-width:100%;display:block}
  `;
}

export function previewNav(name: string, c1: string, c2: string, links: string[] = ['Inicio', 'Producto', 'Precios', 'Contacto']): string {
  const linkHtml = links.map((l, i) => `<a${i === 0 ? ' class="active"' : ''}>${l}</a>`).join('');
  return `
    <nav>
      <div class="brand"><span class="dot"></span>${name}</div>
      <div class="links">${linkHtml}
        <button class="cta">Empezar</button>
      </div>
    </nav>`;
}

export function previewFooter(name: string): string {
  return `<footer>© 2026 ${name} — vista previa generada desde Templa</footer>`;
}

export function previewSharedStyles(c1: string, c2: string, accent: string): string {
  return `
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

export function previewWrap(t: { name: string; colors: [string, string]; accent: string }, bodyContent: string, extraCSS: string = ''): string {
  const [c1, c2] = t.colors;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"/>
  <style>${previewBaseCSS()}${previewSharedStyles(c1, c2, t.accent)}${extraCSS}</style></head><body>
  ${bodyContent}
  </body></html>`;
}
