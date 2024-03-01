import * as SecureStore from 'expo-secure-store';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today =  yyyy + '-' + mm + '-' + dd;
// console.log(today)




export {
  today
}