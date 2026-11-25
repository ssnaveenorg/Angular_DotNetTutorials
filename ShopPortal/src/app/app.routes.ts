import { Routes } from '@angular/router';

// EAGER: direct imports
import { Home } from './pages/home/home';
import { Catalog } from './pages/catalog/catalog';

export const routes: Routes = [
  // EAGER
  { path: '', component: Home },
  { path: 'catalog', component: Catalog },

  // LAZY
  {
    path: 'reports',
    loadComponent: () => import('./pages/reports/reports').then(m => m.Reports),
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then(m => m.Admin),
  },

  { path: '**', redirectTo: '' },
];
