// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBK7qFIIdl2cM90GiarGhri2kDQUfLap0k",
    authDomain: "react-native-video-conference.firebaseapp.com",
    projectId: "react-native-video-conference",
    storageBucket: "react-native-video-conference.appspot.com",
    messagingSenderId: "700174146894",
    appId: "1:700174146894:web:2469843e558ffa57d4d21f",
    measurementId: "G-KWQ0EX2D0C"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});