import { Injectable, computed, signal } from '@angular/core';
import { CartLine, MenuItem } from '../models/menu-item';

/** Holds the cart so the header, menu, cart and checkout pages all see the same items. */
@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _lines = signal<CartLine[]>([]);

  readonly lines = this._lines.asReadonly();
  readonly count = computed(() => this._lines().reduce((n, line) => n + line.quantity, 0));
  readonly total = computed(() => this._lines().reduce((sum, l) => sum + l.item.price * l.quantity, 0));

  add(item: MenuItem, quantity = 1): void {
    this._lines.update((lines) => {
      const existing = lines.find((l) => l.item.id === item.id);
      return existing
        ? lines.map((l) => (l === existing ? { ...l, quantity: l.quantity + quantity } : l))
        : [...lines, { item, quantity }];
    });
  }

  changeQuantity(id: number, delta: number): void {
    this._lines.update((lines) =>
      lines
        .map((l) => (l.item.id === id ? { ...l, quantity: l.quantity + delta } : l))
        .filter((l) => l.quantity > 0),
    );
  }

  clear(): void {
    this._lines.set([]);
  }
}
