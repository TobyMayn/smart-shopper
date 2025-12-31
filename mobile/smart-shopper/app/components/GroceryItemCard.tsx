import { TrendingDown, Store, ChevronDown, ChevronUp, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { ShoppingListItem } from '../types/grocery';

interface GroceryItemCardProps {
  item: ShoppingListItem;
  onRemove: (id: string) => void;
  animationDelay?: number;
}

export function GroceryItemCard({ item, onRemove, animationDelay = 0 }: GroceryItemCardProps) {
  const [expanded, setExpanded] = useState(false);

  const cheapest = item.cheapestPrice;
  const savings = item.potentialSavings || 0;
  const sortedPrices = [...item.prices].sort((a, b) => a.price - b.price);

  return (
    <div 
      className="bg-card rounded-lg border border-border/60 shadow-card overflow-hidden transition-card hover:shadow-card-hover animate-fade-in"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Main content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{item.name}</h3>
            {item.category && (
              <span className="text-xs text-muted-foreground">{item.category}</span>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Best price display */}
        {cheapest && (
          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold text-foreground">
                ${cheapest.price.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">/ {item.unit}</span>
            </div>
            
            {savings > 0 && (
              <Badge variant="secondary" className="bg-savings-light text-savings gap-1">
                <TrendingDown className="h-3 w-3" />
                Save ${savings.toFixed(2)}
              </Badge>
            )}
          </div>
        )}

        {/* Best store */}
        {cheapest && (
          <div className="mt-2 flex items-center gap-2">
            <Store className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Best at</span>
            <Badge variant="outline" className="font-medium">
              {cheapest.storeName}
            </Badge>
          </div>
        )}

        {/* Expand button */}
        {item.prices.length > 1 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-3 w-3" />
                Hide prices
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3" />
                Compare {item.prices.length} stores
              </>
            )}
          </button>
        )}
      </div>

      {/* Expanded price comparison */}
      {expanded && (
        <div className="border-t border-border/60 bg-muted/30">
          <div className="p-3 space-y-2">
            {sortedPrices.map((price, index) => (
              <div 
                key={price.storeId}
                className={`flex items-center justify-between py-1.5 px-2 rounded ${
                  index === 0 ? 'bg-savings-light' : ''
                }`}
              >
                <span className={`text-sm ${index === 0 ? 'font-medium text-savings' : 'text-foreground'}`}>
                  {price.storeName}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${
                    index === 0 ? 'text-savings' : 
                    index === sortedPrices.length - 1 ? 'text-price-high' : 'text-foreground'
                  }`}>
                    ${price.price.toFixed(2)}
                  </span>
                  {!price.inStock && (
                    <Badge variant="outline" className="text-xs py-0">
                      Out of stock
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
