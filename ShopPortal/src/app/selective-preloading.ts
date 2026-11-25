// Used to mark this class as injectable so Angular DI can create it
import { Injectable } from '@angular/core';   

// PreloadingStrategy = interface for preloading logic 
// Route = route info (path, data, etc.)
import { PreloadingStrategy, Route } from '@angular/router';

// Observable = return type expected by preload()
// of() = creates an Observable for "do nothing"
import { Observable, of } from 'rxjs';                

// Angular will create and reuse this strategy automatically
@Injectable({ providedIn: 'root' }) 
export class SelectivePreloading implements PreloadingStrategy {

  // This method is called by Angular Router for each lazy route
  preload(route: Route, load: () => Observable<any>) {

    // route.data contains custom data we add in app.routes.ts
    // Example:
    // data: { preload: true }  -> preload in background
    // data: { preload: false } -> do not preload
    const shouldPreload = route.data?.['preload'] === true;

    // If preload flag is true, call load() to download the route bundle in background
    if (shouldPreload) {
      return load();
    }

    // If preload flag is false or missing, do nothing (skip preloading)
    // The route will still be lazy loaded when the user navigates to it.
    return of(null);
  }
}
