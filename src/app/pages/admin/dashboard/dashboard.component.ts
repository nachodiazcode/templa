import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../../core/config';
import { DatePipe, DecimalPipe } from '@angular/common';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  ordersToday: number;
  byStatus: Record<string, number>;
  totalTemplates: number;
  totalUsers: number;
  recentOrders: any[];
  revenueByMonth: Record<string, number>;
}

@Component({
  selector: 'app-admin-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DecimalPipe, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  private http = inject(HttpClient);

  readonly stats = signal<DashboardStats | null>(null);
  readonly loading = signal(true);

  readonly revenueEntries = computed(() => {
    const m = this.stats()?.revenueByMonth || {};
    return Object.entries(m).sort(([a], [b]) => a.localeCompare(b));
  });

  readonly statusEntries = computed(() => {
    const s = this.stats()?.byStatus || {};
    return Object.entries(s);
  });

  ngOnInit(): void {
    this.http.get<DashboardStats>(`${API_BASE_URL}/api/admin/dashboard`).subscribe({
      next: (s) => {
        this.stats.set(s);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  statusColor(s: string): string {
    const m: Record<string, string> = {
      paid: 'green', pending: 'yellow', rejected: 'red', canceled: 'gray',
    };
    return m[s] || 'gray';
  }

  maxRevenue(): number {
    const vals = Object.values(this.stats()?.revenueByMonth || {});
    return Math.max(1, ...vals);
  }

  monthLabel(key: string): string {
    const [y, m] = key.split('-');
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${months[+m - 1]} ${y.slice(2)}`;
  }

  barHeight(val: number): number {
    return Math.max(4, (val / this.maxRevenue()) * 100);
  }
}
