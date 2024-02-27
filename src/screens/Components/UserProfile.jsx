import { Keyboard, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import AppBar from './AppBar';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HelperText, TextInput } from 'react-native-paper';
import { today } from '../../api/context/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import AuthContext from '../../api/context/Context';

export default function UserProfile() {
    const navigation = useNavigation()
    const [user_location, setUserLocation] = useState('');
    const [reraNumber, setReraNumber] = useState('');
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const { signIn } = React.useContext(AuthContext);
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

    const onChangeLocation = text => {
    };

    const hasErrors = () => {
        if (!reraNumber) {
            return true;
        }
        return /[^0-9]/.test(reraNumber);
    };

    const handleContinue = () => {
        // console.log("continue")
        // navigation.navigate(" ", { screen: 'Home' });
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
                    profile_complete_status: true,
                    user_location: location,
                    user_city: city

                };
                // console.log("modifiedResponse.......", modifiedResponse)
                const user_object_string = JSON.stringify(modifiedResponse);
                if (res) {
                    SecureStore.deleteItemAsync('auth_user')
                        .then(() => {
                            console.log('User deleted successfully');
                            console.log("city location", city, location)
                            SecureStore.setItemAsync('auth_user', user_object_string)
                                .then(() => {
                                    console.log('User stored successfully');
                                    signIn({ 'auth_user': modifiedResponse })

                                    navigation.navigate(" ", { screen: 'Home' });

                                })
                                .catch(error => {
                                    console.error('Error storing object:', error);
                                });



                        })
                        .catch(error => {
                            console.error('Error storing object:', error);
                        });

                }

            });

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

                        <TextInput
                            style={{ height: 40, margin: 5, marginBottom: 20, backgroundColor: "#ffffff", padding: 5 }}
                            label="RERA number"
                            value={reraNumber}
                            onChangeText={newText => onChangeReraNumber(newText)}
                            defaultValue={reraNumber}
                            right={<TextInput.Icon icon={() => <Icon name="document-text-outline" size={20} color="black" />} />}
                        // keyboardType="numeric"
                        />
                        <HelperText type="error" visible={hasErrors()}>
                            {!reraNumber ? "This field is required" : "Please enter numbers only!"}
                        </HelperText>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                handleContinue()
                                // SecureStore.deleteItemAsync('auth_user')

                            }}
                        >
                            <Text style={styles.buttonText}>Continue <MaterialCommunityIcons name="arrow-right" color={"#ffffff"} size={17} /></Text>

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
        fontSize: 18,
        backgroundColor: "#336aea"
    },

    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#336aea",
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