import { ShoppingCart, TrendingDown, DollarSign } from 'lucide-react-native';
import { GroceryItemCard } from './GroceryItemCard';
import type { ShoppingListItem } from '../types/grocery';

interface GroceryListProps {
  items: ShoppingListItem[];
  onRemove: (id: string) => void;
  isLoading?: boolean;
}

export function GroceryList({ items, onRemove, isLoading }: GroceryListProps) {
  // Calculate totals
  const totalCheapest = items.reduce((sum, item) => {
    return sum + (item.cheapestPrice?.price || 0) * item.quantity;
  }, 0);

  const totalSavings = items.reduce((sum, item) => {
    return sum + (item.potentialSavings || 0) * item.quantity;
  }, 0);

  if (items.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <ShoppingCart className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">Your list is empty</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Add items to compare prices across stores and find the best deals
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary card */}
      {items.length > 0 && (
        <div className="bg-card rounded-lg border border-border/60 p-4 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Estimated Total</p>
                <p className="text-xl font-semibold text-foreground">${totalCheapest.toFixed(2)}</p>
              </div>
            </div>
            
            {totalSavings > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-savings-light">
                <TrendingDown className="h-4 w-4 text-savings" />
                <div className="text-right">
                  <p className="text-xs text-savings/80">Potential Savings</p>
                  <p className="font-semibold text-savings">${totalSavings.toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Item count */}
      {items.length > 0 && (
        <p className="text-sm text-muted-foreground px-1">
          {items.length} item{items.length !== 1 ? 's' : ''} in your list
        </p>
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="bg-card rounded-lg border border-border/60 p-4 animate-pulse-soft">
              <div className="h-5 bg-muted rounded w-1/3 mb-3" />
              <div className="h-8 bg-muted rounded w-1/4 mb-2" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Items list */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <GroceryItemCard 
            key={item.id} 
            item={item} 
            onRemove={onRemove}
            animationDelay={index * 50}
          />
        ))}
      </div>
    </div>
  );
}
