// Import Component decorator to define the root Angular component
import { Component } from '@angular/core';

// Import RouterOutlet for rendering routed components
// Import RouterLink for navigation links
import { RouterLink, RouterOutlet } from '@angular/router';

// Import CommonModule for common Angular directives
import { CommonModule } from '@angular/common';

// Import AuthService to access authentication state and logout functionality
import { AuthService } from './services/auth.service';

@Component({
  // Selector used to bootstrap the root component
  selector: 'app-root',

  // Standalone root component (no NgModule required)
  standalone: true,

  // Import required Angular modules and router directives
  imports: [CommonModule, RouterOutlet, RouterLink],

  // External HTML template for the root layout
  templateUrl: 'app.html'
})
export class App {

  // Inject AuthService using Angular Dependency Injection
  // Marked as public so it can be accessed in the template
  constructor(public auth: AuthService) {}

  // Logs out the currently authenticated user
  logout(): void {
    this.auth.logout();
  }
}
