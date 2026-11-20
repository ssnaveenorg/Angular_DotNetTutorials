// Imports ApplicationConfig, which is used to configure global providers for a standalone Angular application
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

// Imports provideRouter, which sets up Angular's routing system
import { provideRouter } from '@angular/router';

// Imports the application's route definitions
// This contains the URL → Component mapping
import { routes } from './app.routes';

// Global application configuration object
// This replaces the traditional AppModule in standalone Angular apps
// This file defines the application's global configuration for a Standalone Angular app.
// The config is passed to bootstrapApplication(...) in main.ts.
export const appConfig: ApplicationConfig = {
  providers: [
    // Registers Angular’s global error handling in the browser runtime.
    // If an error occurs during change detection, template rendering, or event handling,
    // Angular can report it consistently (useful for debugging and logging).
    provideBrowserGlobalErrorListeners(),

    // Enables Angular Routing for the whole application.
    // - It registers the Router service and all routing directives (routerLink, router-outlet, etc.)
    // - It tells Angular to use the route table defined in `routes`
    // - After this, Angular can:
    //    • match URLs to components
    //    • handle redirects
    //    • support browser back/forward buttons
    //    • update the URL without page reload (SPA navigation) 
    provideRouter(routes)
  ]
};
