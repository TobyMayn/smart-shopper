import {View, Pressable, Text} from 'react-native';
import { CartItem } from './CartItem';

interface GroceryCartProps {
    cart: string[];
    onRemove: (id: number) => void;
    cartEmpty: boolean;

}

export function GroceryCart({cart, onRemove, cartEmpty}: GroceryCartProps) {

    return (
        <View>
            {cartEmpty && cart.length === 0 && (
                <View>
                    <Text>Card is empty</Text>
                    <Text>Add items to the cart</Text>
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