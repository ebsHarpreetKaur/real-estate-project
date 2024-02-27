import * as React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import AppBar from '../Components/AppBar';
import { TabView, SceneMap } from 'react-native-tab-view';

const AllChatRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ffffff' }} />
);

const BuyingChatRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ffffff' }} />
);
const SellingRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ffffff' }} />
);

const renderScene = SceneMap({
  allChat: AllChatRoute,
  buying: BuyingChatRoute,
  selling: SellingRoute,

});

export default function Chat() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'allChat', title: 'All' },
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

