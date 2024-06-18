import * as SecureStore from 'expo-secure-store';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
// console.log(today)
const REACT_NATIVE_BASE_URL = "https://hubuzztechnology.com/api/"
const REACT_NATIVE_IMAGE_URL = "https://hubuzztechnology.com/images/"
const REACT_NATIVE_PROPERTY_URL = "https://hubuzztechnology.com/"
const REACT_NATIVE_USER_PROFILE_URL = "https://hubuzztechnology.com/"

// const AuthUserData = AsyncStorage.getItem('auth_user');
// const parsedAuthUserData = JSON.parse(AuthUserData);

// var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzE0NjQ3NjA1LCJleHAiOjE3MTQ2NTEyMDUsIm5iZiI6MTcxNDY0NzYwNSwianRpIjoiU2tTSGZORzh2aVJRQ2F1WiIsInN1YiI6IjY2MzM1OWJhYTJjNThjYzM4YzAyM2EzMiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.jduiVBgc-tXk6B2ogN17MVTIcx_CLv6wFXY2F1fhe3M"



export {
  today,
  // token,
  REACT_NATIVE_BASE_URL,
  REACT_NATIVE_IMAGE_URL,
  REACT_NATIVE_PROPERTY_URL,
  REACT_NATIVE_USER_PROFILE_URL
}

