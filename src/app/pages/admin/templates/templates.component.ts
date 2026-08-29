import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../../core/config';
import { DecimalPipe } from '@angular/common';

const CATEGORY_LABELS: Record<string, string> = {
  saas: 'SaaS', ecommerce: 'E-commerce', landing: 'Landing',
  portfolio: 'Portfolio', blog: 'Blog', dashboard: 'Dashboard',
};

@Component({
  selector: 'app-admin-templates',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss',
})
export class AdminTemplatesComponent implements OnInit {
  private http = inject(HttpClient);

  readonly templates = signal<any[]>([]);
  readonly loading = signal(true);
  readonly search = signal('');
  readonly showModal = signal(false);
  readonly editing = signal<any | null>(null);
  readonly saving = signal(false);

  readonly form = signal({
    name: '', price: 0, tagline: '', description: '', category: 'landing',
    pages: 1, tech: '', features: '', colors: '#7c3aed,#06b6d4', accent: '#7c3aed',
    isFeatured: false, isNew: false,
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.http.get<any[]>(`${API_BASE_URL}/api/admin/templates`).subscribe({
      next: (t) => { this.templates.set(t); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  filtered(): any[] {
    const q = this.search().toLowerCase();
    if (!q) return this.templates();
    return this.templates().filter((t) => t.name?.toLowerCase().includes(q) || t.id?.toLowerCase().includes(q));
  }

  openCreate(): void {
    this.editing.set(null);
    this.form.set({
      name: '', price: 0, tagline: '', description: '', category: 'landing',
      pages: 1, tech: '', features: '', colors: '#7c3aed,#06b6d4', accent: '#7c3aed',
      isFeatured: false, isNew: false,
    });
    this.showModal.set(true);
  }

  openEdit(t: any): void {
    this.editing.set(t);
    this.form.set({
      name: t.name || '', price: t.price || 0, tagline: t.tagline || '',
      description: t.description || '', category: t.category || 'landing',
      pages: t.pages || 1, tech: (t.tech || []).join(', '),
      features: (t.features || []).join('\n'), colors: (t.colors || []).join(','),
      accent: t.accent || '#7c3aed', isFeatured: !!t.is_featured, isNew: !!t.is_new,
    });
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.editing.set(null);
  }

  updateField(field: string, value: any): void {
    this.form.update((f) => ({ ...f, [field]: value }));
  }

  save(): void {
    const f = this.form();
    if (!f.name.trim()) return;

    const payload = {
      name: f.name.trim(),
      price: +f.price,
      tagline: f.tagline.trim(),
      description: f.description.trim(),
      category: f.category,
      pages: +f.pages,
      tech: f.tech.split(',').map((s: string) => s.trim()).filter(Boolean),
      features: f.features.split('\n').map((s: string) => s.trim()).filter(Boolean),
      colors: f.colors.split(',').map((s: string) => s.trim()).filter(Boolean),
      accent: f.accent,
      isFeatured: f.isFeatured,
      isNew: f.isNew,
    };

    this.saving.set(true);
    const req = this.editing()
      ? this.http.put(`${API_BASE_URL}/api/admin/templates/${this.editing().id}`, payload)
      : this.http.post(`${API_BASE_URL}/api/admin/templates`, payload);

    req.subscribe({
      next: () => { this.saving.set(false); this.closeModal(); this.load(); },
      error: () => this.saving.set(false),
    });
  }

  deleteTemplate(id: string): void {
    if (!confirm(`¿Eliminar plantilla "${id}"? Esta acción no se puede deshacer.`)) return;
    this.http.delete(`${API_BASE_URL}/api/admin/templates/${id}`).subscribe({ next: () => this.load() });
  }

  toggleFeatured(t: any): void {
    this.http.put(`${API_BASE_URL}/api/admin/templates/${t.id}`, { isFeatured: !t.is_featured }).subscribe({ next: () => this.load() });
  }

  catLabel(c: string): string {
    return CATEGORY_LABELS[c] || c;
  }
}
