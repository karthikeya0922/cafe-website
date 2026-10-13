import { Component, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-summary',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-summary.html',
  styleUrl: './cart-summary.css',
})
export class CartSummary {
  readonly showCheckout = input(true);
  protected readonly cart = inject(CartService);
}
