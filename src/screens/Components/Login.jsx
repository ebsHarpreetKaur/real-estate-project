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

const Login = () => {
    const navigation = useNavigation();
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef(null);

    return (
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
                            // sendSmsVerification(formattedValue).then((sent) => {
                            // SecureStore.deleteItemAsync('auth_user') 

                            navigation.navigate('Otp');
                            //     navigation.navigate("Otp", {
                            //         params: { phoneNumber: formattedValue },
                            //     });
                            // });
                        }}
                    >
                        <Text style={styles.buttonText}>Sign in</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </>
    );
};

const styles = StyleSheet.create({
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
        marginTop: 20,
        height: 50,
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#336aea",
        shadowColor: "rgba(0,0,0,0.4)",
        shadowOffset: {
            width: 1,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    buttonText: {
        color: "white",
        fontSize: 14,
        backgroundColor: "#336aea"
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