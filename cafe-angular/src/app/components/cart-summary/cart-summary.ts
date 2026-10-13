import { Component, computed, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartLine } from '../../models/menu-item';

@Component({
  selector: 'app-cart-summary',
  imports: [CurrencyPipe],
  templateUrl: './cart-summary.html',
  styleUrl: './cart-summary.css',
})
export class CartSummary {
  readonly lines = input<CartLine[]>([]);
  readonly changeQuantity = output<{ id: number; delta: number }>();
  readonly clear = output<void>();

  protected readonly total = computed(() =>
    this.lines().reduce((sum, line) => sum + line.item.price * line.quantity, 0),
  );
}
