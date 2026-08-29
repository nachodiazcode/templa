import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../../core/config';
import { DatePipe, JsonPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-admin-audit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePipe, JsonPipe, SlicePipe],
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.scss',
})
export class AdminAuditComponent implements OnInit {
  private http = inject(HttpClient);

  readonly logs = signal<any[]>([]);
  readonly loading = signal(true);
  readonly page = signal(1);
  readonly pages = signal(0);
  readonly entity = signal('');

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    const params: any = { page: this.page(), limit: 30 };
    if (this.entity()) params.entity = this.entity();

    this.http.get<any>(`${API_BASE_URL}/api/admin/audit`, { params }).subscribe({
      next: (r) => { this.logs.set(r.items); this.pages.set(r.pages); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  filterEntity(e: string): void {
    this.entity.set(e);
    this.page.set(1);
    this.load();
  }

  prevPage(): void {
    if (this.page() > 1) { this.page.update((p) => p - 1); this.load(); }
  }

  nextPage(): void {
    if (this.page() < this.pages()) { this.page.update((p) => p + 1); this.load(); }
  }

  actionLabel(a: string): string {
    const m: Record<string, string> = {
      create: 'Creó', update: 'Editó', delete: 'Eliminó',
      status_change: 'Cambió status', role_change: 'Cambió rol',
    };
    return m[a] || a;
  }

  actionClass(a: string): string {
    const m: Record<string, string> = {
      create: 'green', update: 'blue', delete: 'red',
      status_change: 'yellow', role_change: 'purple',
    };
    return m[a] || '';
  }
}
