import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { SlicePipe, UpperCasePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { CATEGORY_LABELS, TemplateCategory, TemplateItem } from '../../core/models/template.model';
import { TEMPLATES } from '../../core/data/templates.data';
import { OFFICE_TEMPLATES } from '../../core/data/office.data';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SlicePipe, UpperCasePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly cart = inject(CartService);
  readonly theme = inject(ThemeService);
  readonly auth = inject(AuthService);
  private toast = inject(ToastService);
  private router = inject(Router);

  readonly cats = (Object.entries(CATEGORY_LABELS) as [TemplateCategory, string][]).map(
    ([id, label]) => ({ id, label }),
  );

  readonly scrolled = signal(false);
  readonly hidden = signal(false);
  readonly menuOpen = signal(false);
  readonly bump = signal(false);
  readonly progress = signal(0);
  readonly userMenuOpen = signal(false);
  readonly catalogOpen = signal(false);
  readonly searchOpen = signal(false);
  readonly searchQ = signal('');
  readonly onCatArea = signal(false);
  readonly officeOpen = signal(false);

  readonly catMenu = (Object.entries(CATEGORY_LABELS) as [TemplateCategory, string][]).map(
    ([id, label]) => ({
      id,
      label,
      count: TEMPLATES.filter((t) => t.category === id).length,
    }),
  );

  readonly powerpointTemplates = OFFICE_TEMPLATES.filter((o) => o.kind === 'pptx').slice(0, 4);
  readonly wordTemplates = OFFICE_TEMPLATES.filter((o) => o.kind === 'docx').slice(0, 4);
  readonly officeCount = OFFICE_TEMPLATES.length;

  readonly catalogToggleActive = computed(
    () => this.catalogOpen() || this.onCatArea(),
  );

  readonly liveResults = computed(() => {
    const term = this.searchQ().trim().toLowerCase();
    if (!term) return [];
    return TEMPLATES.filter(
      (t) =>
        t.name.toLowerCase().includes(term) ||
        t.tagline.toLowerCase().includes(term) ||
        t.tech.some((tech) => tech.toLowerCase().includes(term)) ||
        t.category.includes(term),
    )
      .sort((a, b) => b.rating - a.rating || b.sales - a.sales)
      .slice(0, 5);
  });

  readonly featuredTemplates = computed(() =>
    TEMPLATES.filter((t) => t.isFeatured).slice(0, 3),
  );

  readonly mobileOpen = signal<'catalog' | 'extras' | null>(null);

  private lastY = 0;

  constructor() {
    effect(() => {
      const count = this.cart.count();
      if (!count) return;
      this.bump.set(false);
      setTimeout(() => this.bump.set(true), 30);
    });

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const url = e.urlAfterRedirects.split('?')[0];
        this.onCatArea.set(
          url === '/templates' || url === '/powerpoint' || url === '/word',
        );
        this.officeOpen.set(false);
        this.catalogOpen.set(false);
      }
    });
  }

  onScroll(): void {
    const y = window.scrollY;
    this.scrolled.set(y > 24);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? Math.min(100, (y / max) * 100) : 0);

    const delta = y - this.lastY;
    if (y > 140 && delta > 6) {
      this.hidden.set(true);
      this.menuOpen.set(false);
      this.catalogOpen.set(false);
      this.searchOpen.set(false);
      this.officeOpen.set(false);
      this.mobileOpen.set(null);
    } else if (delta < -6 || y <= 140) {
      this.hidden.set(false);
    }
    this.lastY = y;
  }

  toggleCatalog(): void {
    this.catalogOpen.update((v) => !v);
    this.officeOpen.set(false);
    this.userMenuOpen.set(false);
  }

  openCatalogOnHover(): void {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      this.catalogOpen.set(true);
      this.officeOpen.set(false);
    }
  }

  closeCatalogDelay(): void {
    setTimeout(() => {
      if (this.catalogOpen()) this.catalogOpen.set(false);
    }, 180);
  }

  closeCatalog(): void {
    this.catalogOpen.set(false);
  }

  toggleOffice(): void {
    this.officeOpen.update((v) => !v);
    this.catalogOpen.set(false);
    this.userMenuOpen.set(false);
  }

  openOfficeOnHover(): void {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      this.officeOpen.set(true);
      this.catalogOpen.set(false);
    }
  }

  closeOfficeDelay(): void {
    setTimeout(() => {
      if (this.officeOpen()) this.officeOpen.set(false);
    }, 180);
  }

  closeOffice(): void {
    this.officeOpen.set(false);
  }

  toggleSearch(): void {
    this.searchOpen.update((v) => !v);
    this.catalogOpen.set(false);
    this.officeOpen.set(false);
    if (this.searchOpen()) {
      this.searchQ.set('');
      requestAnimationFrame(() => {
        document.getElementById('header-search')?.focus();
      });
    }
  }

  goSearch(): void {
    const term = this.searchQ().trim();
    this.router.navigate(['/templates'], { queryParams: term ? { q: term } : {} });
    this.searchOpen.set(false);
    this.menuOpen.set(false);
    this.searchQ.set('');
  }

  goToTemplate(id: string): void {
    this.router.navigate(['/templates', id]);
    this.searchOpen.set(false);
    this.searchQ.set('');
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
    if (!this.menuOpen()) this.mobileOpen.set(null);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    this.mobileOpen.set(null);
  }

  toggleMobile(section: 'catalog' | 'extras'): void {
    this.mobileOpen.update((v) => (v === section ? null : section));
  }

  toggleUserMenu(e: Event): void {
    e.stopPropagation();
    this.userMenuOpen.update((v) => !v);
  }

  closeUserMenu(): void {
    this.userMenuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: Event): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.user-zone')) {
      this.userMenuOpen.set(false);
    }
    if (!target.closest('.nav-catalog')) {
      this.catalogOpen.set(false);
    }
    if (!target.closest('.nav-office')) {
      this.officeOpen.set(false);
    }
    if (!target.closest('.header-search')) {
      this.searchOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.catalogOpen.set(false);
    this.officeOpen.set(false);
    this.searchOpen.set(false);
    this.userMenuOpen.set(false);
  }

  logout(): void {
    this.auth.logout();
    this.closeUserMenu();
    this.toast.show('Sesión cerrada. ¡Hasta pronto!', 'info');
  }
}
