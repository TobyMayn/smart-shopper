import {View, Pressable, Text} from 'react-native';
import { CartItem } from './CartItem';
import { ShoppingListItem } from '@/types/grocery';

interface GroceryCartProps {
    cart: ShoppingListItem[];
    onRemove: (id: number) => void;
    cartEmpty: boolean;

}

export function GroceryCart({cart, onRemove, cartEmpty}: GroceryCartProps) {
    // Calculate totals
  const totalCheapest = cart.reduce((sum, item) => {
    return sum + (item.cheapestPrice?.price || 0) * item.quantity;
  }, 0);

  const totalSavings = cart.reduce((sum, item) => {
    return sum + (item.potentialSavings || 0) * item.quantity;
  }, 0);

    return (
        <View>
            <View className='flex flex-row m-2 p-2'>
                <Text className='flex-1'>Total: {totalCheapest.toFixed(2)}$</Text>
                <Text className='flex-1'>Savings: {totalSavings.toFixed(2)}$</Text>
            </View>
            {cartEmpty && cart.length === 0 && (
                <View className='flex items-center'>
                    <Text className='italic'>Card is empty</Text>
                    <Text className='italic'>Add items to the cart</Text>
                </View>
            )}
            {cart.length > 0 && (
                <View>
                {cart.map((item, index) => (
                    <View key={index}>
                        <CartItem id={index} onRemove={onRemove} item={item}/>
                    </View>
                ))}
                </View>
            )}
        </View>
        
    );


}