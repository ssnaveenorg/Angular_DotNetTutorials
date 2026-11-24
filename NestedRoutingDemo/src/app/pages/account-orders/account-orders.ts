import { Component } from '@angular/core';

type OrderStatus = 'Delivered' | 'Pending' | 'Cancelled';

type OrderItem = {
  id: number;
  date: string;
  amount: number;
  items: number;
  status: OrderStatus;
};

@Component({
  standalone: true,
  templateUrl: './account-orders.html'
})
export class AccountOrders {
  // Dummy data comes
  orders: OrderItem[] = [
    { id: 103, date: '2026-02-08', amount: 2499, items: 3, status: 'Delivered' },
    { id: 102, date: '2026-02-07', amount: 799, items: 1, status: 'Pending' },
    { id: 101, date: '2026-02-05', amount: 1299, items: 2, status: 'Cancelled' }
  ];

  get totalOrders(): number {
    return this.orders.length;
  }

  get totalAmount(): number {
    return this.orders.reduce((sum, o) => sum + o.amount, 0);
  }

  formatCurrency(v: number): string {
    return `₹${v.toLocaleString('en-IN')}`;
  }

  getStatusBadgeClass(s: OrderStatus): string {
    if (s === 'Delivered') return 'bg-success';
    if (s === 'Pending') return 'bg-warning text-dark';
    return 'bg-secondary';
  }
}
