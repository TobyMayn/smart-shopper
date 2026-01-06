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
    setCart(cart.concat(item.trim()));
  }
  return (
    <View>
      <View>
        <AppHeader />
      </View>

      <ScrollView>
        <Text>Add grocery:</Text>
        <TextInput 
          style={inputStyle.inputField}
          placeholder='Add Grocery'
          value={query}
          onChangeText={(e) => setQuery(e)}
        />
        <Button title='Add' onPress={() =>{addItem(query)}}/>Add

      {cardEmpty && cart.length === 0 && (
        <View>
          <Text>Card is empty</Text>
          <Text>Add items to the card</Text>
        </View>
      )}
      {cart.length > 0 && (
        <View>
          {cart.map((item, index) => (
          <Text key={index}>{index + ' ' + item}</Text>
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