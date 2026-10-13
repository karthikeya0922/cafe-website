import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

/** Route guard: checkout is only reachable when the cart has items. */
export const cartNotEmptyGuard: CanActivateFn = () => {
  const cart = inject(CartService);
  return cart.count() > 0 ? true : inject(Router).createUrlTree(['/menu']);
};
