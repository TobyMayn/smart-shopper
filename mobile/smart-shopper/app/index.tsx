import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { AppHeader } from './components/AppHeader';
import { GroceryInput } from './components/GroceryInput';
import { GroceryList } from './components/GroceryList';
import { searchGroceries } from './services/groceryService';
import type { ShoppingListItem } from './types/grocery';

const Index = () => {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddItem = useCallback(async (itemName: string) => {
    // Check for duplicates
    const exists = items.some(
      item => item.name.toLowerCase() === itemName.toLowerCase()
    );
    
    if (exists) {
      toast.info(`${itemName} is already in your list`);
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await searchGroceries({ query: itemName, limit: 1 });
      
      if (result.items.length > 0) {
        const groceryItem = result.items[0];
        const newItem: ShoppingListItem = {
          ...groceryItem,
          checked: false,
          addedAt: new Date(),
        };
        
        setItems(prev => [newItem, ...prev]);
        
        if (groceryItem.cheapestPrice) {
          toast.success(
            `Added ${groceryItem.name} — Best price $${groceryItem.cheapestPrice.price.toFixed(2)} at ${groceryItem.cheapestPrice.storeName}`
          );
        } else {
          toast.success(`Added ${groceryItem.name}`);
        }
      } else {
        // Item not found in database, add as custom item
        const customItem: ShoppingListItem = {
          id: `custom-${Date.now()}`,
          name: itemName,
          quantity: 1,
          unit: 'item',
          prices: [],
          checked: false,
          addedAt: new Date(),
        };
        
        setItems(prev => [customItem, ...prev]);
        toast.info(`Added ${itemName} — No price data available`);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [items]);

  const handleRemoveItem = useCallback((id: string) => {
    setItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item) {
        toast.success(`Removed ${item.name}`);
      }
      return prev.filter(i => i.id !== id);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Input section */}
        <section>
          <GroceryInput onAdd={handleAddItem} isLoading={isLoading} />
        </section>

        {/* List section */}
        <section>
          <GroceryList 
            items={items} 
            onRemove={handleRemoveItem}
            isLoading={isLoading}
          />
        </section>
      </main>
    </div>
  );
};

export default Index;
