import { Injectable, computed, signal } from '@angular/core';
import { CartLine, Product } from '../models/misbaha.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _lines = signal<CartLine[]>([]);
  readonly lines = this._lines.asReadonly();
  readonly isOpen = signal(false);

  readonly count = computed(() => this._lines().reduce((s, l) => s + l.qty, 0));
  readonly total = computed(() => this._lines().reduce((s, l) => s + l.qty * l.product.price, 0));

  add(product: Product): void {
    this.change(product, 1);
  }

  change(product: Product, delta: number): void {
    this._lines.update(lines => {
      const found = lines.find(l => l.product.id === product.id);
      if (!found) return delta > 0 ? [...lines, { product, qty: delta }] : lines;
      const qty = found.qty + delta;
      return qty <= 0
        ? lines.filter(l => l !== found)
        : lines.map(l => (l === found ? { ...l, qty } : l));
    });
  }

  clear(): void {
    this._lines.set([]);
  }
}
