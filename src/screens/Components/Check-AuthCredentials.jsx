import { Button, Keyboard, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import AppBar from './AppBar';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HelperText, TextInput } from 'react-native-paper';
import { today } from '../../api/context/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import RazorpayCheckout from 'react-native-razorpay';
import { ALERT_TYPE, Toast, Dialog } from 'react-native-alert-notification';
import { encode } from 'base-64';

export default function CheckAuthCredentials(data) {
    const user_data = data?.route?.params?.user[0]
    // console.log("user..........", data?.route?.params?.user[0])
    const navigation = useNavigation()
    const [user_location, setUserLocation] = useState('');
    const [reraNumber, setReraNumber] = useState('');
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [city, setCity] = useState('');



    useEffect(() => {
        (async () => {
            // SecureStore.deleteItemAsync('auth_user')
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            const cityName = await getCityName(latitude, longitude);
            setCity(cityName);
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    console.log("location.........", location)
    console.log("city.........", city)


    const getCityName = async (latitude, longitude) => {
        try {
            const location = await Location.reverseGeocodeAsync({ latitude, longitude });
            if (location && location.length > 0) {
                const { city } = location[0];
                return city;
            }
            return 'City not found';
        } catch (error) {
            console.error('Error fetching city:', error);
            return 'Error fetching city';
        }
    };


    const onChangeReraNumber = text => {
        setReraNumber(text)
    };


    const hasErrors = () => {
        if (!reraNumber) {
            return true;
        }
        return /[^0-9]/.test(reraNumber);
    };

    const handlePayNow = () => {
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.jpg',
            currency: 'INR',
            key: 'rzp_test_JrPSA1HqBRf4v8',
            // amount: parseFloat(options.amount) / 100,  //paise
            amount: '100',  //paise
            name: 'Unify',
            order_id: '',
            prefill: {
                email: '...',
                contact: '9191919191',
                name: 'Harpreet'
            },
            theme: { color: '#20B2AA' }
        }

        RazorpayCheckout.open(options).then((data) => {
            // Payment successful
            console.log("Payment success:", data);

            // Capture the payment
            fetch(`https://api.razorpay.com/v1/payments/${data.razorpay_payment_id}/capture`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + encode('rzp_test_JrPSA1HqBRf4v8:NT8BITofXhihkTmiZxe471FZ'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: options.amount,
                    currency: options.currency
                })
            }).then(response => response.json())
                .then(captureData => {
                    console.log("Capture details:", captureData);

                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: `Payment id : ${data.razorpay_payment_id}`,
                        textBody: 'Payment captured successfully',
                    });
                    navigation.navigate("Home")
                })
                .catch(error => {
                    console.error("Error capturing payment:", error);
                    alert('Error capturing payment');
                });
        }).catch((error) => {
            // Payment failed
            console.error("Payment error:", error);
            alert(`Error: ${error.code} | ${error.description}`);
        });



        // RazorpayCheckout.open(options).then((data) => {
        //     Dialog.show({
        //         type: ALERT_TYPE.SUCCESS,
        //         title:  `Payment id : ${data.razorpay_payment_id}`,
        //         textBody: 'Payment done successfully',
        //         button: 'close',
        //     });

        //     console.log("data", data)

        //     // alert(`Success: ${data.razorpay_payment_id}`);
        // }).catch((error) => {
        //     console.log("Err", error)
        //     alert(`Error: ${error.code} | ${error.description}`);
        // });
    }


    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"

            />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView style={styles.wrapper}>
                    <View style={styles.wrapForm}>

                        {/* <TextInput
                            style={{ height: 40, margin: 5, marginBottom: 20, backgroundColor: "#ffffff", padding: 5 }}
                            placeholder="RERA number"
                            onChangeText={newText => setReraNumber(newText)}
                            defaultValue={reraNumber}
                            right={<TextInput.Icon icon={() => <Icon name="document-text-outline" size={20} color="black" />} />}
                        /> */}

                        <Text>You have a pending payment of Rs. 500</Text>
                        <TouchableOpacity
                            style={styles.buttonPaynow}
                            onPress={() => {

                                // SecureStore.deleteItemAsync('auth_user') 
                                handlePayNow()

                            }}
                        >
                            <Text style={styles.buttonPayText}>Pay now</Text>
                        </TouchableOpacity>

                    </View>

                </SafeAreaView>


            </TouchableWithoutFeedback>

        </>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        // height: 60,
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#20B2AA",
        shadowColor: "rgba(0,0,0,0.4)",
        shadowOffset: {
            width: 1,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        borderRadius: 12,
        padding: 18
    },
    buttonPaynow: {
        // backgroundColor: '#0d0d0d',
        backgroundColor: '#20B2AA',
        padding: 12,
        borderRadius: 30,
        marginTop: 20,
        // marginBottom: 36,
        width: "40"
    },
    buttonPayText: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },

    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#20B2AA",
        backgroundColor: "#ffffff",

    },
    wrapForm: {
        flex: 1,
        justifyContent: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

});