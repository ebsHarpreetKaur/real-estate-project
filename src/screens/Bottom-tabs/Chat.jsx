import * as React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import AppBar from '../Components/AppBar';
import { useEffect, useLayoutEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Button } from 'react-native-paper';

const AllChatRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ffffff' }} />
);

const BuyingRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ffffff' }} />
);
const handleSellProperty = () => {

}
const SellingRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
    <Button onPress={handleSellProperty}>
      Start Selling
    </Button>
  </View>
);
const renderScene = SceneMap({
  All: AllChatRoute,
  buying: BuyingRoute,
  selling: SellingRoute,
});

export default function ChatTab() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'All', title: 'All' },
    { key: 'buying', title: 'Buying' },
    { key: 'selling', title: 'Selling' },

  ]);

  return (

    <>


      <AppBar />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />


    </>

  );
}

