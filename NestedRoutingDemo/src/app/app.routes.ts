import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Account } from './pages/account/account';
import { AccountOverview } from './pages/account-overview/account-overview';
import { AccountOrders } from './pages/account-orders/account-orders';
import { AccountSettings } from './pages/account-settings/account-settings';

import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  /**
   * DEFAULT ROUTE (Application Entry Point)
   * When user opens the application root URL: http://localhost:4200/
   * we redirect them to the Login page.
   */
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  /**
   * PUBLIC ROUTE
   * Login page should be accessible without authentication.
   * Example: /login
   */
  { path: 'login', component: Login },

  /**
   * PROTECTED ROUTE (PARENT LAYOUT + CHILD ROUTES)
   *
   * /account is a parent (layout) route. It loads the Account component,
   * which contains the sidebar/menu and a <router-outlet>.
   *
   * Inside that <router-outlet>, Angular renders one of the child components
   * based on the remaining URL segment:
   *   /account/overview  -> AccountOverview
   *   /account/orders    -> AccountOrders
   *   /account/settings  -> AccountSettings
   *
   * SECURITY:
   * canActivateChild: [AuthGuardService] means:
   * - Every child route under /account/* is protected.
   * - If the user is NOT logged in, the guard redirects to:
   *      /login?returnUrl=/account/xyz
   * - After successful login, we navigate back to returnUrl.
   */
  {
    path: 'account',
    component: Account,
    canActivateChild: [AuthGuardService],
    children: [
      /**
       * DEFAULT CHILD ROUTE
       * If user opens only /account, redirect them to /account/overview.
       */
      { path: '', redirectTo: 'overview', pathMatch: 'full' },

      /** Child route: /account/overview */
      { path: 'overview', component: AccountOverview },

      /** Child route: /account/orders */
      { path: 'orders', component: AccountOrders },

      /** Child route: /account/settings */
      { path: 'settings', component: AccountSettings }
    ]
  },

  /**
   * WILDCARD ROUTE (Fallback)
   * If user enters an unknown URL that doesn't match any route,
   * redirect them to Login.
   *
   * IMPORTANT:
   * Wildcard route should always be the LAST route in the route list.
   */
  { path: '**', redirectTo: 'login' }
];
