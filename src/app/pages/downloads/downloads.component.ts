import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CheckoutService, OrderStatus } from '../../core/services/checkout.service';

@Component({
  selector: 'app-downloads',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="wrap container">
      <div class="card">
        <span class="kicker">Zona de descargas</span>
        <h1>Recupera tus plantillas</h1>
        <p>Ingresa el código de orden que te llegó por email (ej: Tmt7upf357a1c).</p>

        <form class="lookup" (submit)="search($event)">
          <input
            type="text"
            placeholder="Código de orden"
            [value]="code()"
            (input)="code.set($any($event.target).value.trim())"
          />
          <button class="btn primary" [disabled]="loading() || !code()">Buscar</button>
        </form>

        @if (error()) {
          <p class="err">{{ error() }}</p>
        }

        @if (order(); as o) {
          @if (o.status === 'paid') {
            <ul class="items">
              @for (item of o.items; track item.id) {
                <li>
                  <div class="info">
                    <b>{{ item.name }}</b>
                    <small>{{ item.price === 0 ? 'Gratis' : '$' + item.price }} · licencia comercial</small>
                  </div>
                  <a class="btn sm dl" [href]="checkout.downloadUrl(o.orderId, item.id)">Descargar</a>
                </li>
              }
            </ul>
          } @else {
            <p class="warn">La orden existe pero aún no está pagada (estado: {{ statusLabel(o.status) }}).</p>
          }
        }
      </div>
    </div>
  `,
  styles: `
    .wrap { min-height: calc(100vh - var(--header-h)); display: grid; place-items: center; padding: 60px 0; }
    .card {
      width: min(560px, 100%);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 44px 40px;
      text-align: center;
      display: flex; flex-direction: column; gap: 14px;
    }
    .kicker { color: var(--accent-2); font-weight: 800; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; }
    h1 { margin: 0; font-size: 27px; }
    p { color: var(--text-muted); margin: 0; font-size: 14.5px; }
    .lookup { display: flex; gap: 10px; margin-top: 8px;
      input {
        flex: 1; background: var(--surface-2); border: 1px solid var(--border-strong);
        border-radius: 11px; padding: 12px 15px; color: var(--text); font-size: 14px;
        outline: none; transition: border-color .2s; font-family: inherit;
        &:focus { border-color: var(--accent); }
        &::placeholder { color: var(--text-faint); }
      }
    }
    .err { color: var(--danger); font-size: 13px; font-weight: 600; }
    .warn { color: #facc15; font-size: 13px; }
    .items {
      list-style: none; margin: 10px 0 0; padding: 6px 18px;
      border-top: 1px solid var(--border); display: grid; gap: 4px;
      li {
        display: flex; justify-content: space-between; align-items: center; gap: 12px;
        padding: 13px 0; border-bottom: 1px solid var(--border); text-align: left;
        &:last-child { border-bottom: none; }
      }
      .info b { display: block; font-size: 14.5px; }
      .info small { color: var(--text-faint); font-size: 12px; }
      .dl {
        background: rgba(52, 211, 153, 0.13);
        border-color: rgba(52, 211, 153, 0.4);
        color: #86efac;
        &:hover { background: rgba(52,211,153,.25); box-shadow: none; transform: translateY(-1px); }
      }
    }
  `,
})
export class DownloadsComponent {
  readonly checkout = inject(CheckoutService);

  readonly code = signal('');
  readonly loading = signal(false);
  readonly error = signal('');
  readonly order = signal<OrderStatus | null>(null);

  search(e: Event): void {
    e.preventDefault();
    const id = this.code();
    if (!id) return;

    this.loading.set(true);
    this.error.set('');
    this.order.set(null);

    this.checkout.order(id).subscribe({
      next: (order) => {
        this.order.set(order);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No encontramos una orden con ese código.');
        this.loading.set(false);
      },
    });
  }

  statusLabel(s: OrderStatus['status']): string {
    return { pending: 'pendiente', paid: 'pagada', rejected: 'rechazada', canceled: 'cancelada' }[s];
  }
}
