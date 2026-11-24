import { Component } from '@angular/core';

type StatCard = { title: string; value: string; hint: string };
type Activity = { id: number; title: string; time: string; status: 'success' | 'warning' | 'info' };

@Component({
  standalone: true,
  templateUrl: './account-overview.html'
})
export class AccountOverview {
  // Dummy data
  stats: StatCard[] = [
    { title: 'Orders (30d)', value: '128', hint: 'All statuses' },
    { title: 'Pending', value: '7', hint: 'Needs attention' },
    { title: 'Refund Requests', value: '2', hint: 'Under review' },
    { title: 'Wallet Balance', value: '₹1,250', hint: 'Available' }
  ];

  activities: Activity[] = [
    { id: 1, title: 'Order #103 delivered', time: 'Today, 10:45 AM', status: 'success' },
    { id: 2, title: 'Payment pending for Order #102', time: 'Today, 09:10 AM', status: 'warning' },
    { id: 3, title: 'Profile updated (Address)', time: 'Yesterday, 06:20 PM', status: 'info' }
  ];

  getBadgeClass(s: Activity['status']): string {
    return s === 'success'
      ? 'bg-success'
      : s === 'warning'
        ? 'bg-warning text-dark'
        : 'bg-info text-dark';
  }
}
