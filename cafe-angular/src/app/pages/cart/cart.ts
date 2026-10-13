import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartSummary } from '../../components/cart-summary/cart-summary';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink, CartSummary],
  template: `
    <div class="page narrow">
      <a routerLink="/menu">← Keep shopping</a>
      <app-cart-summary />
    </div>
  `,
  styles: `
    app-cart-summary {
      display: block;
      margin-top: 16px;
    }
  `,
})
export class CartPage {}
