export interface Product {
  // Unique identifier (usually from DB primary key)
  id: number;

  // Display name shown in the UI
  name: string;

  // Stock Keeping Unit (unique product code used for tracking/inventory)
  sku: string;

  // Manufacturer / brand name (useful for filtering & search)
  brand: string;

  // Product category (restricted to allowed values for type safety)
  category: 'Electronics' | 'Mobiles' | 'Accessories' | 'Appliances';

  // Base price before any discount/tax (MRP or base selling price)
  basePrice: number;

  // Discount percentage applied on basePrice (e.g., 10 means 10% off)
  discountPercent: number;

  // Tax percentage applied after discount (GST examples: 0, 5, 12, 18, 28)
  taxPercent: number;

  // Current available quantity in stock
  stockQty: number;

  // Minimum safe stock level; at/below this value the item is considered "Low Stock"
  reorderLevel: number;

  // Whether the product is available for sale/listing in the app
  isActive: boolean;

  // Customer rating score (0 to 5)
  rating: number;

  // Created date/time stored as an ISO string for demo (e.g., '2026-02-05')
  createdOn: string;
}
