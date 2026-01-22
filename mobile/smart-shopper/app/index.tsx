import React, {useState} from 'react';
import AppHeader from '../components/AppHeader';
import {View, ScrollView} from 'react-native';
import { GroceryInput } from '@/components/GroceryInput';
import '../global.css';
import { searchGroceries } from '@/services/groceryService';
import { GroceryCart } from '@/components/GroceryCart';
import { ShoppingListItem, ShoppingList } from '@/types/grocery';

const Index = () => {

  const [cartEmpty, setCartEmpty] = useState(true);
  const [cart, setCart] = useState<ShoppingListItem[]>([]);

  async function addItem(itemName: string){
    
    // Check for duplicates
    const exists = cart.some(
      item => item.name.toLowerCase() === itemName.toLowerCase()
    );
    
    if (exists) {
      console.log(`Item: ${itemName} already added to cart`);
      return;
    }

    if (!itemName.trim()){
      return;
    }

    try {
      const result = await searchGroceries({ query: itemName, limit: 1 });
      
      if (result.items.length > 0) {
        const groceryItem = result.items[0];
        const newItem: ShoppingListItem = {
          ...groceryItem,
          checked: false,
          addedAt: new Date(),
        };
        
        setCart(prev => [newItem, ...prev]);
        setCartEmpty(false);
        
        if (groceryItem.cheapestPrice) {
          console.log(
            `Added ${groceryItem.name} — Best price $${groceryItem.cheapestPrice.price.toFixed(2)} at ${groceryItem.cheapestPrice.storeName}`
          );
        } else {
          console.log(`Added ${groceryItem.name}`);
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
        
        setCart(prev => [customItem, ...prev]);
        setCartEmpty(false);
        console.log(`Added ${itemName} — No price data available`);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }

  function removeItem(groceryIndex: number){ 
    if (cart.length === 1) {
      setCartEmpty(true)
    }
    setCart([
      ...cart.slice(0, groceryIndex), 
      ...cart.slice(groceryIndex + 1)
    ]);
    
  }

  return (
    <View className='h-screen bg-white mt-12'>
      <View>
        <AppHeader />
      </View>

      <ScrollView keyboardShouldPersistTaps='handled'>
        <GroceryInput onAdd={addItem}/>

        <GroceryCart cart={cart} onRemove={removeItem} cartEmpty />
      </ScrollView>
    </View>
  );
};

export default Index;