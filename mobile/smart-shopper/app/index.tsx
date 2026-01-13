import React, {useState} from 'react';
import AppHeader from '../components/AppHeader';
import {View, ScrollView} from 'react-native';
import { GroceryInput } from '@/components/GroceryInput';
import '../global.css';
import { GroceryCart } from '@/components/GroceryCart';

const Index = () => {

  const [cartEmpty, setCardEmpty] = useState(true);
  const [cart, setCart] = useState<string[]>([]);

  function addItem(item: string){
    
    if (item.trim()){
      if (cartEmpty){
        setCardEmpty(false);
      }
      setCart(cart.concat(item.trim()));
    }
  }

  function removeItem(groceryIndex: number){ 
    if (cart.length === 1) {
      setCardEmpty(true)
    }
    setCart([...cart.slice(0, groceryIndex), ...cart.slice(
    groceryIndex + 1)]);
    
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