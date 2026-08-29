import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface SeoData {
  title?: string;
  description?: string;
  image?: string;
  /** Ruta (con barra inicial) para construir la URL canónica absoluta. */
  path?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);

  private defaults = {
    title: 'Templa — Plantillas web premium y documentos Office',
    description:
      'Descarga plantillas web premium y plantillas para PowerPoint y Word. Comprueba cada plantilla en vivo, paga con Webpay y recibe el código fuente al instante.',
    image: '/previews/aurora-desktop.webp',
  };

  /** URL absoluta del sitio (raíz de producción o dev). */
  private origin(): string {
    if (typeof window === 'undefined') return 'http://localhost:4200';
    return window.location.origin;
  }

  /** URL absoluta de una ruta o asset. */
  absolute(url?: string): string {
    if (!url) return this.origin();
    if (/^https?:\/\//.test(url)) return url;
    return `${this.origin()}${url.startsWith('/') ? url : '/' + url}`;
  }

  private ensureCanonical(): void {
    if (!this.meta.getTag('rel=canonical')) {
      this.meta.addTag({ rel: 'canonical' });
    }
  }

  set(data: SeoData = {}): void {
    const title = data.title ? `${data.title} — Templa` : this.defaults.title;
    const description = data.description || this.defaults.description;
    const image = this.absolute(data.image || this.defaults.image);
    const url = this.absolute(data.path || window.location.pathname);

    this.title.setTitle(title);

    const tags: Record<string, string> = {
      description,
      'og:title': title,
      'og:description': description,
      'og:type': data.title ? 'website' : 'website',
      'og:url': url,
      'og:image': image,
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
    };
    for (const [name, content] of Object.entries(tags)) {
      this.meta.updateTag(
        name.includes(':')
          ? { property: name, content }
          : { name, content },
      );
    }

    this.ensureCanonical();
    this.meta.updateTag({ rel: 'canonical', href: url });
  }

  reset(): void {
    this.set({});
  }
}
