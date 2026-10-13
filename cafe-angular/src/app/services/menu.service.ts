import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { MenuItem } from '../models/menu-item';

/** Loads the menu once from public/menu-data.json and shares it with every page. */
@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly http = inject(HttpClient);

  readonly items = signal<MenuItem[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');

  /** The three highest-rated items, shown on the home page. */
  readonly featured = computed(() => [...this.items()].sort((a, b) => b.rating - a.rating).slice(0, 3));

  constructor() {
    this.http.get<MenuItem[]>('menu-data.json').subscribe({
      next: (items) => {
        this.items.set(items);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(`Could not load the menu (${err.status || 'network error'}).`);
        this.loading.set(false);
      },
    });
  }

  findById(id: number): MenuItem | undefined {
    return this.items().find((item) => item.id === id);
  }
}
