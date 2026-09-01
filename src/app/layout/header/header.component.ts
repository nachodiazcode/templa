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

  private catalogTimeout: any;
  private officeTimeout: any;

  toggleCatalog(): void {
    this.catalogOpen.update((v) => !v);
    this.officeOpen.set(false);
    this.userMenuOpen.set(false);
  }

  openCatalogOnHover(): void {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      clearTimeout(this.catalogTimeout);
      this.catalogOpen.set(true);
      this.officeOpen.set(false);
    }
  }

  closeCatalogDelay(): void {
    this.catalogTimeout = setTimeout(() => {
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
      clearTimeout(this.officeTimeout);
      this.officeOpen.set(true);
      this.catalogOpen.set(false);
    }
  }

  closeOfficeDelay(): void {
    this.officeTimeout = setTimeout(() => {
      if (this.officeOpen()) this.officeOpen.set(false);
    }, 180);
  }

  closeOffice(): void {
    this.officeOpen.set(false);
  }

  readonly selectedIndex = signal(0);

  toggleSearch(): void {
    this.searchOpen.update((v) => !v);
    this.catalogOpen.set(false);
    this.officeOpen.set(false);
    if (this.searchOpen()) {
      this.searchQ.set('');
      this.selectedIndex.set(0);
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        document.getElementById('cmd-search-input')?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }
  }

  closeSearch(): void {
    this.searchOpen.set(false);
    document.body.style.overflow = '';
    this.searchQ.set('');
  }

  goSearch(): void {
    const term = this.searchQ().trim();
    this.router.navigate(['/templates'], { queryParams: term ? { q: term } : {} });
    this.closeSearch();
    this.menuOpen.set(false);
  }

  goToTemplate(id: string): void {
    this.router.navigate(['/templates', id]);
    this.closeSearch();
  }

  quickSearchCategory(catId: string): void {
    this.router.navigate(['/templates'], { queryParams: { cat: catId } });
    this.closeSearch();
  }

  quickSearchTag(tipo: string): void {
    this.router.navigate(['/templates'], { queryParams: { tipo } });
    this.closeSearch();
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
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (this.searchOpen()) {
        this.closeSearch();
      } else {
        this.toggleSearch();
      }
      return;
    }

    if (this.searchOpen()) {
      const results = this.liveResults();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (results.length > 0) {
          this.selectedIndex.update((i) => (i + 1) % results.length);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (results.length > 0) {
          this.selectedIndex.update((i) => (i - 1 + results.length) % results.length);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results.length > 0 && results[this.selectedIndex()]) {
          this.goToTemplate(results[this.selectedIndex()].id);
        } else {
          this.goSearch();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.closeSearch();
      }
    } else if (e.key === 'Escape') {
      this.catalogOpen.set(false);
      this.officeOpen.set(false);
      this.userMenuOpen.set(false);
    }
  }

  logout(): void {
    this.auth.logout();
    this.closeUserMenu();
    this.toast.show('Sesión cerrada. ¡Hasta pronto!', 'info');
  }
}
