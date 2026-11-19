import { Routes } from '@angular/router';

export const routes: Routes = [];
// Import Routes type to define application route configuration
import { Routes } from '@angular/router';

// Import standalone components used in routing
import { Login } from './login/login';
import { Register } from './register/register';
import { Home } from './home/home';

// Define application routes
export const routes: Routes = [

  // Default route: loads Home component
  { path: '', component: Home },

  // Route for login page
  { path: 'login', component: Login },

  // Route for registration page
  { path: 'register', component: Register },

  // Wildcard route: redirects any unknown path to Home
  { path: '**', redirectTo: '' }
];
