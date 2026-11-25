// Used to configure the app in a standalone Angular setup
import { ApplicationConfig } from '@angular/core'; 

// provideRouter      -> registers the router and our route list
// withPreloading     -> enables preloading support
// PreloadAllModules  -> built-in strategy: preload ALL lazy routes in the background
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router'; 

// The routes array (Home, Catalog, Reports, Admin, etc.)
import { routes } from './app.routes'; 

// Application-wide configuration for a standalone Angular app
export const appConfig: ApplicationConfig = {
  providers: [

    // Register routes and turn on preloading
    // PreloadAllModules means: after the app loads, Angular downloads all lazy route bundles automatically
    provideRouter(

      routes, // All route definitions (eager and lazy)

      // Enables preloading support in Angular routing
      // PreloadAllModules tells Angular to preload
      // ALL lazy-loaded routes in the background
      withPreloading(PreloadAllModules)
    ),
  ],
};
