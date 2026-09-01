import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TEMPLATES } from '../../core/data/templates.data';
import { CATEGORY_LABELS, TemplateCategory } from '../../core/models/template.model';
import { TemplateCardComponent } from '../../shared/template-card/template-card.component';
import { MatchQuizComponent } from '../../shared/match-quiz/match-quiz.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, DecimalPipe, TemplateCardComponent, MatchQuizComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private router = inject(Router);
  private seo = inject(SeoService);

  constructor() {
    this.seo.reset();
  }

  readonly featured = computed(() => TEMPLATES.filter((t) => t.isFeatured));
  readonly freeTemplates = computed(() => TEMPLATES.filter((t) => t.price === 0));
  readonly categories = Object.keys(CATEGORY_LABELS) as TemplateCategory[];
  readonly categoryLabels = CATEGORY_LABELS;
  readonly TEMPLATES = TEMPLATES;

  readonly totalDownloads = TEMPLATES.reduce((s, t) => s + t.sales, 0);
  readonly avgRating = (
    TEMPLATES.reduce((s, t) => s + t.rating, 0) / TEMPLATES.length
  ).toFixed(1);

  readonly query = signal('');

  search(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/templates'], { queryParams: { q: this.query() || null } });
  }
}
