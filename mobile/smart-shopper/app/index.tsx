import React, {useState} from 'react';
import AppHeader from '../components/AppHeader';
import {View, ScrollView, Text, TextInput, StyleSheet, Button} from 'react-native';

const Index = () => {

  const [query, setQuery] = useState('');
  const [cardEmpty, setCardEmpty] = useState(true);
  const [cart, setCart] = useState<string[]>([]);

  function addItem(item: string){
    if (cardEmpty){
      setCardEmpty(false);
    }
    if (item.trim()){
      setCart(cart.concat(item.trim()));
      setQuery('');
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
    <View>
      <View>
        <AppHeader />
      </View>

      <ScrollView>
        <Text>Add groceries:</Text>
        <TextInput 
          style={inputStyle.inputField}
          placeholder='Add Grocery'
          value={query}
          onChangeText={(e) => setQuery(e)}
        />
        <Button title='Add' onPress={() =>{addItem(query)}}/>

        {cardEmpty && cart.length === 0 && (
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
                <Button title='Remove Item' onPress={()=>{removeItem(index)}}/>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const inputStyle = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    color: 'black',
  }
})
export default Index;