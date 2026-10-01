import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TEMPLATES } from '../../core/data/templates.data';
import { OFFICE_TEMPLATES } from '../../core/data/office.data';
import { CATEGORY_LABELS, TemplateCategory, templateTier } from '../../core/models/template.model';
import { TemplateCardComponent } from '../../shared/template-card/template-card.component';
import { MatchQuizComponent } from '../../shared/match-quiz/match-quiz.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, TemplateCardComponent, MatchQuizComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private router = inject(Router);
  private seo = inject(SeoService);

  constructor() {
    this.seo.reset();
    const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      this.timer = setInterval(() => this.next(), 4800);
      inject(DestroyRef).onDestroy(() => this.pause());
    }
  }

  readonly featured = computed(() => TEMPLATES.filter((t) => t.isFeatured));
  readonly slides = computed(() => this.featured());
  readonly slide = signal(0);
  private timer: ReturnType<typeof setInterval> | null = null;
  readonly freeTemplates = computed(() => TEMPLATES.filter((t) => t.price === 0));
  readonly goldCount = TEMPLATES.filter((t) => templateTier(t) === 'gold').length;
  readonly premiumCount = TEMPLATES.filter((t) => templateTier(t) === 'premium').length;
  readonly pptCount = OFFICE_TEMPLATES.filter((t) => t.kind === 'pptx').length;
  readonly wordCount = OFFICE_TEMPLATES.filter((t) => t.kind === 'docx').length;
  readonly officeCount = OFFICE_TEMPLATES.length;
  readonly catalogCount = TEMPLATES.length + OFFICE_TEMPLATES.length;
  readonly categories = Object.keys(CATEGORY_LABELS) as TemplateCategory[];
  readonly categoryLabels = CATEGORY_LABELS;
  readonly TEMPLATES = TEMPLATES;

  readonly query = signal('');

  search(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/templates'], { queryParams: { q: this.query() || null } });
  }

  next(): void {
    const n = this.slides().length;
    if (!n) return;
    this.slide.update((i) => (i + 1) % n);
  }

  prev(): void {
    const n = this.slides().length;
    if (!n) return;
    this.slide.update((i) => (i - 1 + n) % n);
  }

  go(index: number): void {
    this.slide.set(index);
  }

  pause(): void {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  }
}
