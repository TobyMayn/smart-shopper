import React from 'react';
import AppHeader from './components/AppHeader';
import {View, ScrollView, Text} from 'react-native';

const Index = () => {

  return (
    <View>
      <AppHeader />

      <ScrollView>
        <Text>Hello world! </Text>
      </ScrollView>

    </View>
  );
};

export default Index;