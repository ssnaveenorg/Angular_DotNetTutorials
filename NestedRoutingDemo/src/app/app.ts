
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  standalone: true,
  // RouterOutlet is required because this component hosts the <router-outlet> in app.html
  imports: [RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html'
})
export class App {
  constructor(
    /**
     * Router is used for:
     * - detecting route changes (to decide when to show/hide header)
     * - navigating programmatically (Login / Logout redirection)
     */
    private router: Router,

    /**
     * AuthService stores login state and user info.
     * The App component reads those values to show Login/Logout and user details in the header.
     */
    private authService: AuthService
  ) {}

  /**
   * Returns true if user is logged in.
   * Used in the UI to decide whether to show "Login" button or "UserName(Role) + Logout".
   */
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  /**
   * Gets the logged-in user's display name from AuthService (localStorage).
   * Used in the header to show: "Pranaya Rout (Admin)"
   */
  get userName(): string {
    return this.authService.getUserName();
  }

  /**
   * Gets the logged-in user's role from AuthService (localStorage).
   * Used in the header to show: "Pranaya Rout (Admin)"
   */
  get userRole(): string {
    return this.authService.getUserRole();
  }

  /**
   * Navigates user to the Login page.
   * Used when user is not logged in and clicks the "Login" button.
   */
  goToLogin(): void {
    this.router.navigateByUrl('/login');
  }

  /**
   * Logs out the user and redirects to the Login page.
   * - Clears login info from localStorage using AuthService.logout()
   * - Redirects user to /login
   */
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
