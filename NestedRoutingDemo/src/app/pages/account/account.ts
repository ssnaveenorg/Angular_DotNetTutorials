import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// A simple TypeScript type that represents user details
// displayed in the left sidebar of the Account layout.
type UserProfile = {
  name: string;
  role: string;
  email: string;
  lastLogin: string;
};

@Component({
  standalone: true,

  // RouterOutlet:
  // - Required because Account is a parent (layout) component.
  // - Child routes (Overview/Orders/Settings) will render inside <router-outlet> in account.html.

  // RouterLink & RouterLinkActive:
  // - Used for sidebar navigation links.
  // - RouterLink navigates to child pages (overview/orders/settings).
  // - RouterLinkActive adds an "active" CSS class to the selected menu item.
  imports: [RouterOutlet, RouterLink, RouterLinkActive],

  // HTML template
  templateUrl: './account.html'
})
export class Account {

  // user profile data for UI display.
  public profile: UserProfile = {
    name: 'Pranaya Rout',
    role: 'Admin',
    email: 'pranaya@example.com',
    lastLogin: 'Today, 10:45 AM'
  };

  // Sidebar navigation configuration.
  // Each item represents a child route under /account.
  // Example URLs:
  // - /account/overview
  // - /account/orders
  // - /account/settings

  // "as const":
  // - Makes this array read-only (prevents accidental modification)
  navLinks = [
    { label: 'Overview', path: 'overview' },
    { label: 'Orders', path: 'orders' },
    { label: 'Settings', path: 'settings'}
  ] as const;
}
