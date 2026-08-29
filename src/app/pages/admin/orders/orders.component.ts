import { ChangeDetectionStrategy, Component, computed, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../../core/config';
import { DatePipe, DecimalPipe } from '@angular/common';

const STATUS_LABELS: Record<string, string> = {
  paid: 'Pagada', pending: 'Pendiente', rejected: 'Rechazada', canceled: 'Cancelada',
};

@Component({
  selector: 'app-admin-orders',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class AdminOrdersComponent implements OnInit {
  private http = inject(HttpClient);

  readonly orders = signal<any[]>([]);
  readonly loading = signal(true);
  readonly status = signal('all');
  readonly search = signal('');
  readonly page = signal(1);
  readonly total = signal(0);
  readonly pages = signal(0);
  readonly selected = signal<any | null>(null);
  readonly updating = signal(false);

  readonly statusOptions = ['all', 'pending', 'paid', 'rejected', 'canceled'];

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    const params: any = { page: this.page(), limit: 15 };
    if (this.status() !== 'all') params.status = this.status();
    if (this.search()) params.search = this.search();

    this.http.get<any>(`${API_BASE_URL}/api/admin/orders`, { params }).subscribe({
      next: (r) => {
        this.orders.set(r.items);
        this.total.set(r.total);
        this.pages.set(r.pages);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  filterStatus(s: string): void {
    this.status.set(s);
    this.page.set(1);
    this.load();
  }

  onSearch(e: Event): void {
    this.search.set((e.target as HTMLInputElement).value);
    this.page.set(1);
    this.load();
  }

  prevPage(): void {
    if (this.page() > 1) { this.page.update((p) => p - 1); this.load(); }
  }

  nextPage(): void {
    if (this.page() < this.pages()) { this.page.update((p) => p + 1); this.load(); }
  }

  selectOrder(o: any): void {
    this.selected.set(this.selected()?.orderId === o.orderId ? null : o);
  }

  updateStatus(orderId: string, newStatus: string): void {
    this.updating.set(true);
    this.http.patch(`${API_BASE_URL}/api/admin/orders/${orderId}/status`, { status: newStatus }).subscribe({
      next: () => {
        this.updating.set(false);
        this.load();
        if (this.selected()?.orderId === orderId) {
          this.selected.update((o) => o ? { ...o, status: newStatus } : null);
        }
      },
      error: () => this.updating.set(false),
    });
  }

  label(s: string): string {
    return STATUS_LABELS[s] || s;
  }

  statusClass(s: string): string {
    const m: Record<string, string> = { paid: 'green', pending: 'yellow', rejected: 'red', canceled: 'gray' };
    return m[s] || 'gray';
  }
}
