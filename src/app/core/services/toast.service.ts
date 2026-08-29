import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  kind: 'success' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);
  private seq = 0;

  show(message: string, kind: Toast['kind'] = 'success'): void {
    const toast: Toast = { id: ++this.seq, message, kind };
    this.toasts.update((list) => [...list, toast]);
    setTimeout(() => this.dismiss(toast.id), 2800);
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
