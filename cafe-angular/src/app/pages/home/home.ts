import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';
import { MenuCard } from '../../components/menu-card/menu-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MenuCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly menu = inject(MenuService);
  protected readonly cart = inject(CartService);
}
