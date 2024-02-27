import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { Avatar, Button, Card, Divider, Text } from 'react-native-paper';
import AppBar from '../Components/AppBar';
import { useEffect, useLayoutEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../api/context/Context';
import { ScrollView, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const LeftContent = props => <Avatar.Icon {...props} icon="account-supervisor" />
const LeftContent1 = props => <Avatar.Icon {...props} icon="power-settings" />

const LeftContent2 = props => <Avatar.Icon {...props} icon="package-variant-closed" />



export default function AccountTab() {
  const navigation = useNavigation()
  const { signOut } = React.useContext(AuthContext);


  const handleSignOut = () => {
    const auth_user = SecureStore.getItem('auth_user')
    // console.log("auth_user", auth_user)
    SecureStore.deleteItemAsync('auth_user')
    signOut()

  }
  return (
    <>


      <AppBar />
      <Button onPress={() => {
        handleSignOut()

      }}>Sign out</Button>
      <ScrollView style={{ padding: 5, backgroundColor: "#ffffff" }}>


        <Card style={{ backgroundColor: "#ffffff", shadowOpacity: 0 }}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Card.Title title="Change Password" subtitle="" left={LeftContent} style={{ width: "80%" }} />
            {/* <MaterialCommunityIcons name="arrow-right" color='#336aea' size={25} style={{ margin: 5, marginTop: '5%' }} /> */}
          </View>
          <Divider />
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Card.Title title="Sign out" subtitle="" left={LeftContent1} style={{ width: "80%" }} />
            {/* <MaterialCommunityIcons name="arrow-right" color='#336aea' size={25} style={{ margin: 5, marginTop: '5%' }} /> */}
          </View>
          <Divider />

          {/* <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Card.Title title="Orders & Packages" subtitle="Privacy and signout" left={LeftContent2} style={{ width: "80%" }} />
            <MaterialCommunityIcons name="arrow-right" color='#336aea' size={25} style={{ margin: 5, marginTop: '5%' }} />
          </View> */}
          {/* <Card.Actions>
          <Button>Cancel</Button>
        </Card.Actions> */}
        </Card>

      </ScrollView>

    </>
  );
}

