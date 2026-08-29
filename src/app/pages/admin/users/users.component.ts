import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../../core/config';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class AdminUsersComponent implements OnInit {
  private http = inject(HttpClient);

  readonly users = signal<any[]>([]);
  readonly loading = signal(true);
  readonly selected = signal<any | null>(null);
  readonly page = signal(1);
  readonly pages = signal(0);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.http.get<any>(`${API_BASE_URL}/api/admin/users`, { params: { page: this.page(), limit: 20 } }).subscribe({
      next: (r) => { this.users.set(r.items); this.pages.set(r.pages); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  selectUser(u: any): void {
    if (this.selected()?.id === u.id) { this.selected.set(null); return; }
    this.http.get<any>(`${API_BASE_URL}/api/admin/users/${u.id}`).subscribe({
      next: (detail) => this.selected.set(detail),
    });
  }

  toggleRole(u: any): void {
    const newRole = u.role === 'admin' ? 'user' : 'admin';
    if (!confirm(`¿Cambiar rol de ${u.email} a "${newRole}"?`)) return;
    this.http.patch(`${API_BASE_URL}/api/admin/users/${u.id}/role`, { role: newRole }).subscribe({
      next: () => this.load(),
    });
  }

  prevPage(): void {
    if (this.page() > 1) { this.page.update((p) => p - 1); this.load(); }
  }

  nextPage(): void {
    if (this.page() < this.pages()) { this.page.update((p) => p + 1); this.load(); }
  }
}
