import { Component } from '@angular/core';
import { MenuList } from '../../components/menu-list/menu-list';
import { CartSummary } from '../../components/cart-summary/cart-summary';

@Component({
  selector: 'app-menu-page',
  imports: [MenuList, CartSummary],
  template: `
    <div class="page layout">
      <app-menu-list />
      <app-cart-summary />
    </div>
  `,
  styles: `
    .layout {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 28px;
      align-items: start;
    }

    @media (max-width: 800px) {
      .layout {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class MenuPage {}
