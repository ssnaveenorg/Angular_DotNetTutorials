import { Component } from '@angular/core';
import { Products } from './products/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Products],
  template: `<app-products></app-products>`
})
export class App {}
