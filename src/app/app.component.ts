import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CartDrawerComponent } from './layout/cart-drawer/cart-drawer.component';
import { ToastsComponent } from './layout/toasts/toasts.component';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CartDrawerComponent,
    ToastsComponent,
  ],
  template: `
    <a class="skip-link" href="#contenido">Saltar al contenido</a>
    <app-header />
    <main id="contenido">
      <router-outlet />
    </main>
    <app-footer />
    <app-cart-drawer />
    <app-toasts />
  `,
  styles: `
    main { min-height: 60vh; }
  `,
})
export class AppComponent {
  private router = inject(Router);
  private seo = inject(SeoService);

  constructor() {
    const byRoute: Array<{
      re: RegExp;
      set: (m: RegExpMatchArray | null) => { title?: string; description?: string; path?: string };
    }> = [
      {
        re: /^\/templates$/,
        set: () => ({
          title: 'Catálogo de plantillas',
          description:
            'Explora todas nuestras plantillas web: landing, SaaS, dashboards, tiendas, blogs y portfolios. Filtra por categoría, tecnología y precio.',
          path: '/templates',
        }),
      },
      {
        re: /^\/powerpoint/,
        set: () => ({
          title: 'Plantillas PowerPoint',
          description:
            'Descarga plantillas profesionales para PowerPoint y edítalas al instante.',
          path: '/powerpoint',
        }),
      },
      {
        re: /^\/word/,
        set: () => ({
          title: 'Plantillas Word',
          description:
            'Documentos y plantillas para Microsoft Word listos para usar.',
          path: '/word',
        }),
      },
      {
        re: /^\/login/,
        set: () => ({ title: 'Iniciar sesión', path: '/login' }),
      },
      {
        re: /^\/mis-compras/,
        set: () => ({ title: 'Mis compras', path: '/mis-compras' }),
      },
      {
        re: /^\/descargas/,
        set: () => ({ title: 'Mis descargas', path: '/descargas' }),
      },
    ];

    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) return;
      const url = event.urlAfterRedirects.split('?')[0];
      const found = byRoute.find((r) => r.re.test(url));
      if (found) this.seo.set(found.set(url.match(found.re)));
    });
  }
}
