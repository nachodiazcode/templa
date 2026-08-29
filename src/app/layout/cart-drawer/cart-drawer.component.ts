import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CheckoutService } from '../../core/services/checkout.service';
import { CouponsService } from '../../core/services/coupons.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-cart-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (cart.isOpen()) {
      <div class="overlay" (click)="cart.close()"></div>
      <aside class="drawer">
        <header>
          <h3>Tu carrito</h3>
          <button class="close" (click)="cart.close()" aria-label="Cerrar">✕</button>
        </header>

        @if (cart.items().length === 0) {
          <div class="empty">
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <p>Tu carrito está vacío.</p>
            <a routerLink="/templates" class="btn ghost sm" (click)="cart.close()">
              Explorar plantillas
            </a>
          </div>
        } @else {
          <ul>
            @for (item of cart.items(); track item.id) {
              <li>
                <a
                  class="mini"
                  [style.--c1]="item.colors[0]"
                  [style.--c2]="item.colors[1]"
                  routerLink="/templates/{{ item.id }}"
                  (click)="cart.close()"
                ></a>
                <div class="info">
                  <b>{{ item.name }}</b>
                  <span>{{ item.tech[0] }} · {{ item.pages }} páginas</span>
                </div>
                <div class="right">
                  <span class="price">{{ item.price === 0 ? 'Gratis' : '$' + item.price }}</span>
                  <button class="rm" (click)="cart.remove(item.id)" aria-label="Quitar">✕</button>
                </div>
              </li>
            }
          </ul>

          <footer>
            @if (cart.hasFreeItems()) {
              <p class="note">Incluye plantillas gratuitas — se descargan al confirmar.</p>
            }
            @if (payableItems().length > 0) {
              <label class="email">
                <span>Email para recibir tus archivos</span>
                <input
                  type="email"
                  placeholder="tu@email.cl"
                  [value]="email()"
                  (input)="email.set($any($event.target).value)"
                />
              </label>

              <div class="coupon">
                @if (coupon(); as c) {
                  <div class="coupon-applied">
                    <span><b>{{ c.code }}</b> — descuento −{{ '$' + c.discount }}</span>
                    <button class="rm" (click)="removeCoupon()" aria-label="Quitar cupón">✕</button>
                  </div>
                } @else {
                  <div class="coupon-input">
                    <input
                      type="text"
                      placeholder="Cupón de descuento"
                      [value]="couponCode()"
                      (input)="couponCode.set($any($event.target).value.toUpperCase())"
                      (keyup.enter)="applyCoupon()"
                    />
                    <button class="apply" [disabled]="couponChecking()" (click)="applyCoupon()">
                      {{ couponChecking() ? '…' : 'Aplicar' }}
                    </button>
                  </div>
                  @if (couponError()) {
                    <p class="err">{{ couponError() }}</p>
                  }
                }
              </div>
            }
            <div class="row subtotal">
              <span>Subtotal</span>
              <b>{{ cart.total() === 0 ? 'Gratis' : '$' + cart.total() }}</b>
            </div>
            @if (discount() > 0) {
              <div class="row discount">
                <span>Descuento</span>
                <b>−{{ '$' + discount() }}</b>
              </div>
            }
            <div class="row total">
              <span>Total</span>
              <b>{{ totalToPay() === 0 ? 'Gratis' : '$' + totalToPay() }}</b>
            </div>
            @if (error()) {
              <p class="err">{{ error() }}</p>
            }
            <button
              class="btn primary block lg"
              [disabled]="loading()"
              (click)="checkout()"
            >
              @if (loading()) {
                Conectando con Webpay...
              } @else if (payableItems().length === 0) {
                Descargar gratis
              } @else {
                Pagar con Webpay
              }
            </button>
            <small>Pago seguro vía Transbank · Licencia de por vida</small>
          </footer>
        }
      </aside>
    }
  `,
  styles: `
    .overlay {
      position: fixed; inset: 0; background: rgba(4,5,9,.6);
      backdrop-filter: blur(3px); z-index: 90;
      animation: fade .2s ease;
    }
    .drawer {
      position: fixed; top: 0; right: 0; bottom: 0;
      width: min(420px, 92vw); z-index: 91;
      background: var(--surface); border-left: 1px solid var(--border);
      display: flex; flex-direction: column;
      animation: slide .28s cubic-bezier(.22,1,.36,1);
      box-shadow: -30px 0 80px rgba(0,0,0,.5);
    }
    @keyframes slide { from { transform: translateX(40px); opacity: 0; } }
    @keyframes fade { from { opacity: 0; } }
    header {
      display:flex; justify-content:space-between; align-items:center;
      padding: 20px 24px; border-bottom: 1px solid var(--border);
      h3 { margin:0; font-size:18px; }
    }
    .close {
      background:none; border:none; color:var(--text-muted); font-size:16px;
      cursor:pointer; width:34px; height:34px; border-radius:9px;
      &:hover { background: rgba(255,255,255,.06); color: var(--text); }
    }
    ul { list-style:none; margin:0; padding:8px 24px; overflow-y:auto; flex:1; }
    li {
      display:flex; align-items:center; gap:14px; padding:14px 0;
      border-bottom:1px solid var(--border);
    }
    .mini {
      width:56px; height:42px; border-radius:9px; flex-shrink:0;
      background: linear-gradient(135deg, var(--c1), var(--c2));
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.12);
      transition: transform .2s;
      &:hover { transform: scale(1.06); }
    }
    .info { flex:1; min-width:0;
      b { display:block; font-size:14.5px; }
      span { color:var(--text-faint); font-size:12px; }
    }
    .right { text-align:right; }
    .price { display:block; font-weight:800; font-family:'Sora'; font-size:14.5px; }
    .rm {
      margin-top:4px; background:none; border:none; color:var(--text-faint);
      cursor:pointer; font-size:11px; padding:3px 6px; border-radius:6px;
      &:hover { color: var(--danger); background: rgba(251,113,133,.1); }
    }
    .empty {
      flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px;
      color: var(--text-muted);
      svg { opacity:.6 }
      p { margin:0; }
    }
    footer { padding:20px 24px 26px; border-top:1px solid var(--border); display:flex; flex-direction:column; gap:12px; }
    .note { margin:0; font-size:12.5px; color:var(--success); }
    .email {
      display:flex; flex-direction:column; gap:6px;
      span { color:var(--text-faint); font-size:12px; font-weight:600; }
      input {
        background:var(--surface-2); border:1px solid var(--border-strong);
        border-radius:10px; padding:11px 14px; color:var(--text);
        font-size:14px; outline:none; transition:border-color .2s; font-family:inherit;
        &:focus { border-color: var(--accent); }
        &::placeholder { color: var(--text-faint); }
      }
    }
    .err {
      margin:0; color:var(--danger); font-size:12.5px; font-weight:600;
    }
    .coupon { display:flex; flex-direction:column; gap:6px; }
    .coupon-input { display:flex; gap:8px;
      input {
        flex:1; background:var(--surface-2); border:1px solid var(--border-strong);
        border-radius:10px; padding:9px 12px; color:var(--text); font-size:13px; outline:none;
        font-family:inherit; text-transform:uppercase; letter-spacing:.4px;
        &:focus { border-color: var(--accent); }
        &::placeholder { color:var(--text-faint); text-transform:none; }
      }
      .apply {
        background:var(--surface-2); border:1px solid var(--border-strong);
        color:var(--text); border-radius:10px; padding:0 14px; cursor:pointer; font-weight:700;
        font-size:13px; transition:.15s;
        &:hover:not(:disabled) { border-color:var(--accent); color:var(--accent); }
        &:disabled { opacity:.6; cursor:default; }
      }
    }
    .coupon-applied {
      display:flex; align-items:center; justify-content:space-between; gap:8px;
      background:rgba(52,211,153,.08); border:1px solid rgba(52,211,153,.3);
      border-radius:10px; padding:9px 12px;
      span { color:var(--success); font-size:13px; b { font-weight:700; } }
      .rm { background:none; border:none; color:var(--text-faint); cursor:pointer; font-size:12px; padding:2px 6px; &:hover { color: var(--danger); } }
    }
    .row.subtotal, .row.discount { display:flex; justify-content:space-between; font-size:13.5px;
      b { font-family:'Sora'; font-size:14px; } span { color: var(--text-muted); } }
    .row.discount b { color: var(--success); }
    .row.total { display:flex; justify-content:space-between; font-size:15px; b { font-family:'Sora'; font-size:19px; } }
    small { color:var(--text-faint); text-align:center; font-size:11.5px; letter-spacing:.4px; }
  `,
})
export class CartDrawerComponent {
  readonly cart = inject(CartService);
  private toast = inject(ToastService);
  private checkoutApi = inject(CheckoutService);
  private couponsApi = inject(CouponsService);

  readonly email = signal('');
  readonly loading = signal(false);
  readonly error = signal('');

  readonly couponCode = signal('');
  readonly coupon = signal<{ discount: number; code: string; type: string; value: number } | null>(null);
  readonly couponError = signal('');
  readonly couponChecking = signal(false);

  readonly payableItems = computed(() =>
    this.cart.items().filter((i) => i.price > 0),
  );

  readonly discount = computed(() => this.coupon()?.discount ?? 0);

  readonly totalToPay = computed(() =>
    Math.max(0, this.cart.total() - this.discount()),
  );

  applyCoupon(): void {
    const code = this.couponCode().trim();
    if (!code) return;
    if (this.payableItems().length === 0) {
      this.couponError.set('Los productos gratuitos no necesitan cupón.');
      return;
    }
    this.couponChecking.set(true);
    this.couponError.set('');
    this.couponsApi.validate(code, this.cart.total()).subscribe({
      next: (res) => {
        this.couponChecking.set(false);
        if (res.valid && res.discount) {
          this.coupon.set({ discount: res.discount, code: res.code!, type: res.type!, value: res.value! });
          this.couponError.set('');
        } else {
          this.coupon.set(null);
          this.couponError.set(res.error || 'Cupón no válido');
        }
      },
      error: () => {
        this.couponChecking.set(false);
        this.couponError.set('No se pudo validar el cupón.');
      },
    });
  }

  removeCoupon(): void {
    this.coupon.set(null);
    this.couponCode.set('');
    this.couponError.set('');
  }

  checkout(): void {
    const items = this.cart.items();
    if (!items.length) return;

    if (this.payableItems().length === 0) {
      items.forEach((item, idx) =>
        setTimeout(() => this.triggerFreeDownload(item.id), idx * 400),
      );
      this.cart.clear();
      this.cart.close();
      this.toast.show('Descargas iniciadas. Disfruta tus plantillas.', 'info');
      return;
    }

    const email = this.email().trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      this.error.set('Ingresa un email válido para recibir tus plantillas.');
      return;
    }
    this.error.set('');
    this.loading.set(true);

    this.checkoutApi
      .start(items.map((i) => i.id), email, this.coupon()?.code)
      .subscribe({
        next: () => {
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(
            err.error?.error || 'No se pudo iniciar el pago. ¿Está corriendo el servidor API?',
          );
        },
      });
  }

  private triggerFreeDownload(id: string): void {
    const a = document.createElement('a');
    a.href = this.checkoutApi.freeDownloadUrl(id);
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}
