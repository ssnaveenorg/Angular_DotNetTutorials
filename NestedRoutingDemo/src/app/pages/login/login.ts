import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class Login {

  //Template-driven form fields.
  // These variables are bound to the input controls using [(ngModel)] in login.html.
  username = '';
  password = '';

  // Holds validation or login error messages.
  // If set, the UI will display this message to the user.
  errorMessage = '';

  // Demo hint text shown on the login page (optional).
  // Helps testers/learners know which credentials to use.
  demoHint = 'Demo Login: admin / admin@123';

  constructor(
    //AuthService handles login/logout and stores login state in localStorage.
    private authService: AuthService,

    // Router is used for programmatic navigation after login/logout.
    private router: Router,

    // ActivatedRoute is used to read query string values from the current URL.
    // Example: /login?returnUrl=/account/orders
    private route: ActivatedRoute
  ) {
    // If the user is already logged in and tries to open /login manually,
    // redirect them directly to the Account page.
    // This avoids showing the login screen unnecessarily.
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/account/overview');
    }
  }

  // Called when user clicks the Login button.
  // This method validates input, performs login, and redirects user.
  onLogin(): void {
    // Clear old errors before re-validating or attempting login
    this.errorMessage = '';

    // BASIC VALIDATION:
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and Password are required.';
      return;
    }

    // Attempt login:
    // AuthService checks the credentials and returns true/false.
    const success = this.authService.login(this.username, this.password);

    // If login failed, show an error message and stop further processing
    if (!success) {
      this.errorMessage = 'Invalid username or password.';
      return;
    }

    //Redirect after successful login:

    // 1) If user was redirected to login by the guard, we will have: /login?returnUrl=/account/orders
    // so we should send them back to that original page.
    // 2) Otherwise, send them to the default landing page: /account/overview
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.router.navigateByUrl(returnUrl || '/account/overview');
  }
}
