// Type used to configure the app
import { ApplicationConfig } from '@angular/core';   

// provideRouter = register routes
// withPreloading = enable a preloading strategy        
import { provideRouter, withPreloading } from '@angular/router'; 

// All routes (Home, Catalog, Reports, Admin)
import { routes } from './app.routes';    

// Our custom logic: preload only routes with data.preload = true
import { SelectivePreloading } from './selective-preloading';   

export const appConfig: ApplicationConfig = {
  providers: [
    // Registers Angular Router with our routes
    // and tells Angular Router to use SelectivePreloading for preloading logic
    provideRouter(
      routes,                             // Route definitions
      withPreloading(SelectivePreloading) // Enable selective preloading strategy
    ),
  ],
};
