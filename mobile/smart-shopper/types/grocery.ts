// Core grocery types for extensibility

export interface Store {
  id: string;
  name: string;
  logo?: string;
}

export interface StorePrice {
  storeId: string;
  storeName: string;
  price: number;
  unit: string;
  inStock: boolean;
  lastUpdated?: Date;
}

export interface GroceryItem {
  id: string;
  name: string;
  category?: string;
  quantity: number;
  unit: string;
  prices: StorePrice[];
  cheapestPrice?: StorePrice;
  averagePrice?: number;
  potentialSavings?: number;
}

export interface ShoppingListItem extends GroceryItem {
  checked: boolean;
  addedAt: Date;
  notes?: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingListItem[];
  createdAt: Date;
  updatedAt: Date;
  totalEstimate?: number;
  potentialSavings?: number;
}

// For future backend integration
export interface GrocerySearchParams {
  query: string;
  category?: string;
  limit?: number;
}

export interface GrocerySearchResult {
  items: GroceryItem[];
  totalCount: number;
}

// API response types for future C# backend
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: Date;
}

export interface PriceComparisonResult {
  itemId: string;
  itemName: string;
  prices: StorePrice[];
  cheapest: StorePrice;
  mostExpensive: StorePrice;
  averagePrice: number;
  savings: number;
}
