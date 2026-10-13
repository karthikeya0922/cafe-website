import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MenuPage } from './pages/menu/menu';
import { ItemDetail } from './pages/item-detail/item-detail';
import { CartPage } from './pages/cart/cart';
import { NotFound } from './pages/not-found/not-found';
import { cartNotEmptyGuard } from './guards/cart-not-empty';

export const routes: Routes = [
  { path: '', component: Home, title: 'Fire Pot' },
  { path: 'menu', component: MenuPage, title: 'Menu - Fire Pot' },
  // Route parameter: /menu/3 shows item 3
  { path: 'menu/:id', component: ItemDetail, title: 'Item - Fire Pot' },
  { path: 'cart', component: CartPage, title: 'Cart - Fire Pot' },
  {
    path: 'checkout',
    // Lazy loaded: this page's code is only downloaded when it is visited
    loadComponent: () => import('./pages/checkout/checkout').then((m) => m.Checkout),
    canActivate: [cartNotEmptyGuard],
    title: 'Checkout - Fire Pot',
  },
  {
    path: 'orders/:id',
    loadComponent: () => import('./pages/order-confirmation/order-confirmation').then((m) => m.OrderConfirmation),
    title: 'Order Confirmed - Fire Pot',
  },
  {
    path: 'reserve',
    loadComponent: () => import('./pages/reservation/reservation').then((m) => m.ReservationPage),
    title: 'Reserve a Table - Fire Pot',
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: NotFound, title: 'Page Not Found - Fire Pot' },
];
