import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView, StyleSheet, Button, Text, StatusBar, Alert, ActivityIndicator, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { checkVerification } from "../../api/context/verify";
// import OTPInputView from "@twotalltotems/react-native-otp-input";
// import { OTPInputView } from '@react-native-otp-inputs/otp-input';
import OtpInputs from 'react-native-otp-inputs';
import * as Updates from 'expo-updates';

import * as SecureStore from 'expo-secure-store';
import AuthContext from "../../api/context/Context";
import { REACT_NATIVE_BASE_URL, today, token } from "../../api/context/auth";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import RazorpayCheckout from 'react-native-razorpay';
import { TouchableHighlight } from "react-native";
import axios from "axios";
// import { theme_color } from "../../../config";
// import { Clipboard } from 'react-native';
// import Clipboard from '@react-native-clipboard/clipboard';


//"@react-native-community/clipboard": "^1.5.1",



const Otp = ({ route }) => {
  const navigation = useNavigation()
  const phoneNumber = route?.params?.params?.phoneNumber;
  const [invalidCode, setInvalidCode] = useState(false);
  console.log("Number", phoneNumber)
  const [isloading, setisLoading] = useState(false)

  // const { signIn } = React.useContext(AuthContext);


  const [user_data, setUserData] = useState(null);
  let phoneNumberWithoutCountryCode = phoneNumber.replace(/^(\+91)/, '');

  useEffect(() => {
    fetch_payment_status();
  }, [phoneNumber]);

  const fetch_payment_status = async () => {
    try {
      const response = await axios.get(`${REACT_NATIVE_BASE_URL}user/mobile/${phoneNumberWithoutCountryCode}`, {
        headers: {
          "Accept": 'application/json',
          'content-type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      });
      // console.log("paym res", response?.data?.user)

      setUserData(response?.data?.user);
      // if (!response.data) {
      //   setisLoading(true)
      // }
    } catch (error) {
      console.error('Error fetching payment:', error);
    }
  };



  // console.log("res.....HERREEEEE", user_data)

  const handleCodeVerification = useCallback(
    (code) => {
      checkVerification(phoneNumber, code).then((success) => {
        // if (!success) {
        //   console.log("wrong code")
        //   setInvalidCode(true)
        // } else {
        // console.log("user_data", user_data)

        axios.get(`${REACT_NATIVE_BASE_URL}user/mobile/${phoneNumberWithoutCountryCode}`, {
          headers: {
            "Accept": 'application/json',
            'content-type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
        })
          .then((response) => {
            if (response) {
              if (response?.data?.user === null || response?.data?.user === undefined) {
                Toast.show({
                  type: ALERT_TYPE.WARNING,
                  title: 'warning',
                  textBody: 'Please wait...',
                })
                navigation.navigate("CheckAuthCredentials", {
                  params: {
                    phoneNumber: phoneNumberWithoutCountryCode,
                    otp_status: success
                  },
                });

              } else {
                console.log("hereeeee?", response?.data?.user)
                if (response?.data?.user?.payment_status === false || response?.data?.user?.payment_status == "" || response?.data?.user?.payment_status == undefined) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'warning',
                    textBody: 'Payment pending...',
                  })
                  navigation.navigate("CheckAuthCredentials", {
                    params: {
                      phoneNumber: phoneNumberWithoutCountryCode,
                      otp_status: success
                    },
                  });
                } else {
                  axios.post(`${REACT_NATIVE_BASE_URL}login`, {
                    mobile: phoneNumberWithoutCountryCode,
                    otp_status: success,
                    user_location: response?.data?.user?.user_location,
                    status: response?.data?.user?.status,
                    payment_res: response?.data?.user?.payment_res,
                    payment_status: response?.data?.user?.payment_status
                  }, {
                    headers: {
                      "Accept": 'application/json',
                      'content-type': 'application/json',
                    },
                  })
                    .then(function (response) {
                      console.log("login response - - -", response?.data);
                      const modifiedResponse = response?.data
                      const user_object_string = JSON.stringify(modifiedResponse);

                      SecureStore.setItemAsync('auth_user', user_object_string)
                        .then(() => {
                          console.log('User stored successfully');
                          Toast.show({
                            type: ALERT_TYPE.SUCCESS,
                            title: 'Success',
                            textBody: 'Login successfully',
                          })

                          navigation.navigate("Home", {
                            params: {
                              modifiedResponse: modifiedResponse
                            },
                          });

                        })
                    })
                    .catch(function (error) {
                      console.log("error - - -", error);
                    })

                    .catch(error => {
                      console.error('Error storing object:', error);
                    });

                  // }

                  // });
                }
              }
            }
          })
          .catch((err) => {
            console.log("Err", err)
          })
        // console.log("paym res", response?.data?.user)

        // if (!response.data) {
        //   setisLoading(true)
        // }






        // }


      })
    }
    , []
  );

  return (
    <>
      {
        // isloading === true
        //   ?
        //   <View style={[styles.container_activity_indicator, styles.horizontal]}>
        // <ActivityIndicator size="large" color={theme_color} />
        //   </View>

        //   :
        <>
          {/* <StatusBar
        animated={true}
        backgroundColor="#61dafb"
r
      /> */}

          <AlertNotificationRoot>

            <SafeAreaView style={styles.wrapper}>
              <Text style={styles.prompt}>Enter the code we sent you</Text>
              <Text style={styles.message}>
                {`Your phone (${phoneNumber}) will be used to protect your account each time you log in.`}
              </Text>



              <Button
                style={{ color: "#0066b2" }}
                title="Edit Phone Number"
                onPress={() => navigation.navigate("Login")}
              />

              {/* <OTPInputView
                style={{ width: "80%", height: 200 }}
                pinCount={6}
                autoFocus={true}
                // autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={handleCodeVerification}
              /> */}
              <OtpInputs
                style={{ color: "red", borderColor: "green" }}
                autoFocus={true}
                handleChange={(code) => handleCodeVerification(code)}
                numberOfInputs={6}
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







