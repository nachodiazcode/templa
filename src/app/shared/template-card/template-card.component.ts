import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CATEGORY_LABELS, TemplateCategory, TemplateItem } from '../../core/models/template.model';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-template-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  template: `
    <a [routerLink]="['/templates', t().id]" class="card">
      <div class="thumb" [style.--c1]="t().colors[0]" [style.--c2]="t().colors[1]">
        <img
          class="shot"
          [src]="'previews/' + t().id + '-thumb.webp'"
          [alt]="t().name + ' — vista previa'"
          loading="lazy"
          decoding="async"
          onerror="this.style.display='none'"
        />
        <div class="browser">
          <div class="bar"><i></i><i></i><i></i></div>
          <div class="page">
            <div class="nav"></div>
            <div class="hero-line w80"></div>
            <div class="hero-line w55"></div>
            <div class="btn-row"><span class="b1"></span><span class="b2"></span></div>
            <div class="tiles">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
        @if (t().price === 0) {
          <span class="flag free">Gratis</span>
        } @else if (t().isNew) {
          <span class="flag new">Nuevo</span>
        }
        <span class="open">Vista previa →</span>
      </div>

      <div class="body">
        <div class="top">
          <h3>{{ t().name }}</h3>
          <div class="price">
            @if (t().price === 0) {
              <span class="free-price">Gratis</span>
            } @else {
              <s>{{ t().oldPrice ? '$' + t().oldPrice : '' }}</s>
              <b>\${{ t().price }}</b>
            }
          </div>
        </div>
        <p class="tagline">{{ t().tagline }}</p>
        <div class="meta">
          <span class="cat">{{ label() }}</span>
          <span class="dot">·</span>
          <span>★ {{ t().rating }}</span>
          <span class="dot">·</span>
          <span>{{ t().sales | number: '1.0-0' }} ventas</span>
        </div>
      </div>
    </a>
  `,
  styles: `
    :host { display: block; height: 100%; }
    .card {
      display: flex; flex-direction: column; height: 100%;
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius); overflow: hidden;
      transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
    }
    .card:hover {
      transform: translateY(-5px);
      border-color: var(--border-strong);
      box-shadow: var(--shadow-lg);
    }
    .thumb {
      position: relative; aspect-ratio: 16 / 10.4; padding: 16px 22px 0;
      background:
        radial-gradient(120% 90% at 85% -10%, color-mix(in srgb, var(--c2) 34%, transparent), transparent 60%),
        linear-gradient(140deg, color-mix(in srgb, var(--c1) 26%, #0c0e15), #0c0e15);
      border-bottom: 1px solid var(--border);
      overflow: hidden;
    }
    .shot {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; object-position: top; display: block;
    }
    .flag, .open { z-index: 2; }
    .browser {
      height: 100%; background: rgba(8,9,14,.82); backdrop-filter: blur(6px);
      border: 1px solid var(--border); border-bottom: none;
      border-radius: 12px 12px 0 0; padding: 0 14px;
      transition: transform .35s ease;
    }
    .card:hover .browser { transform: translateY(-4px); }
    .bar { display: flex; gap: 5px; padding: 9px 0 8px; }
    .bar i { width: 8px; height: 8px; border-radius: 99px; background: #2a3042; }
    .bar i:first-child { background: color-mix(in srgb, var(--c1) 70%, white); }
    .hero-line { height: 11px; border-radius: 6px; margin-top: 13px;
      background: linear-gradient(90deg, #ffffffd9, #ffffff66); }
    .w80 { width: 78%; } .w55 { width: 52%; opacity: .45; }
    .btn-row { display: flex; gap: 7px; margin-top: 13px; }
    .btn-row span { height: 15px; border-radius: 5px; }
    .b1 { width: 62px; background: linear-gradient(135deg, var(--c1), var(--c2)); }
    .b2 { width: 46px; background: #ffffff17; }
    .tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 15px; padding-bottom: 14px; }
    .tiles span { height: 26px; border-radius: 6px;
      background: linear-gradient(120deg, color-mix(in srgb, var(--c1) 24%, #141824), #141824); }
    .flag {
      position: absolute; top: 12px; left: 12px;
      font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;
      padding: 4px 10px; border-radius: 99px; backdrop-filter: blur(8px);
    }
    .flag.free { background: rgba(52,211,153,.16); color: var(--success); border: 1px solid rgba(52,211,153,.4); }
    .flag.new { background: rgba(139,92,246,.2); color: #c4b5fd; border: 1px solid rgba(139,92,246,.45); }
    .open {
      position: absolute; bottom: 12px; right: 12px;
      font-size: 12px; font-weight: 700; color: #fff;
      background: rgba(10,11,16,.72); border: 1px solid var(--border-strong);
      padding: 6px 12px; border-radius: 99px;
      opacity: 0; transform: translateY(6px); transition: all .25s ease; backdrop-filter: blur(8px);
    }
    .card:hover .open { opacity: 1; transform: none; }
    .body { padding: 18px 18px 20px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .top { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
    h3 { margin: 0; font-size: 17.5px; }
    .price { display: flex; align-items: baseline; gap: 7px; }
    .price s { color: var(--text-faint); font-size: 13px; }
    .price b { font-size: 17px; font-family: 'Sora'; }
    .free-price {
      color: var(--success); font-weight: 800; font-family: 'Sora'; font-size: 15px;
    }
    .tagline { margin: 0; color: var(--text-muted); font-size: 13.5px; line-height: 1.5; }
    .meta {
      margin-top: auto; padding-top: 10px; display: flex; gap: 8px; align-items: center;
      color: var(--text-faint); font-size: 12.5px; font-weight: 600;
    }
    .cat { color: var(--accent-2); text-transform: uppercase; letter-spacing: .8px; font-size: 11px; }
    .dot { opacity: .5; }
  `,
})
export class TemplateCardComponent {
  readonly t = input.required<TemplateItem>();
  readonly label = computed(() => CATEGORY_LABELS[this.t().category as TemplateCategory]);

  private cart = inject(CartService);
}
