import { Component, computed, inject, input, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-item-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './item-detail.html',
  styleUrl: './item-detail.css',
})
export class ItemDetail {
  // Filled from the :id route parameter (withComponentInputBinding)
  readonly id = input.required<string>();

  protected readonly menu = inject(MenuService);
  private readonly cart = inject(CartService);

  protected readonly item = computed(() => this.menu.findById(Number(this.id())));
  protected readonly related = computed(() => {
    const current = this.item();
    return current
      ? this.menu.items().filter((i) => i.category === current.category && i.id !== current.id)
      : [];
  });

  protected readonly quantity = signal(1);
  protected readonly added = signal(false);

  protected changeQuantity(delta: number): void {
    this.quantity.update((q) => Math.min(10, Math.max(1, q + delta)));
  }

  protected addToCart(): void {
    const item = this.item();
    if (!item) return;
    this.cart.add(item, this.quantity());
    this.added.set(true);
  }
}
