import { Injectable } from '@angular/core';
import {
  // CanActivateChild:
  // Guard interface that protects ALL child routes under a parent route.
  // Example: /account/overview, /account/orders, /account/settings
  // If this guard returns false/UrlTree, navigation to child routes is blocked.
  CanActivateChild,

  // ActivatedRouteSnapshot:
  // A "read-only snapshot" of the route information at the moment navigation happens.
  // Contains route params, query params, route config, and data for the CURRENT route being activated.
  ActivatedRouteSnapshot,

  // RouterStateSnapshot:
  // A "read-only snapshot" of the entire router state at navigation time.
  // Most importantly, it contains the FULL URL user is trying to access (state.url),
  // which we often use for returnUrl redirection after login.
  RouterStateSnapshot,

  // Router:
  // Angular's Router service used to navigate programmatically and also to create UrlTree.
  // In guards, we usually avoid router.navigate() and instead return a UrlTree.
  Router,

  // UrlTree:
  // A special object that represents a URL in Angular routing.
  // If a guard returns a UrlTree, Angular cancels the current navigation
  // and redirects to that UrlTree target automatically.
  // Example: return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
  UrlTree
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivateChild {

  /**
   * AuthGuardService protects CHILD routes under a parent route.
   * Example:
   *  {
   *    path: 'account',
   *    component: Account,
   *    canActivateChild: [AuthGuardService],
   *    children: [...]
   *  }
   *
   * Meaning:
   * - Any URL like /account/overview, /account/orders, /account/settings
   *   will pass through this guard first.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * This method runs automatically whenever the user tries to access
   * any child route of a protected parent route.
   *
   * Return Types:
   * - true  => allow navigation (user can open the page)
   * - UrlTree => block navigation and redirect to another route
   */
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {

    // STEP 1: Check whether user is logged in (stored in localStorage by AuthService)
    if (this.authService.isLoggedIn()) {
      // User is logged in -> allow access to requested child route
      return true;
    }

    /**
     * STEP 2: User is NOT logged in -> redirect to Login page.
     *
     * We also pass "returnUrl" (the URL user originally requested)
     * so that after successful login, we can redirect them back.
     *
     * Example:
     * - User tries to open: /account/orders
     * - Guard redirects to: /login?returnUrl=/account/orders
     * - After login success: redirect back to /account/orders
     */
    return this.router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }
}
