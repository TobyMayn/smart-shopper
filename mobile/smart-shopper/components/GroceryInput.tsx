import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

interface GroceryInputProps {
    onAdd: (itemName: string) => void;
}

export function GroceryInput({onAdd}: GroceryInputProps){

    const [query, setQuery] = useState('');
    
    function handleAddItem(itemName: string) {
        onAdd(itemName);
        setQuery('');
    }

    return (
        <View>
            <Text>Add groceries:</Text>
            <TextInput 
                placeholder='Add Grocery'
                value={query}
                onChangeText={(e) => setQuery(e)}
            />
            <Pressable onPress={() =>{handleAddItem(query)}}>
                <Text>Add</Text>
            </Pressable>
        </View>    
    );


}