import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../services/product-service';
import { Product } from '../Models/product.model';

@Component({
  selector: 'app-products',

  // Standalone component (modern Angular)
  // No NgModule needed; we import dependencies directly here.
  standalone: true,

  // CommonModule: pipes + common directives
  // FormsModule: required for [(ngModel)] in the filter inputs
  imports: [CommonModule, FormsModule],

  // External HTML template file
  templateUrl: './products.html'
})
export class Products implements OnInit {

  // Manual service creation (NO Angular DI here)
  public productService: ProductService;
  
  // DATA USED BY THE UI
  // Master product list fetched from the service
  // This data never changes unless we explicitly reset it
  products: Product[] = [];

  // "View" list:
  // This is the filtered / searched / sorted version
  // of `products` that is actually displayed in the UI
  view: Product[] = [];

  // FILTER INPUTS (BOUND TO THE UI USING ngModel)
  searchText = '';   // Search input text
  category: Product['category'] | 'All' = 'All';  // Category dropdown
  stock: 'All' | 'InStock' | 'LowStock' | 'OutOfStock' = 'All'; // Stock dropdown
  sort: 'name' | 'priceAsc' | 'priceDesc' | 'ratingDesc' = 'name'; // Sort option

  constructor() {
    // Manually create the service instance
    this.productService = new ProductService();
  }

  // Lifecycle Hook
  // This is the correct place to:
  // - load initial data
  // - trigger first-time UI setup
  ngOnInit(): void {
    // Fetch the base product data once when component initializes
    this.products = this.productService.getAll();

     // Initialize the view with default filters and sorting
    this.applyFilters();
  }

  // Rebuilds the "view" list based on current UI inputs (search/category/stock/sort).
  // Important idea:
  // - this.products = master list (keep it unchanged)
  // - result        = working list that changes step-by-step
  // - this.view     = final list shown in the table
  applyFilters(): void {

    // "result" is a local working reference.
    // At this point, it points to the same array as this.products.
    // We will NOT mutate this.products; instead we keep reassigning "result"
    // to NEW arrays returned by filter/search methods.
    let result = this.products;

    // 1) SEARCH (if user typed something)
    // If searchText is not empty, replace "result" with the search results.
    // This does NOT modify this.products; it only changes what "result" points to.
    if (this.searchText.trim()) {
      // productService.search(...) returns a NEW array of matched products.
      // After this line, "result" now points to that new array.
      result = this.productService.search(this.searchText);
    }

    // 2) CATEGORY FILTER (if user selected a specific category)
    // We further reduce the current "result" list.
    // filter(...) returns a NEW array, so again only "result" changes.
    if (this.category !== 'All') {
      result = result.filter(p => p.category === this.category);
    }

    // 3) STOCK FILTER (if user selected stock status)
    // filterByStock(...) returns products matching that stock condition.
    // We then intersect it with our current "result" so all filters work together.
    if (this.stock !== 'All') {
      // "stockMatches" is a separate list returned by the service (NEW array).
      const stockMatches = this.productService.filterByStock(this.stock);

      // Intersection logic:
      // Keep only those items that exist in BOTH:
      // - current "result" (after search/category)
      // - stockMatches (based on stock rules)
      //
      // After this line, "result" points to a NEW intersected array.
      result = stockMatches.filter(p => result.some(r => r.id === p.id));
    }

    // 4) SORTING (always)
    // Sort the final filtered list and store it in "view".
    // The UI renders "view", not "products" and not "result".
    // sortBy(...) returns a NEW sorted array (it sorts a copy internally).
    this.view = this.productService.sortBy(result, this.sort);
  }

  // RESET BUTTON: Restore defaults and rebuild view
  reset(): void {
    // Reset filter inputs to defaults
    this.searchText = '';
    this.category = 'All';
    this.stock = 'All';
    this.sort = 'name';

    // Reload master list
    this.products = this.productService.getAll();

    // Rebuild view using default filters
    this.applyFilters();
  }

  // TEMPLATE HELPER: Category options for dropdown
  categories(): Array<Product['category'] | 'All'> {
    // Returned array is used by the <select> options in the template.
    return ['All', 'Electronics', 'Mobiles', 'Accessories', 'Appliances'];
  }
}

