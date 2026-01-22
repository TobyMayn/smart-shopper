import { Text, View, Pressable } from "react-native";
import { Trash2 } from "lucide-react-native";
import { ShoppingListItem } from "@/types/grocery";

interface CartItemProps {
    id: number;
    onRemove: (id: number) => void;
    item: ShoppingListItem;
}

export function CartItem({ id, onRemove, item }: CartItemProps){
    const cheapest = item.cheapestPrice;
    const savings = item.potentialSavings;
    return (
        <View className="flex flex-row m-2 p-2">
            <Text key={id} className="flex-1 align-middle">{item.name}</Text>
            {cheapest && (
                <Text className="flex-1 align-middle">{cheapest.price.toFixed(2)}$</Text>
            )}
            <Pressable onPress={()=>{onRemove(id)}} className="bg-red-200 rounded-md p-2">
                <Trash2 color="#fb2c36"/>
            </Pressable>
        </View>
        
    );

}