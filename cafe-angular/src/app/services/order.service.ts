import { Injectable, signal } from '@angular/core';
import { CartLine } from '../models/menu-item';

export type OrderType = 'dine-in' | 'takeaway' | 'delivery';

export interface OrderDetails {
  name: string;
  phone: string;
  orderType: OrderType;
  tableNumber: number | null;
  address: string;
  notes: string;
}

export interface Order extends OrderDetails {
  id: number;
  lines: CartLine[];
  total: number;
  placedAt: Date;
}

/** Keeps the orders placed during this session. */
@Injectable({ providedIn: 'root' })
export class OrderService {
  private nextId = 1001;
  private readonly orders = signal<Order[]>([]);

  place(details: OrderDetails, lines: CartLine[], total: number): Order {
    const order: Order = { ...details, id: this.nextId++, lines, total, placedAt: new Date() };
    this.orders.update((orders) => [...orders, order]);
    return order;
  }

  findById(id: number): Order | undefined {
    return this.orders().find((order) => order.id === id);
  }
}
