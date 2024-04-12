import React, { useState, useRef } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    Keyboard
} from "react-native";
import * as SecureStore from 'expo-secure-store';

import { Colors } from "react-native/Libraries/NewAppScreen";
import PhoneInput from "react-native-phone-number-input";
import AppBar from "./AppBar";
import { sendSmsVerification } from "../../api/context/verify";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { Image, TouchableWithoutFeedback } from "react-native";
import { ALERT_TYPE, Toast, Dialog } from 'react-native-alert-notification';
import { ActivityIndicator } from "react-native";
import { theme_color } from "../../../config";

const Login = () => {
    const navigation = useNavigation();
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef(null);
    const [isloading, setisLoading] = useState(false)

    const handleOTPscreen = () => {
        // setisLoading(true)

        // navigation.navigate('Otp');

        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'success',
            textBody: 'OTP sent successfully',
        })
        navigation.navigate("Otp", {
            params: { phoneNumber: formattedValue },
        });

        // setisLoading(false)
    }





    return (
        <>
            {
                isloading === true
                    ?
                    <View style={[styles.container_activity_indicator, styles.horizontal]}>
                        <ActivityIndicator size="large" color={theme_color} />
                    </View>

                    :
                    <>
                        <StatusBar
                            animated={true}
                            backgroundColor="#61dafb"

                        />

                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <SafeAreaView style={styles.wrapper}>
                                <View>
                                    <Text style={styles.welcome}>Sign in</Text>
                                </View>
                                <Button
                                    icon={({ size, color }) => (
                                        <Image
                                            source={require('../../../assets/login.jpg')}
                                            style={{ width: 400, height: 300 }}
                                        />
                                    )}
                                ></Button>
                                <PhoneInput
                                    ref={phoneInput}
                                    defaultValue={value}
                                    defaultCode="IN"
                                    layout="first"
                                    onChangeText={(text) => {
                                        setValue(text);
                                    }}
                                    onChangeFormattedText={(text) => {
                                        setFormattedValue(text);
                                    }}
                                    countryPickerProps={{ withAlphaFilter: true }}
                                    withShadow
                                // autoFocus
                                />
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        if (!value) {
                                            Toast.show({
                                                type: ALERT_TYPE.WARNING,
                                                title: 'warning',
                                                textBody: 'Phone number required',
                                            })
                                        } else {
                                            // sendSmsVerification(formattedValue).then((sent) => {
                                                // SecureStore.deleteItemAsync('auth_user') 
                                                handleOTPscreen()

                                            // });
                                        }
                                    }}
                                >
                                    <Text style={styles.buttonText}>Sign in</Text>
                                </TouchableOpacity>
                            </SafeAreaView>
                        </TouchableWithoutFeedback>
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
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },

    button: {
        // backgroundColor: '#0d0d0d',
        backgroundColor: theme_color,
        padding: 18,
        borderRadius: 30,
        marginTop: 48,
        marginBottom: 36,
        width: "80%"
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },

    welcome: {
        padding: 20,
        fontSize: 20,
        fontWeight: "bold"
    },

    status: {
        padding: 20,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "flex-start",
        color: "gray",
    },
});

export default Login;