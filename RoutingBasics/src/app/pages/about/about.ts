import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',

  // RouterLink enables SPA navigation:
  // - Updates the URL without a full page refresh
  // - Loads the matched route component inside <router-outlet>
  imports: [RouterLink],
  
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  // This component is displayed when the route table matches:
  // { path: 'about', component: About }
}
