// Mock grocery service - easily replaceable with C# backend API calls
import type { 
  GroceryItem, 
  StorePrice, 
  Store, 
  GrocerySearchParams,
  GrocerySearchResult,
  PriceComparisonResult 
} from '@/types/grocery';

// Mock stores data
const mockStores: Store[] = [
  { id: 'store-1', name: 'FreshMart' },
  { id: 'store-2', name: 'ValueGrocer' },
  { id: 'store-3', name: 'QuickStop' },
  { id: 'store-4', name: 'BudgetBuy' },
];

// Mock grocery database
const mockGroceryDatabase: Record<string, { category: string; unit: string; basePrices: Record<string, number> }> = {
  'milk': { category: 'Dairy', unit: 'gallon', basePrices: { 'store-1': 4.29, 'store-2': 3.99, 'store-3': 4.49, 'store-4': 3.79 } },
  'bread': { category: 'Bakery', unit: 'loaf', basePrices: { 'store-1': 3.49, 'store-2': 2.99, 'store-3': 3.29, 'store-4': 2.79 } },
  'eggs': { category: 'Dairy', unit: 'dozen', basePrices: { 'store-1': 5.99, 'store-2': 5.49, 'store-3': 6.29, 'store-4': 4.99 } },
  'butter': { category: 'Dairy', unit: 'lb', basePrices: { 'store-1': 4.99, 'store-2': 4.49, 'store-3': 5.29, 'store-4': 4.29 } },
  'cheese': { category: 'Dairy', unit: 'lb', basePrices: { 'store-1': 6.99, 'store-2': 5.99, 'store-3': 7.49, 'store-4': 5.49 } },
  'chicken': { category: 'Meat', unit: 'lb', basePrices: { 'store-1': 5.99, 'store-2': 4.99, 'store-3': 6.49, 'store-4': 4.49 } },
  'beef': { category: 'Meat', unit: 'lb', basePrices: { 'store-1': 8.99, 'store-2': 7.99, 'store-3': 9.49, 'store-4': 7.49 } },
  'salmon': { category: 'Seafood', unit: 'lb', basePrices: { 'store-1': 12.99, 'store-2': 11.49, 'store-3': 13.99, 'store-4': 10.99 } },
  'apples': { category: 'Produce', unit: 'lb', basePrices: { 'store-1': 2.49, 'store-2': 1.99, 'store-3': 2.79, 'store-4': 1.79 } },
  'bananas': { category: 'Produce', unit: 'lb', basePrices: { 'store-1': 0.69, 'store-2': 0.59, 'store-3': 0.79, 'store-4': 0.49 } },
  'oranges': { category: 'Produce', unit: 'lb', basePrices: { 'store-1': 1.99, 'store-2': 1.49, 'store-3': 2.29, 'store-4': 1.29 } },
  'tomatoes': { category: 'Produce', unit: 'lb', basePrices: { 'store-1': 2.99, 'store-2': 2.49, 'store-3': 3.29, 'store-4': 2.29 } },
  'lettuce': { category: 'Produce', unit: 'head', basePrices: { 'store-1': 2.49, 'store-2': 1.99, 'store-3': 2.79, 'store-4': 1.69 } },
  'onions': { category: 'Produce', unit: 'lb', basePrices: { 'store-1': 1.29, 'store-2': 0.99, 'store-3': 1.49, 'store-4': 0.89 } },
  'potatoes': { category: 'Produce', unit: 'lb', basePrices: { 'store-1': 0.99, 'store-2': 0.79, 'store-3': 1.19, 'store-4': 0.69 } },
  'rice': { category: 'Pantry', unit: 'lb', basePrices: { 'store-1': 2.49, 'store-2': 1.99, 'store-3': 2.79, 'store-4': 1.79 } },
  'pasta': { category: 'Pantry', unit: 'box', basePrices: { 'store-1': 1.99, 'store-2': 1.49, 'store-3': 2.29, 'store-4': 1.29 } },
  'cereal': { category: 'Pantry', unit: 'box', basePrices: { 'store-1': 4.49, 'store-2': 3.99, 'store-3': 4.99, 'store-4': 3.49 } },
  'coffee': { category: 'Beverages', unit: 'bag', basePrices: { 'store-1': 9.99, 'store-2': 8.49, 'store-3': 10.99, 'store-4': 7.99 } },
  'orange juice': { category: 'Beverages', unit: 'half-gallon', basePrices: { 'store-1': 4.99, 'store-2': 4.49, 'store-3': 5.49, 'store-4': 3.99 } },
};

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Search for grocery items - will be replaced with C# API call
 */
export async function searchGroceries(params: GrocerySearchParams): Promise<GrocerySearchResult> {
  await delay(300); // Simulate API latency
  
  const query = params.query.toLowerCase().trim();
  const matchingItems: GroceryItem[] = [];
  
  for (const [name, data] of Object.entries(mockGroceryDatabase)) {
    if (name.includes(query) || query.includes(name)) {
      const prices = buildStorePrices(data.basePrices);
      const cheapest = findCheapest(prices);
      const avgPrice = calculateAverage(prices);
      
      matchingItems.push({
        id: `item-${name}`,
        name: capitalizeFirst(name),
        category: data.category,
        quantity: 1,
        unit: data.unit,
        prices,
        cheapestPrice: cheapest,
        averagePrice: avgPrice,
        potentialSavings: avgPrice - (cheapest?.price || 0),
      });
    }
  }
  
  return {
    items: matchingItems.slice(0, params.limit || 10),
    totalCount: matchingItems.length,
  };
}

/**
 * Get price comparison for a specific item - will be replaced with C# API call
 */
export async function getPriceComparison(itemName: string): Promise<PriceComparisonResult | null> {
  await delay(200);
  
  const normalizedName = itemName.toLowerCase().trim();
  const data = mockGroceryDatabase[normalizedName];
  
  if (!data) return null;
  
  const prices = buildStorePrices(data.basePrices);
  const sorted = [...prices].sort((a, b) => a.price - b.price);
  const avgPrice = calculateAverage(prices);
  
  return {
    itemId: `item-${normalizedName}`,
    itemName: capitalizeFirst(normalizedName),
    prices,
    cheapest: sorted[0],
    mostExpensive: sorted[sorted.length - 1],
    averagePrice: avgPrice,
    savings: sorted[sorted.length - 1].price - sorted[0].price,
  };
}

/**
 * Get all available stores - will be replaced with C# API call
 */
export async function getStores(): Promise<Store[]> {
  await delay(100);
  return [...mockStores];
}

/**
 * Get suggestions for autocomplete - will be replaced with C# API call
 */
export async function getSuggestions(query: string): Promise<string[]> {
  await delay(100);
  
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  return Object.keys(mockGroceryDatabase)
    .filter(name => name.includes(normalizedQuery))
    .map(capitalizeFirst)
    .slice(0, 5);
}

// Helper functions
function buildStorePrices(basePrices: Record<string, number>): StorePrice[] {
  return Object.entries(basePrices).map(([storeId, price]) => ({
    storeId,
    storeName: mockStores.find(s => s.id === storeId)?.name || 'Unknown',
    price,
    unit: 'each',
    inStock: Math.random() > 0.1, // 90% in stock
    lastUpdated: new Date(),
  }));
}

function findCheapest(prices: StorePrice[]): StorePrice | undefined {
  const inStockPrices = prices.filter(p => p.inStock);
  if (inStockPrices.length === 0) return prices[0];
  return inStockPrices.reduce((min, p) => p.price < min.price ? p : min);
}

function calculateAverage(prices: StorePrice[]): number {
  if (prices.length === 0) return 0;
  const sum = prices.reduce((acc, p) => acc + p.price, 0);
  return Number((sum / prices.length).toFixed(2));
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
