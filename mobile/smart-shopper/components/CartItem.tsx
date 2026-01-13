import { Text, View, Pressable } from "react-native";

interface CartItemProps {
    id: number;
    onRemove: (id: number) => void;
    item: string;
}

export function CartItem({ id, onRemove, item }: CartItemProps){

    return (
        <View>
            <Text key={id}>{id + ' ' + item}</Text>
            <Pressable onPress={()=>{onRemove(id)}}>
                <Text>Remove Item</Text>
            </Pressable>
        </View>
        
    );

}