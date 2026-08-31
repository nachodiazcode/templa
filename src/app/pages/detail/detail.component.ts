import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TEMPLATES } from '../../core/data/templates.data';
import { CATEGORY_LABELS } from '../../core/models/template.model';
import { buildPreviewHtml } from '../../core/services/preview.builder';
import { TemplatePreviewService } from '../../core/services/template-preview.service';
import { CartService } from '../../core/services/cart.service';
import { CheckoutService } from '../../core/services/checkout.service';
import { ToastService } from '../../core/services/toast.service';
import { AuthService } from '../../core/services/auth.service';
import { ReviewsService, TemplateReview, ReviewSummary } from '../../core/services/reviews.service';
import { SeoService } from '../../core/services/seo.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TemplateCardComponent } from '../../shared/template-card/template-card.component';

const STAR_LABELS = ['', 'Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];

type Device = 'desktop' | 'tablet' | 'mobile';
type Tab = 'desc' | 'incluye' | 'opiniones';

const DEVICE_WIDTHS: Record<Device, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px',
};

@Component({
  selector: 'app-template-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DecimalPipe, DatePipe, FormsModule, RouterLink, TemplateCardComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class TemplateDetailComponent {
  private router = inject(Router);
  private cart = inject(CartService);
  private toast = inject(ToastService);
  private checkoutApi = inject(CheckoutService);
  private auth = inject(AuthService);
  private reviewsApi = inject(ReviewsService);
  private previewApi = inject(TemplatePreviewService);
  private seo = inject(SeoService);

  private sanitizer = inject(DomSanitizer);

  readonly id = input.required<string>();

  readonly template = computed(() => TEMPLATES.find((t) => t.id === this.id()));

  readonly shotDevice = signal<'desktop' | 'mobile'>('desktop');
  readonly screenshotSrc = computed(() =>
    `previews/${this.id()}-${this.shotDevice()}.webp`,
  );

  readonly device = signal<Device>('desktop');
  readonly tab = signal<Tab>('desc');

  // Estado de reseñas
  readonly reviews = signal<TemplateReview[]>([]);
  readonly reviewSummary = signal<ReviewSummary | null>(null);
  readonly reviewsLoading = signal(true);
  readonly reviewsError = signal<string | null>(null);
  readonly reviewFormOpen = signal(false);
  readonly reviewSubmitted = signal(false);
  readonly reviewSending = signal(false);
  readonly reviewRating = signal(5);
  readonly reviewTitle = signal('');
  readonly reviewBody = signal('');

  readonly ratingStars = computed(() => {
    for (let i = 5; i >= 1; i--) {
      if (this.reviewRating() >= i) return STAR_LABELS[i];
    }
    return STAR_LABELS[1];
  });
  readonly maxRating = computed(() => Math.round(this.reviewSummary()?.rating || 0));

  readonly canLeaveReview = computed(() => this.reviewSubmitted() || this.auth.user() !== null);
  readonly realPreviewHtml = signal<string | null>(null);
  readonly previewHtml = computed<SafeHtml>(() => {
    const real = this.realPreviewHtml();
    if (real) return this.sanitizer.bypassSecurityTrustHtml(real);
    const t = this.template();
    return t ? this.sanitizer.bypassSecurityTrustHtml(buildPreviewHtml(t)) : '';
  });

  readonly inCart = computed(() => {
    const t = this.template();
    return t ? this.cart.has(t.id) : false;
  });

  readonly related = computed(() => {
    const t = this.template();
    if (!t) return [];
    const same = TEMPLATES.filter((x) => x.category === t.category && x.id !== t.id);
    const rest = TEMPLATES.filter(
      (x) => x.category !== t.category && x.id !== t.id && x.price === 0,
    );
    return [...same, ...rest].slice(0, 3);
  });

  readonly deviceWidth = computed(() => DEVICE_WIDTHS[this.device()]);
  readonly categoryLabel = computed(() =>
    this.template() ? CATEGORY_LABELS[this.template()!.category] : '',
  );

  constructor() {
    effect(() => {
      const t = this.template();
      if (!t) {
        this.router.navigate(['/templates'], { replaceUrl: true });
        return;
      }
      this.seo.set({
        title: t.name,
        description: `${t.tagline} — ${t.pages} páginas, ${t.tech.join(', ')}. Comprueba la plantilla en vivo y descarga el código fuente al instante en Templa.`,
        image: `/previews/${t.id}-desktop.webp`,
        path: `/templates/${t.id}`,
      });
      this.realPreviewHtml.set(null);
      this.previewApi.loadRealTemplateHtml(t.id).subscribe((html) => {
        this.realPreviewHtml.set(html);
      });
      if (this.tab() === 'opiniones') this.loadReviews(t.id);
    });
  }

  openReviews(): void {
    this.tab.set('opiniones');
    const t = this.template();
    if (t) this.loadReviews(t.id);
  }

  loadReviews(templateId: string): void {
    if (this.reviews().length) return; // ya cargado
    this.reviewsLoading.set(true);
    this.reviewsError.set(null);
    this.reviewsApi.list(templateId).subscribe({
      next: (res) => {
        this.reviews.set(res.items);
        this.reviewSummary.set(res.summary);
        this.reviewsLoading.set(false);
      },
      error: () => {
        this.reviewsError.set('No pudimos cargar las opiniones. Intenta de nuevo.');
        this.reviewsLoading.set(false);
      },
    });
  }

  setRating(r: number): void {
    this.reviewRating.set(r);
    this.ratingStars();
  }

  openReviewForm(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url },
      });
      return;
    }
    this.reviewFormOpen.set(true);
  }

  submitReview(): void {
    const t = this.template();
    if (!t) return;
    const body = this.reviewBody().trim();
    if (body.length < 10) {
      this.toast.show('Escribe una reseña de al menos 10 caracteres.', 'info');
      return;
    }
    this.reviewSending.set(true);
    this.reviewsApi.create(t.id, {
      rating: this.reviewRating(),
      title: this.reviewTitle().trim(),
      body,
    }).subscribe({
      next: (res) => {
        this.reviews.set([res.review, ...this.reviews()]);
        this.reviewSummary.set(res.summary);
        this.reviewSending.set(false);
        this.reviewFormOpen.set(false);
        this.reviewSubmitted.set(true);
        this.toast.show('¡Gracias! Tu reseña fue publicada.');
      },
      error: (err) => {
        this.reviewSending.set(false);
        this.toast.show(err.error?.error || 'No se pudo publicar tu reseña.', 'info');
      },
    });
  }

  starsOf(rating: number): string {
    return '★★★★★'.slice(0, rating) + '☆☆☆☆☆'.slice(rating);
  }

  pctOf(n: number): number {
    const d = this.reviewSummary()?.distribution;
    const total = this.reviewSummary()?.reviews || 0;
    if (!d || !total) return 0;
    return Math.round(((d[n] || 0) / total) * 100);
  }

  STAR_LABELS_LABEL(n: number): string {
    return STAR_LABELS[n] || '';
  }

  setDevice(d: Device): void { this.device.set(d); }

  setShot(d: 'desktop' | 'mobile'): void { this.shotDevice.set(d); }

  addToCart(): void {
    const t = this.template();
    if (!t) return;
    if (this.cart.add(t)) {
      this.toast.show(
        t.price === 0 ? `"${t.name}" añadida — descarga gratuita.` : `"${t.name}" añadida al carrito.`,
      );
      this.cart.open();
    }
  }

  downloadFree(): void {
    const t = this.template();
    if (!t) return;
    window.open(this.checkoutApi.freeDownloadUrl(t.id), '_blank');
    this.toast.show(`Descarga de "${t.name}" iniciada.`, 'info');
  }
}
