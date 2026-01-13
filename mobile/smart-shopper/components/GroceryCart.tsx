import {View, Pressable, Text} from 'react-native';

interface GroceryCartProps {
    cart: string[],
    onRemove: (id: number) => void,
    cartEmpty: boolean

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
                        <Text key={index}>{index + ' ' + item}</Text>
                        <Pressable onPress={()=>{onRemove(index)}}>
                            <Text>Remove Item</Text>
                        </Pressable>
                    </View>
                ))}
                </View>
            )}
        </View>
        
    );


}