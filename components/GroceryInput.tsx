import { Plus } from "lucide-react-native";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";


interface GroceryInputProps {
    onAdd: (itemName: string) => void;
}

export function GroceryInput({ onAdd }: GroceryInputProps){

    const [query, setQuery] = useState('');
    
    function handleAddItem(itemName: string) {
        onAdd(itemName);
        setQuery('');
    }

    return (
        <View className="flex flex-row m-2 p-2">
            <TextInput 
                className="placeholder-[#6e6d6d] bg-green-50 flex-1 align-middle rounded-md"
                placeholder='Add Grocery'
                value={query}
                onChangeText={(e) => setQuery(e)}
            />
            <Pressable onPress={() =>{handleAddItem(query)}} className="bg-green-200  rounded-md p-2 text-center align-bottom">
                <Plus color="#67b184"/>
            </Pressable>
        </View>    
    );


}