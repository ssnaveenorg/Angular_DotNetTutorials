import { Routes } from '@angular/router';
// Eager Loading: direct imports (part of initial bundle)
import { Home } from './pages/home/home';
import { Catalog } from './pages/catalog/catalog';

export const routes: Routes = [

  // Home page loads immediately when the app starts (Eager)
  { path: '', component: Home },

  // Catalog page also loads with the main bundle (Eager)
  { path: 'catalog', component: Catalog },

  // Reports is a LAZY route (code is split into a separate chunk)
  // Because preload = true, our Selective Preloading Strategy will preload it in the background
  {
    path: 'reports',
    loadComponent: () => import('./pages/reports/reports').then(m => m.Reports),
    data: { preload: true }, // preload this lazy route after app load
  },

  // Admin is also a LAZY route (separate chunk)
  // Because preload = false, it will NOT preload
  // Its chunk will download only when the user clicks Admin
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then(m => m.Admin),
    data: { preload: false }, // do not preload; load only on navigation
  },

  // Any unknown URL redirects back to Home
  { path: '**', redirectTo: '' },
];
