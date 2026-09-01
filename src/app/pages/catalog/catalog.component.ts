import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TEMPLATES } from '../../core/data/templates.data';
import { CATEGORY_LABELS, TemplateCategory } from '../../core/models/template.model';
import { TemplateCardComponent } from '../../shared/template-card/template-card.component';
import { SeoService } from '../../core/services/seo.service';

type TypeFilter = 'todos' | 'gratis' | 'premium';
type SortKey = 'populares' | 'nuevas' | 'precio-asc' | 'valoracion';

@Component({
  selector: 'app-catalog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DecimalPipe, RouterLink, TemplateCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seo = inject(SeoService);

  readonly categories = Object.keys(CATEGORY_LABELS) as TemplateCategory[];
  readonly categoryLabels = CATEGORY_LABELS;

  readonly allTech = [...new Set(TEMPLATES.flatMap((t) => t.tech))].sort();

  readonly q = signal('');
  readonly cat = signal<TemplateCategory | 'todas'>('todas');
  readonly tipo = signal<TypeFilter>('todos');
  readonly tech = signal<string>('');
  readonly orden = signal<SortKey>('populares');

  readonly catCounts: Record<string, number> = (() => {
    const counts: Record<string, number> = {};
    for (const t of TEMPLATES) counts[t.category] = (counts[t.category] ?? 0) + 1;
    return counts;
  })();

  readonly totalTemplates = TEMPLATES.length;

  readonly results = computed(() => {
    const term = this.q().trim().toLowerCase();
    let list = [...TEMPLATES];

    if (term) {
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(term) ||
          t.tagline.toLowerCase().includes(term) ||
          t.tech.some((tech) => tech.toLowerCase().includes(term)) ||
          t.category.includes(term),
      );
    }

    if (this.cat() !== 'todas') {
      list = list.filter((t) => t.category === this.cat());
    }

    if (this.tipo() === 'gratis') list = list.filter((t) => t.price === 0);
    if (this.tipo() === 'premium') list = list.filter((t) => t.price > 0);

    const tech = this.tech();
    if (tech) list = list.filter((t) => t.tech.includes(tech));

    switch (this.orden()) {
      case 'nuevas':
        list.sort((a, b) => b.releasedAt.localeCompare(a.releasedAt));
        break;
      case 'precio-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'valoracion':
        list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      default:
        list.sort((a, b) => b.sales - a.sales);
    }

    return list;
  });

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      const q = params.get('q');
      const cat = params.get('cat') as TemplateCategory | null;
      const tipo = params.get('tipo') as TypeFilter | null;
      const orden = params.get('orden') as SortKey | null;

      if (q !== null) this.q.set(q);
      if (cat && this.categories.includes(cat)) this.cat.set(cat);
      if (tipo === 'gratis' || tipo === 'premium' || tipo === 'todos') this.tipo.set(tipo);
      if (orden) this.orden.set(orden);

      let title = 'Catálogo de plantillas';
      if (this.cat() !== 'todas') title = `${this.categoryLabels[this.cat() as TemplateCategory]} - Catálogo`;
      if (this.tipo() === 'gratis') title = `Plantillas Gratuitas - ${title}`;
      
      this.seo.set({
        title,
        description: 'Explora nuestro catálogo completo de plantillas premium y gratuitas para Angular. Encuentra el diseño perfecto para tu próximo proyecto.',
        path: this.router.url
      });
    });
  }

  setCat(cat: TemplateCategory | 'todas'): void {
    this.cat.set(cat);
    this.syncUrl();
  }

  setTipo(tipo: TypeFilter): void {
    this.tipo.set(tipo);
    this.syncUrl();
  }

  setTech(tech: string): void {
    this.tech.set(this.tech() === tech ? '' : tech);
    this.syncUrl();
  }

  onSearch(value: string): void {
    this.q.set(value);
  }

  clearFilters(): void {
    this.q.set('');
    this.cat.set('todas');
    this.tipo.set('todos');
    this.tech.set('');
    this.orden.set('populares');
    this.router.navigate([], { queryParams: {} });
  }

  get hasActiveFilters(): boolean {
    return (
      this.q().trim() !== '' ||
      this.cat() !== 'todas' ||
      this.tipo() !== 'todos' ||
      this.tech() !== '' ||
      this.orden() !== 'populares'
    );
  }

  private syncUrl(): void {
    const qp: Record<string, string> = {};
    if (this.cat() !== 'todas') qp['cat'] = this.cat();
    if (this.tipo() !== 'todos') qp['tipo'] = this.tipo();
    if (this.tech()) qp['tech'] = this.tech();
    this.router.navigate([], { queryParams: qp, replaceUrl: true });
  }
}
