import { useState, useCallback } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native'; // Added ScrollView and SafeAreaView
import { toast } from 'sonner-native';
import { AppHeader } from './components/AppHeader';
import { GroceryInput } from './components/GroceryInput';
import { GroceryList } from './components/GroceryList';
import { searchGroceries } from './services/groceryService';
import type { ShoppingListItem } from './types/grocery';

const Index = () => {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddItem = useCallback(async (itemName: string) => {
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
            `Added ${groceryItem.name} — Best price $${groceryItem.cheapestPrice.price.toFixed(2)}`
          );
        } else {
          toast.success(`Added ${groceryItem.name}`);
        }
      } else {
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
        toast.info(`Added ${itemName}`);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item');
    } finally {
      setIsLoading(false);
    }
  }, [items]);

  const handleRemoveItem = useCallback((id: string) => {
    setItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item) toast.success(`Removed ${item.name}`);
      return prev.filter(i => i.id !== id);
    });
  }, []);

  return (
    // flex-1 replaces min-h-screen for mobile
    <SafeAreaView className="flex-1 bg-background">
      <AppHeader />
      
      {/* ScrollView allows the list to scroll. 
          keyboardShouldPersistTaps="handled" ensures clicking suggestions 
          works even while the keyboard is open.
      */}
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Input section */}
        <View className="mb-6">
          <GroceryInput onAdd={handleAddItem} isLoading={isLoading} />
        </View>

        {/* List section */}
        <View>
          <GroceryList 
            items={items} 
            onRemove={handleRemoveItem}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;