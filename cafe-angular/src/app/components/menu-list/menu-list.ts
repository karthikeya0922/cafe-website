import { Component, computed, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category, MenuItem } from '../../models/menu-item';
import { MenuCard } from '../menu-card/menu-card';

@Component({
  selector: 'app-menu-list',
  imports: [FormsModule, MenuCard],
  templateUrl: './menu-list.html',
  styleUrl: './menu-list.css',
})
export class MenuList {
  readonly add = output<MenuItem>();

  protected readonly items = signal<MenuItem[]>([
    { id: 1, name: 'Espresso', category: 'Coffee', price: 120, rating: 4.6, veg: true, icon: '☕', description: 'A bold, concentrated shot of our house blend.' },
    { id: 2, name: 'Cappuccino', category: 'Coffee', price: 150, rating: 4.8, veg: true, icon: '☕', description: 'Espresso topped with steamed milk and thick foam.' },
    { id: 3, name: 'Hazelnut Latte', category: 'Coffee', price: 160, rating: 4.7, veg: true, icon: '🥛', description: 'Smooth latte with a sweet roasted hazelnut twist.' },
    { id: 4, name: 'Masala Chai', category: 'Tea', price: 90, rating: 4.9, veg: true, icon: '🍵', description: 'Strong tea simmered with ginger, cardamom and spices.' },
    { id: 5, name: 'Green Tea', category: 'Tea', price: 100, rating: 4.2, veg: true, icon: '🍃', description: 'Light and refreshing, rich in antioxidants.' },
    { id: 6, name: 'Oreo Shake', category: 'Shakes', price: 190, rating: 4.8, veg: true, icon: '🥤', description: 'Thick vanilla shake blended with Oreo cookies.' },
    { id: 7, name: 'Butter Croissant', category: 'Bakery', price: 110, rating: 4.5, veg: true, icon: '🥐', description: 'Flaky, buttery and baked fresh every morning.' },
    { id: 8, name: 'Chocolate Brownie', category: 'Bakery', price: 140, rating: 4.9, veg: false, icon: '🍫', description: 'Fudgy brownie made with eggs and dark chocolate.' },
    { id: 9, name: 'Chicken Puff', category: 'Snacks', price: 80, rating: 4.4, veg: false, icon: '🥟', description: 'Golden puff pastry with spicy chicken filling.' },
    { id: 10, name: 'Peri Peri Fries', category: 'Snacks', price: 150, rating: 4.6, veg: true, icon: '🍟', description: 'Crispy fries tossed in spicy peri peri seasoning.' },
  ]);

  protected readonly categories: (Category | 'All')[] = ['All', 'Coffee', 'Tea', 'Shakes', 'Bakery', 'Snacks'];

  // Bound to the template with [(ngModel)] and (click)
  protected readonly search = signal('');
  protected readonly category = signal<Category | 'All'>('All');
  protected readonly vegOnly = signal(false);

  protected readonly visibleItems = computed(() => {
    const term = this.search().toLowerCase();
    return this.items().filter(
      (item) =>
        (this.category() === 'All' || item.category === this.category()) &&
        (!this.vegOnly() || item.veg) &&
        item.name.toLowerCase().includes(term),
    );
  });
}
