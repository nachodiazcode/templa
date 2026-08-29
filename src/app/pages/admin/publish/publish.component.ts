import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../../core/config';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-publish',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.scss',
})
export class PublishComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  private toast = inject(ToastService);

  readonly step = signal(1);
  readonly saving = signal(false);
  readonly zipFile = signal<File | null>(null);
  readonly zipFileName = signal('');
  readonly zipPreview = signal<string[]>([]);
  readonly dragOver = signal(false);

  readonly form = signal({
    name: '',
    tagline: '',
    description: '',
    category: 'landing',
    price: 0,
    pages: 1,
    tech: '',
    features: '',
    colors: '#7c3aed,#06b6d4',
    accent: '#7c3aed',
    isFeatured: false,
    isNew: true,
  });

  updateField(field: string, value: any): void {
    this.form.update(f => ({ ...f, [field]: value }));
  }

  nextStep(): void {
    if (this.step() < 3) this.step.update(s => s + 1);
  }

  prevStep(): void {
    if (this.step() > 1) this.step.update(s => s - 1);
  }

  canProceed(): boolean {
    const s = this.step();
    if (s === 1) return !!this.form().name.trim();
    if (s === 2) return !!this.zipFile();
    return true;
  }

  onDragOver(e: DragEvent): void {
    e.preventDefault();
    this.dragOver.set(true);
  }

  onDragLeave(): void {
    this.dragOver.set(false);
  }

  onDrop(e: DragEvent): void {
    e.preventDefault();
    this.dragOver.set(false);
    const file = e.dataTransfer?.files[0];
    if (file) this.handleFile(file);
  }

  onFileSelect(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files?.[0]) this.handleFile(input.files[0]);
  }

  private handleFile(file: File): void {
    if (!file.name.endsWith('.zip')) {
      this.toast.show('Solo se permiten archivos .zip', 'info');
      return;
    }
    this.zipFile.set(file);
    this.zipFileName.set(file.name);
    this.zipPreview.set([`${(file.size / 1024).toFixed(0)} KB — ${file.name}`]);
  }

  removeZip(): void {
    this.zipFile.set(null);
    this.zipFileName.set('');
    this.zipPreview.set([]);
  }

  publish(): void {
    if (!this.zipFile() || !this.form().name.trim()) return;

    this.saving.set(true);
    const f = this.form();

    const metadata = {
      name: f.name.trim(),
      tagline: f.tagline.trim(),
      description: f.description.trim(),
      category: f.category,
      price: +f.price,
      pages: +f.pages,
      tech: f.tech.split(',').map(s => s.trim()).filter(Boolean),
      features: f.features.split('\n').map(s => s.trim()).filter(Boolean),
      colors: f.colors.split(',').map(s => s.trim()).filter(Boolean),
      accent: f.accent,
      isFeatured: f.isFeatured,
      isNew: f.isNew,
    };

    const fd = new FormData();
    fd.append('zipFile', this.zipFile()!);
    fd.append('metadata', JSON.stringify(metadata));

    this.http.post<any>(`${API_BASE_URL}/api/admin/templates/publish`, fd).subscribe({
      next: () => {
        this.saving.set(false);
        this.toast.show('Plantilla publicada correctamente', 'success');
        this.router.navigate(['/admin/templates']);
      },
      error: (err) => {
        this.saving.set(false);
        this.toast.show(err.error?.error || 'Error al publicar', 'info');
      },
    });
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }
}
