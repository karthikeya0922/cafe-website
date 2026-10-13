import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/menu-item';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';
import { MenuCard } from '../menu-card/menu-card';

@Component({
  selector: 'app-menu-list',
  imports: [FormsModule, MenuCard],
  templateUrl: './menu-list.html',
  styleUrl: './menu-list.css',
})
export class MenuList {
  protected readonly menu = inject(MenuService);
  protected readonly cart = inject(CartService);

  protected readonly categories: (Category | 'All')[] = ['All', 'Coffee', 'Tea', 'Shakes', 'Bakery', 'Snacks'];

  // Bound to the template with [(ngModel)] and (click)
  protected readonly search = signal('');
  protected readonly category = signal<Category | 'All'>('All');
  protected readonly vegOnly = signal(false);

  protected readonly visibleItems = computed(() => {
    const term = this.search().toLowerCase();
    return this.menu.items().filter(
      (item) =>
        (this.category() === 'All' || item.category === this.category()) &&
        (!this.vegOnly() || item.veg) &&
        item.name.toLowerCase().includes(term),
    );
  });
}
