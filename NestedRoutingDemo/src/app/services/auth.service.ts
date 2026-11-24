import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root' // Makes this service a singleton across the app
})
export class AuthService {

  // Holds login status in memory (cleared on page refresh)
  private loggedIn = false;

  // Stores logged-in user's name for UI display
  private userName = '';

  // Stores logged-in user's role (Admin, Account, etc.)
  private userRole = '';

  // Returns true if user is logged in
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  // Returns the logged-in user's name
  getUserName(): string {
    return this.userName;
  }

  // Returns the logged-in user's role
  getUserRole(): string {
    return this.userRole;
  }

  // Validates user credentials (demo purpose)
  login(username: string, password: string): boolean {

    // Demo Admin login
    if (username === 'admin' && password === 'admin@123') {
      this.loggedIn = true;              // Mark user as logged in
      this.userName = 'Pranaya Rout';    // Set display name
      this.userRole = 'Admin';           // Set user role
      return true;                       // Login successful
    }

    // Demo Account user login
    if (username === 'account' && password === 'account@123') {
      this.loggedIn = true;              // Mark user as logged in
      this.userName = 'Account User';    // Set display name
      this.userRole = 'Account';         // Set user role
      return true;                       // Login successful
    }

    // Invalid credentials
    return false;
  }

  // Clears all authentication data
  logout(): void {
    this.loggedIn = false; // User is no longer logged in
    this.userName = '';   // Clear user name
    this.userRole = '';   // Clear user role
  }
}
