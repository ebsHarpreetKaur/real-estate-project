import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView, StyleSheet, Button, Text, StatusBar, Alert, ActivityIndicator, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { checkVerification } from "../../api/context/verify";
// import OTPInputView from "@twotalltotems/react-native-otp-input";
// import { OTPInputView } from '@react-native-otp-inputs/otp-input';
import OtpInputs from 'react-native-otp-inputs';

import * as SecureStore from 'expo-secure-store';
import AuthContext from "../../api/context/Context";
import { today } from "../../api/context/auth";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import RazorpayCheckout from 'react-native-razorpay';
import { TouchableHighlight } from "react-native";
import axios from "axios";
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

  // useEffect(() => {
  //   const fetch_payment_status = async () => {
  //     try {
  //       const response = await axios.get(`http://127.0.0.1:8000/api/user/mobile/${phoneNumber}`);
  //       console.log("res.....", response)
  //       setUserData(response.data);
  //       // if (!response.data) {
  //       //   setisLoading(true)
  //       // }
  //     } catch (error) {
  //       console.error('Error fetching payment:', error);
  //     }
  //   };
  //   fetch_payment_status();
  // }, [phoneNumber]);

  const user = [
    {
      "mobile": 4675336343,
      "otp_status": true,
      "user_location": [
        {
          "coords": {
            "speed": -1,
            "longitude": 76.69112317715411,
            "latitude": 30.71134927265382,
            "accuracy": 16.965582688710988,
            "heading": -1,
            "altitude": 318.2151985168457,
            "altitudeAccuracy": 7.0764055252075195
          },
          "timestamp": 1709037095653.2131
        }
      ],
      "status": true,
      "email": "g@gmail.co",
      "user_pincode": 3953553,
      "name": "hhs",
      "payment_res": [
        {
          "acquirer_data":
          {
            "rrn": "769255470364",
            "upi_transaction_id": "B15ED4C29A80128921A45D11D56D082C"
          },
          "amount": 100,
          "amount_refunded": 0,
          "bank": null,
          "captured": true,
          "card_id": null,
          "contact": "+919191919191",
          "created_at": 1710414058,
          "currency": "INR",
          "description": "Credits towards consultation",
          "email": "void@razorpay.com",
          "entity": "payment",
          "error_code": null,
          "error_description": null,
          "error_reason": null,
          "error_source": null,
          "error_step": null,
          "fee": 2,
          "id": "pay_NmD9sdUkyhhk45",
          "international": false,
          "invoice_id": null,
          "method": "upi",
          "notes": [],
          "order_id": null,
          "refund_status": null,
          "reward": null,
          "status": "captured",
          "tax": 0,
          "upi": { "vpa": "success@razorpay" },
          "vpa": "success@razorpay",
          "wallet": null
        }
      ],
      "payment_status": true,
      "updated_at": "2024-03-13T10:20:01.745000Z",
      "created_at": "2024-03-13T10:20:01.745000Z",
      "_id": "65f17dd17dee41026b0bd1a2"
    },

  ]
  console.log("user", user[0])
  const handleCodeVerification = useCallback(
    (code) => {
      checkVerification(phoneNumber, code).then((success) => {
        // if (!success) {
        //   console.log("wrong code")
        //   setInvalidCode(true)
        // } else {
        console.log("otp status", success)
        if (user.length === 0 || null) {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'warning',
            textBody: 'Please complete your payment.',
            button: 'close',
          })
          navigation.navigate("CheckAuthCredentials", {
            params: {
              phoneNumber: formattedValue,
              otp_status: success
            },
          });
        } else {
          if (
            user[0]?.payment_status === false
          ) {
            Dialog.show({
              type: ALERT_TYPE.WARNING,
              title: 'warning',
              textBody: 'Payment pending...',
              button: 'close',
            })
            navigation.navigate("CheckAuthCredentials", {
              params: {
                phoneNumber: formattedValue,
                otp_status: success
              },
            });
          } else {
            // fetch('http://127.0.0.1:8000/api/user/login', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({
            // "mobile":4675336343,
            // "status":true,
            // "otp_status":true,
            // "user_pincode":3953553,
            // "name":"hhs",
            // "payment_status":true,
            // "payment_res":[
            //     {
            //         "amount": 100.00,
            //         "currency": "USD",
            //         "card_number": "4111111111111111",
            //         "card_exp_month": "12",
            //         "card_exp_year": "2025",
            //         "card_cvv": "123",
            //         "billing_address": {
            //             "line1": "123 Billing St",
            //             "line2": "",
            //             "city": "Billing City",
            //             "state": "CA",
            //             "postal_code": "12345",
            //             "country": "US"
            //         },
            //         "customer_name": "John Doe",
            //         "customer_email": "john.doe@example.com",
            //         "customer_phone": "+1234567890",
            //         "description": "Payment for order #12345",
            //         "metadata": {
            //             "order_id": "12345",
            //             "customer_id": "67890"
            //         }
            //     }
            // ],

            // "email":"g@gmail.co",
            //     "user_location": [
            //             {
            //                 "coords": {
            //                     "speed": -1,
            //                     "longitude": 76.69112317715411,
            //                     "latitude": 30.71134927265382,
            //                     "accuracy": 16.965582688710988,
            //                     "heading": -1,
            //                     "altitude": 318.2151985168457,
            //                     "altitudeAccuracy": 7.0764055252075195
            //                 },
            //                 "timestamp": 1709037095653.2131
            //             }
            //         ]
            //     // expiresInMins: 60, // optional
            //   })
            // })
            //   .then(res => res.json())
            //   .then(res => {
            //     console.log(res, "res........")

            // if (res) {

            const login_res = [
              {
                "message": "User logged in successfully",
                "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzEwNTAzMTM3LCJleHAiOjE3MTA1MDY3MzcsIm5iZiI6MTcxMDUwMzEzNywianRpIjoiOHdLc0JRTGV1RW1TY2VuMyIsInN1YiI6IjY1ZjQxMTAzOWU0N2NhOTdiYzA5NWFhMiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.kUu8onNc5GS3DfVF3zo4zBFTtzD2pKCNAaeygDBzFcU",
                "user": {
                  "_id": "65f411039e47ca97bc095aa2",
                  "mobile": 4675336343,
                  "otp_status": true,
                  "user_location": [
                    {
                      "coords": {
                        "speed": -1,
                        "longitude": 76.69112317715411,
                        "latitude": 30.71134927265382,
                        "accuracy": 16.965582688710988,
                        "heading": -1,
                        "altitude": 318.2151985168457,
                        "altitudeAccuracy": 7.0764055252075195
                      },
                      "timestamp": 1709037095653.2131
                    }
                  ],
                  "status": true,
                  "email": "g@gmail.co",
                  "user_pincode": 3953553,
                  "name": "hhs",
                  "payment_res": [
                    {
                      "amount": 100,
                      "currency": "USD",
                      "card_number": "4111111111111111",
                      "card_exp_month": "12",
                      "card_exp_year": "2025",
                      "card_cvv": "123",
                      "billing_address": {
                        "line1": "123 Billing St",
                        "line2": null,
                        "city": "Billing City",
                        "state": "CA",
                        "postal_code": "12345",
                        "country": "US"
                      },
                      "customer_name": "John Doe",
                      "customer_email": "john.doe@example.com",
                      "customer_phone": "+1234567890",
                      "description": "Payment for order #12345",
                      "metadata": {
                        "order_id": "12345",
                        "customer_id": "67890"
                      }
                    }
                  ],
                  "payment_status": true,
                  "updated_at": "2024-03-15T09:12:35.474000Z",
                  "created_at": "2024-03-15T09:12:35.474000Z"
                },
                "token_type": "Bearer",
                "expires_in": 3600
              }
            ]
            const modifiedResponse = {
              ...login_res,

            }
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
              .catch(error => {
                console.error('Error storing object:', error);
              });

            // }

            // });
          }
        }

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
        //     <ActivityIndicator size="large" color="#20B2AA" />
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
                style={{ color: "#20B2AA" }}
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







