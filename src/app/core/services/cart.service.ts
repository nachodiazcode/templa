import { Injectable, computed, effect, signal } from '@angular/core';
import { TEMPLATES } from '../data/templates.data';
import { TemplateItem } from '../models/template.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly STORAGE_KEY = 'templa.cart';

  readonly items = signal<TemplateItem[]>(this.load());
  readonly count = computed(() => this.items().length);
  readonly total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price, 0),
  );
  readonly hasFreeItems = computed(() =>
    this.items().some((i) => i.price === 0),
  );

  readonly isOpen = signal(false);

  constructor() {
    effect(() => {
      try {
        const ids = this.items().map((i) => i.id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ids));
      } catch { /* almacenamiento no disponible */ }
    });
  }

  add(template: TemplateItem): boolean {
    if (this.has(template.id)) return false;
    this.items.update((list) => [...list, template]);
    return true;
  }

  remove(id: string): void {
    this.items.update((list) => list.filter((i) => i.id !== id));
  }

  clear(): void {
    this.items.set([]);
  }

  has(id: string): boolean {
    return this.items().some((i) => i.id === id);
  }

  open(): void { this.isOpen.set(true); }
  close(): void { this.isOpen.set(false); }
  toggle(): void { this.isOpen.update((v) => !v); }

  private load(): TemplateItem[] {
    try {
      const ids: string[] = JSON.parse(
        localStorage.getItem(this.STORAGE_KEY) || '[]',
      );
      return ids
        .map((id) => TEMPLATES.find((t) => t.id === id))
        .filter((t): t is TemplateItem => Boolean(t));
    } catch {
      return [];
    }
  }
}
