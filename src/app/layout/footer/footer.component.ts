import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer>
      <div class="container top">
        <div class="brand-col">
          <a routerLink="/" class="logo"><span class="mark"></span>Templa</a>
          <p>
            Plantillas premium y gratuitas de calidad real. Compra una vez,
            usa para siempre. Lanza tu próximo proyecto esta misma semana.
          </p>
          <form class="news" (submit)="subscribe($event)">
            <input type="email" required placeholder="Tu email — 1 plantilla gratis al mes" />
            <button class="btn primary sm" type="submit">Suscribirme</button>
          </form>
        </div>

        <div class="cols">
          <div>
            <h4>Producto</h4>
            <a routerLink="/templates">Todas las plantillas</a>
            <a routerLink="/templates" [queryParams]="{ tipo: 'gratis' }">Gratuitas premium</a>
            <a routerLink="/templates" [queryParams]="{ orden: 'nuevas' }">Novedades</a>
          </div>
          <div>
            <h4>Recursos</h4>
            <a routerLink="/info/soporte">Soporte</a>
            <a routerLink="/info/licencia">Licencias</a>
            <a routerLink="/info/soporte">Guía de marca</a>
          </div>
          <div>
            <h4>Compañía</h4>
            <a>Sobre nosotros</a>
            <a routerLink="/info/contacto">Contacto</a>
            <a routerLink="/info/contacto">Afiliados (30%)</a>
          </div>
        </div>
      </div>

      <div class="container bottom">
        <span>© 2026 Templa. Hecho con Angular.</span>
        <div class="legal">
          <a>Términos</a><a>Privacidad</a><a>Cookies</a>
        </div>
      </div>
    </footer>
  `,
  styles: `
    footer {
      border-top: 1px solid var(--border);
      background: var(--bg-soft);
      margin-top: 100px;
    }
    .top {
      display: grid; grid-template-columns: 1.2fr 2fr;
      gap: 60px; padding: 64px 0 48px;
    }
    .logo { font-family:'Sora'; font-weight:800; font-size:20px; display:flex; gap:9px; align-items:center; }
    .mark { width:24px; height:24px; border-radius:7px; background:var(--grad); box-shadow:0 4px 14px rgba(139,92,246,.5); }
    .brand-col p { color:var(--text-muted); font-size:14px; max-width:340px; margin:16px 0 22px; }
    .news { display:flex; gap:10px; max-width:380px; }
    .news input {
      flex:1; background:var(--surface); border:1px solid var(--border);
      border-radius:10px; padding:11px 14px; color:var(--text); font-size:13.5px; outline:none;
      transition:border-color .2s; font-family:inherit;
      &:focus { border-color: var(--accent); }
      &::placeholder { color: var(--text-faint); }
    }
    .cols { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
    h4 { font-size:13px; text-transform:uppercase; letter-spacing:1.6px; color:var(--text-faint); margin:0 0 18px; font-family:'Inter'; }
    .cols a {
      display:block; color:var(--text-muted); font-size:14px; margin-bottom:12px;
      cursor:pointer; transition:color .2s;
      &:hover { color:var(--text); }
    }
    .bottom {
      display:flex; justify-content:space-between; align-items:center;
      padding:22px 0; border-top:1px solid var(--border);
      color:var(--text-faint); font-size:13px; flex-wrap:wrap; gap:12px;
    }
    .legal { display:flex; gap:22px; a:hover { color:var(--text-muted); } }
    @media (max-width: 860px) {
      .top { grid-template-columns:1fr; gap:40px; }
    }
  `,
})
export class FooterComponent {
  private toast = inject(ToastService);

  subscribe(e: Event): void {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector('input');
    if (!input?.value) return;
    this.toast.show('¡Listo! Revisa tu email para descargar tu plantilla gratis.', 'info');
    input.value = '';
  }
}
