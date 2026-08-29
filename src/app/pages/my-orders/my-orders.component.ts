import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CheckoutService, OrderStatus } from '../../core/services/checkout.service';

const STATUS_LABEL: Record<OrderStatus['status'], string> = {
  paid: 'Pagada',
  pending: 'Pendiente',
  rejected: 'Rechazada',
  canceled: 'Cancelada',
};

@Component({
  selector: 'app-my-orders',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent {
  readonly auth = inject(AuthService);
  readonly checkout = inject(CheckoutService);

  readonly loading = signal(true);
  readonly orders = signal<OrderStatus[]>([]);

  statusLabel(s: OrderStatus['status']): string {
    return STATUS_LABEL[s];
  }

  constructor() {
    this.auth.myOrders().subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
