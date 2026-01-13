import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

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
                className="placeholder-[#6e6d6d] flex-1 align-middle border-1 rounded-md"
                placeholder='Add Grocery'
                value={query}
                onChangeText={(e) => setQuery(e)}
            />
            <Pressable onPress={() =>{handleAddItem(query)}} className="border-1 rounded-md p-2 text-center align-bottom">
                <Text>Add</Text>
            </Pressable>
        </View>    
    );


}