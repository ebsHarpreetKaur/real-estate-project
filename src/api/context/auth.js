import * as SecureStore from 'expo-secure-store';
import React from 'react';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
// console.log(today)
const REACT_NATIVE_BASE_URL = "https://hubuzztechnology.com/api/"
const REACT_NATIVE_IMAGE_URL = "https://hubuzztechnology.com/images/"


var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2h1YnV6enRlY2hub2xvZ3kuY29tL2FwaS9sb2dpbiIsImlhdCI6MTcxNDU0Njg3OSwiZXhwIjoxNzE0NTUwNDc5LCJuYmYiOjE3MTQ1NDY4NzksImp0aSI6IjhuRGluZjV0bVRnelJOTVciLCJzdWIiOiI2NjI5ZjNiNWNiOTM0ZWUxZmIwYjJjNDIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Bzvspq1NBkoLnXj1K3jFalvHHiJUr14bLgVbi8t4lbI"



export {
  today,
  token,
  REACT_NATIVE_BASE_URL,
  REACT_NATIVE_IMAGE_URL
}