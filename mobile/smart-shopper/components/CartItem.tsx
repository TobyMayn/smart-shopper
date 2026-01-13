import { Text, View, Pressable } from "react-native";
import { Trash2 } from "lucide-react-native";

interface CartItemProps {
    id: number;
    onRemove: (id: number) => void;
    item: string;
}

export function CartItem({ id, onRemove, item }: CartItemProps){

    return (
        <View className="flex flex-row m-2 p-2">
            <Text key={id} className="flex-1 align-middle">{item}</Text>
            <Pressable onPress={()=>{onRemove(id)}} className="bg-red-200 rounded-md p-2">
                <Trash2 color="#fb2c36"/>
            </Pressable>
        </View>
        
    );

}