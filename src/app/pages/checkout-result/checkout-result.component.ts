import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CheckoutService, OrderStatus } from '../../core/services/checkout.service';
import { CartService } from '../../core/services/cart.service';

const STATE_META: Record<
  OrderStatus['status'],
  { title: string; desc: string }
> = {
  paid: {
    title: 'Pago aprobado',
    desc: 'Tus plantillas van en camino a tu email. Ya puedes empezar a construir.',
  },
  pending: {
    title: 'Pago pendiente',
    desc: 'Transbank aún no confirma la transacción. Espera unos segundos o revisa tu email más tarde.',
  },
  rejected: {
    title: 'Pago rechazado',
    desc: 'El banco rechazó la transacción. Puedes intentarlo con otro medio de pago.',
  },
  canceled: {
    title: 'Pago cancelado',
    desc: 'Cerraste el formulario de pago antes de terminar. Tu carrito sigue intacto.',
  },
};

@Component({
  selector: 'app-checkout-result',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
  templateUrl: './checkout-result.component.html',
  styleUrl: './checkout-result.component.scss',
})
export class CheckoutResultComponent {
  private route = inject(ActivatedRoute);
  readonly checkout = inject(CheckoutService);
  private cart = inject(CartService);

  readonly loading = signal(true);
  readonly notFound = signal(false);
  readonly order = signal<OrderStatus | null>(null);

  readonly status = computed(() => this.order()?.status ?? null);
  readonly items = computed(() => this.order()?.items ?? []);
  readonly amount = computed(() => this.order()?.amount ?? 0);

  readonly meta = computed(() => {
    const s = this.status();
    return s
      ? STATE_META[s]
      : { title: 'Estado desconocido', desc: 'No pudimos determinar el estado del pago.' };
  });

  reload(): void {
    const token = this.order()?.orderId;
    if (!token) return;
    this.loading.set(true);
    this.checkout.order(token).subscribe({
      next: (order) => {
        this.order.set(order);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  constructor() {
    const token = this.route.snapshot.queryParamMap.get('token') || '';

    if (!token) {
      this.notFound.set(true);
      this.loading.set(false);
      return;
    }

    this.checkout.order(token).subscribe({
      next: (order) => {
        this.order.set(order);
        this.loading.set(false);
        if (order.status === 'paid') {
          this.cart.clear();
          this.cart.close();
        }
      },
      error: () => {
        this.notFound.set(true);
        this.loading.set(false);
      },
    });
  }
}
