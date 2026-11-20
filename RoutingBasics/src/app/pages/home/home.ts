// Imports the Component decorator to define an Angular component
import { Component } from '@angular/core';

// Imports RouterLink directive, which allows
// this component’s template to perform route-based navigation
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',

  // Registers routing directives used in the template (home.html).
  // RouterLink enables navigation to other routes
  // without triggering a full page reload.
  imports: [RouterLink],

  // External template where routerLink / queryParams are used.
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // This component represents the "Home" page of the application.
  // It is activated when the URL matches /home.
  // The router creates and destroys this component automatically
  // based on navigation, without reloading the browser.
}
