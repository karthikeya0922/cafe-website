import { Component, computed, signal } from '@angular/core';
import { CartLine, MenuItem } from './models/menu-item';
import { Header } from './components/header/header';
import { MenuList } from './components/menu-list/menu-list';
import { CartSummary } from './components/cart-summary/cart-summary';

@Component({
  selector: 'app-root',
  imports: [Header, MenuList, CartSummary],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'Fire Pot';
  protected readonly cart = signal<CartLine[]>([]);
  protected readonly cartCount = computed(() => this.cart().reduce((n, line) => n + line.quantity, 0));

  protected addToCart(item: MenuItem): void {
    this.cart.update((lines) => {
      const existing = lines.find((l) => l.item.id === item.id);
      return existing
        ? lines.map((l) => (l === existing ? { ...l, quantity: l.quantity + 1 } : l))
        : [...lines, { item, quantity: 1 }];
    });
  }

  protected changeQuantity(change: { id: number; delta: number }): void {
    this.cart.update((lines) =>
      lines
        .map((l) => (l.item.id === change.id ? { ...l, quantity: l.quantity + change.delta } : l))
        .filter((l) => l.quantity > 0),
    );
  }
}
