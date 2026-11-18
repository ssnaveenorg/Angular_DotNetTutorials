import { Product } from '../Models/product.model';

export class ProductService {

  // In-memory dataset for demo purposes.
  // In real applications this usually comes from:
  // - REST API / GraphQL
  // - Database via backend services
  // - Local storage / cache layer
  //
  // Kept private to protect internal state (components should not modify it directly).
  private readonly products: Product[] = [
    { id: 1, name: 'Laptop Pro 14', sku: 'LTP-14-PRO', brand: 'TechNova', category: 'Electronics', basePrice: 65000, discountPercent: 10, taxPercent: 18, stockQty: 12, reorderLevel: 5,  isActive: true,  rating: 4.6, createdOn: '2026-01-10' },
    { id: 2, name: 'Smartphone X 5G', sku: 'MOB-X-5G', brand: 'MobiMax', category: 'Mobiles',     basePrice: 32000, discountPercent: 5,  taxPercent: 18, stockQty: 3,  reorderLevel: 10, isActive: true,  rating: 4.3, createdOn: '2026-01-21' },
    { id: 3, name: 'Tablet Air 11',   sku: 'TAB-AIR-11', brand: 'TechNova', category: 'Electronics', basePrice: 21000, discountPercent: 0,  taxPercent: 18, stockQty: 0,  reorderLevel: 4,  isActive: false, rating: 4.0, createdOn: '2025-12-02' },
    { id: 4, name: 'Fast Charger 65W',sku: 'ACC-CHG-65W', brand: 'ChargePro', category: 'Accessories', basePrice: 1999,  discountPercent: 15, taxPercent: 18, stockQty: 40, reorderLevel: 15, isActive: true,  rating: 4.7, createdOn: '2026-02-01' },
    { id: 5, name: 'Wireless Earbuds S2', sku: 'ACC-EAR-S2', brand: 'SoundMint', category: 'Accessories', basePrice: 3499, discountPercent: 20, taxPercent: 18, stockQty: 8,  reorderLevel: 10, isActive: true,  rating: 4.4, createdOn: '2025-11-18' },
    { id: 6, name: 'Smartwatch Active', sku: 'ACC-WCH-ACT', brand: 'FitPulse', category: 'Accessories', basePrice: 5999, discountPercent: 12, taxPercent: 18, stockQty: 18, reorderLevel: 7,  isActive: true,  rating: 4.2, createdOn: '2026-01-05' }
  ];

  constructor() {
    // Constructor is primarily for Dependency Injection.
    // Keep it light:
    // - set small defaults if needed
    // - avoid heavy computations or data loading here
  }

  // READ / FETCH METHODS
  // Purpose: Provide product data to components in a safe way.

  getAll(): Product[] {
    // Return a new array copy to prevent external modification.
    // Prevents component code from accidentally changing service state.
    return [...this.products];
  }

  getActive(): Product[] {
    // Return only active products.
    return this.products.filter(p => p.isActive);
  }

  getById(id: number): Product | undefined {
    // Find a product by primary identifier.
    return this.products.find(p => p.id === id);
  }

  // PRICING HELPERS (Business Rules)
  // These methods centralize pricing logic so UI stays clean.

  getDiscountedPrice(p: Product): number {
    // Calculate discount amount from base price.
    // Example: base=1000, discount=10% => discounted=900
    const discountAmount = (p.basePrice * p.discountPercent) / 100;
    return p.basePrice - discountAmount;
  }

  getFinalPrice(p: Product): number {
    // "Final" price = discounted price + tax on discounted amount.
    // tax is applied AFTER discount in this demo.
    const discounted = this.getDiscountedPrice(p);
    const taxAmount = (discounted * p.taxPercent) / 100;
    return discounted + taxAmount;
  }

  // INVENTORY / STATUS HELPERS
  // Purpose: Keep stock rules consistent across the app.
  getAvailabilityLabel(p: Product): 'In Stock' | 'Low Stock' | 'Out of Stock' {
    // Decide inventory label based on stockQty and reorderLevel.
    // - Out of Stock: 0 or below
    // - Low Stock: above 0 but at/under reorder level
    // - In Stock: healthy quantity
    if (p.stockQty <= 0) return 'Out of Stock';
    if (p.stockQty <= p.reorderLevel) return 'Low Stock';
    return 'In Stock';
  }

  isLowStock(p: Product): boolean {
    // Low stock means the item exists but is nearing reorder threshold.
    return p.stockQty > 0 && p.stockQty <= p.reorderLevel;
  }

  // SEARCH / FILTER / SORT
  // These are "query" operations used by the dashboard UI.
  search(term: string): Product[] {
    // Case-insensitive search across commonly searched fields.
    const q = term.trim().toLowerCase();
    if (!q) return this.getAll();

    return this.products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    );
  }

  filterByCategory(category: Product['category'] | 'All'): Product[] {
    // If user selects "All", return full list.
    if (category === 'All') return this.getAll();

    // Otherwise keep only matching category items.
    return this.products.filter(p => p.category === category);
  }

  filterByStock(status: 'All' | 'InStock' | 'LowStock' | 'OutOfStock'): Product[] {
    // 1) If user chooses "All", no filtering is needed.
    if (status === 'All') return this.getAll();

    // 2) Otherwise, keep only those products that match the selected stock condition.
    return this.products.filter(p => {
      switch (status) {

        case 'InStock':
          // In Stock = quantity is ABOVE reorder level (healthy stock)
          return p.stockQty > p.reorderLevel;

        case 'LowStock':
          // Low Stock = quantity is positive but AT/BELOW reorder level
          return p.stockQty > 0 && p.stockQty <= p.reorderLevel;

        case 'OutOfStock':
          // Out of Stock = quantity is zero or less
          return p.stockQty <= 0;
      }
    });
  }

  sortBy(list: Product[], mode: 'name' | 'priceAsc' | 'priceDesc' | 'ratingDesc'): Product[] {
    // Always sort a COPY of the list.
    // This prevents unexpected side effects in the caller.
    const copy = [...list];

    switch (mode) {
      case 'name':
        // Sort alphabetically by product name (A → Z).
        // localeCompare is safer for string comparisons (handles casing/mixed-case strings).
        return copy.sort((a, b) => a.name.localeCompare(b.name));

      case 'priceAsc':
        // Sort products by FINAL price (not base price), from lowest to highest.
        // Final price is calculated using centralized pricing logic (discount + tax), ensuring consistency across the app. 
        return copy.sort((a, b) => this.getFinalPrice(a) - this.getFinalPrice(b));

      case 'priceDesc':
        // Sort by "final payable price" from high → low.
        // Reverse of priceAsc by swapping the subtraction order.
        return copy.sort((a, b) => this.getFinalPrice(b) - this.getFinalPrice(a));

      case 'ratingDesc':
        // Sort by rating from highest → lowest (e.g., 4.8 first, 3.9 later).
        return copy.sort((a, b) => b.rating - a.rating);
    }
  }

  // DASHBOARD SUMMARY (KPIs)
  // Calculates summary metrics for the currently visible list.
  getSummary(list: Product[]) {
    // Key Performance Indicator calculated from the list being displayed.
    const total = list.length;
    const active = list.filter(p => p.isActive).length;

    // Useful for additional KPI if you want to show it later.
    const outOfStock = list.filter(p => p.stockQty <= 0).length;

    // Low stock based on business rule helper (consistent).
    const lowStock = list.filter(p => this.isLowStock(p)).length;

    // Inventory value
    // finalPrice * availableQty, ignoring negative quantities.
    const inventoryValue = list.reduce((sum, p) => {
      return sum + (this.getFinalPrice(p) * Math.max(p.stockQty, 0));
    }, 0);

    return { total, active, outOfStock, lowStock, inventoryValue };
  }
}
