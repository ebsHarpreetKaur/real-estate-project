import { StyleSheet, Text, View } from 'react-native';
import AppBar from '../Components/AppBar';
import { useEffect, useLayoutEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Login from '../Components/Login';
import { isSignedIn } from '../../api/context/auth';

export default function CategoriesTab() {
  const navigation = useNavigation()


  return (
    <>
    
            <AppBar />
            <Text>CategoriesTab</Text>
     

    </>
  );
}

