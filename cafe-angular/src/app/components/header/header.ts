import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Values passed in from the parent component
  readonly title = input.required<string>();
  readonly tagline = input('');

  protected readonly cart = inject(CartService);
  protected readonly logo = 'logo.png';

  protected readonly links = [
    { path: '/', label: 'Home', exact: true },
    { path: '/menu', label: 'Menu', exact: false },
    { path: '/reserve', label: 'Reserve a Table', exact: false },
  ];
}
