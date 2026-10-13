import { Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-confirmation',
  imports: [CurrencyPipe, DatePipe, TitleCasePipe, RouterLink],
  templateUrl: './order-confirmation.html',
})
export class OrderConfirmation {
  // Filled from the :id route parameter
  readonly id = input.required<string>();

  private readonly orders = inject(OrderService);
  protected readonly order = computed(() => this.orders.findById(Number(this.id())));
}
