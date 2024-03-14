import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView, StyleSheet, Button, Text, StatusBar, Alert, ActivityIndicator, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { checkVerification } from "../../api/context/verify";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import * as SecureStore from 'expo-secure-store';
import AuthContext from "../../api/context/Context";
import { today } from "../../api/context/auth";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import RazorpayCheckout from 'react-native-razorpay';
import { TouchableHighlight } from "react-native";
import axios from "axios";

const Otp = ({ route }) => {
  const navigation = useNavigation()
  const phoneNumber = route?.params?.params?.phoneNumber;
  const [invalidCode, setInvalidCode] = useState(false);
  console.log("Number", phoneNumber)
  const [isloading, setisLoading] = useState(false)

  // const { signIn } = React.useContext(AuthContext);

  const [user, setUser] = useState(null);

  const [user_data, setUserData] = useState(null);

  useEffect(() => {
    const fetch_payment_status = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/mobile/${phoneNumber}`);
        console.log("res.....", response)
        setUserData(response.data);
        // if (!response.data) {
        //   setisLoading(true)
        // }
      } catch (error) {
        console.error('Error fetching payment:', error);
      }
    };
    fetch_payment_status();
  }, [phoneNumber]);


  const handleCodeVerification = useCallback(
    (code) => {
      checkVerification(phoneNumber, code).then((success) => {
        // if (!success) {
        //   console.log("wrong code")
        //   setInvalidCode(true)
        // } else {
        //   console.log("otp status", success)
        // if (!user_data) {
        // <ActivityIndicator />
        // } else {
        const static_payment_status = false
        if (
          // user_data?.payment_status === false
          static_payment_status === false
        ) {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'warning',
            textBody: 'Please complete your payment.',
            button: 'close',
          })
          navigation.navigate("CheckAuthCredentials")
          const modifiedResponse = {
            phoneNumber: phoneNumber,
            user: user_data,
            otp_status: success,
            static_payment_status: false
          }
          const user_object_string = JSON.stringify(modifiedResponse);

          // signIn({ 'auth_user': user_object_string })

        } else {
          fetch('http://127.0.0.1:8000/api/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "mobile": 4675333343,
              "status": user_data.status,
              "otp_status": success,
              "user_pincode": 3953553,
              "name": "hhs",
              "payment_status": user_data.payment_status,
              "payment_res": user_data.payment_res
              // expiresInMins: 60, // optional
            })
          })
            .then(res => res.json())
            .then(res => {
              console.log(res, "res........")
              const modifiedResponse = {
                ...res,
              };

              // console.log("modifiedResponse.......", modifiedResponse)
              // const user_object_string = JSON.stringify(modifiedResponse);

              if (res) {
                SecureStore.setItemAsync('auth_user', modifiedResponse)
                  .then(() => {
                    console.log('User stored successfully');
                    Toast.show({
                      type: ALERT_TYPE.SUCCESS,
                      title: 'Success',
                      textBody: 'Login successfully',
                    })
                    // signIn({ 'auth_user': modifiedResponse })

                    navigation.navigate("Otp", {
                      params: { phoneNumber: formattedValue },
                    });


                    // success && 
                    // navigation.navigate(" ", { screen: 'Home' });

                  })
                  .catch(error => {
                    console.error('Error storing object:', error);
                  });
              }

            });
        }
        // }

        // }


      })
    }
    , []
  );

  return (
    <>
      {
        isloading === true
          ?
          <View style={[styles.container_activity_indicator, styles.horizontal]}>
            <ActivityIndicator size="large" color="#20B2AA" />
          </View>

          :
          <>
            {/* <StatusBar
        animated={true}
        backgroundColor="#61dafb"

      /> */}

            <AlertNotificationRoot>

              <SafeAreaView style={styles.wrapper}>
                <Text style={styles.prompt}>Enter the code we sent you</Text>
                <Text style={styles.message}>
                  {`Your phone (${phoneNumber}) will be used to protect your account each time you log in.`}
                </Text>



                <Button
                  style={{ color: "#20B2AA" }}
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
            </AlertNotificationRoot>

          </>

      }
    </>


  );
};

const styles = StyleSheet.create({
  container_activity_indicator: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
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







