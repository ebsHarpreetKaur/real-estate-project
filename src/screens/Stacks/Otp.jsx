import React, { useState, useCallback } from "react";
import { SafeAreaView, StyleSheet, Button, Text, StatusBar } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { checkVerification } from "../../api/context/verify";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import * as SecureStore from 'expo-secure-store';
import AuthContext from "../../api/context/Context";
import { today } from "../../api/context/auth";

const Otp = ({ route }) => {
  const navigation = useNavigation()
  const phoneNumber = route?.params?.params?.phoneNumber;
  const [invalidCode, setInvalidCode] = useState(false);
  console.log("Number", phoneNumber)

  const { signIn } = React.useContext(AuthContext);

  const handleCodeVerification = useCallback(
    (code) => {
      checkVerification(phoneNumber, code).then((success) => {

        // if (!success) {
        //   console.log("wrong code")
        //   setInvalidCode(true)
        // } else {
        //   try {
        // console.log("phone verified state...", success)
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                username: 'kminchelle',
                password: '0lelplR',
                // expiresInMins: 60, // optional
            })
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res,"res........")
                const modifiedResponse = {
                    ...res,
                    profile_complete_status: false,
                    // is_phone_verified: true
                };

                // console.log("modifiedResponse.......", modifiedResponse)
                const user_object_string = JSON.stringify(modifiedResponse);
                if (res) {
                    SecureStore.setItemAsync('auth_user', user_object_string)
                        .then(() => {
                            console.log('User stored successfully');
                            signIn({ 'auth_user': modifiedResponse })

                            navigation.navigate("UserProfile");

                            // success && 
                            // navigation.navigate(" ", { screen: 'Home' });

                        })
                        .catch(error => {
                            console.error('Error storing object:', error);
                        });
                }

            });

        // } catch (e) {
        //   console.log("error while saving in async storage...")
        // }

        // }
      })
    }
    , []
  );

  return (
    <>
      {/* <StatusBar
        animated={true}
        backgroundColor="#61dafb"

      /> */}
      <SafeAreaView style={styles.wrapper}>
        <Text style={styles.prompt}>Enter the code we sent you</Text>
        <Text style={styles.message}>
          {`Your phone (${phoneNumber}) will be used to protect your account each time you log in.`}
        </Text>
        <Button
          title="Edit Phone Number"
          onPress={() => navigation.navigate("Login")}
        />
        <OTPInputView
          style={{ width: "80%", height: 200 }}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={handleCodeVerification}
        />
        {invalidCode && <Text style={styles.error}>Incorrect code.</Text>}
      </SafeAreaView>
    </>

  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "black",
    fontSize: 20,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  prompt: {
    fontSize: 24,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },

  message: {
    fontSize: 16,
    paddingHorizontal: 30,
  },

  error: {
    color: "red",
  },
});

export default Otp;