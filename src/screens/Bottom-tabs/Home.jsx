import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    StatusBar,
    Pressable,
    Image,
    Share,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Platform,
    ScrollView
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Searchbar, Menu, Avatar, Button, Text, Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppBar from '../Components/AppBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import { Card, ListItem, Icon } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import { TextInput } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import axios from 'axios';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
// import { theme_color } from '../../../config';
import { AuthUserData, REACT_NATIVE_BASE_URL, REACT_NATIVE_IMAGE_URL, REACT_NATIVE_USER_PROFILE_URL, token } from '../../api/context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const LeftContent = props => <Avatar.Icon {...props} icon="gift" />

export default function HomeTab() {
    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState('');
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const [visible, setVisible] = useState(false);
    const [dealer_images, setdealer_images] = useState([])
    const [imageBase64, setImageBase64] = useState(null);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [modalVisible, setModalVisible] = useState(false)
    const [userSelected, setUserSelected] = useState([])
    const [auth_user, setAuth_user] = useState([])
    const [Dealer_data, setDealer_data] = useState([])
    const [searchText2, setSearchText2] = useState('');



    const handleSearch = (text) => {
        setSearchText2(text);
    }



    React.useEffect(() => {
        get_dealer_list();
    }, []);


    React.useEffect(() => {
        const auth_user_data = async () => {
            let userData;
            // userData = await SecureStore.getItemAsync('auth_user');
            AsyncStorage.getItem('auth_user', (err, result) => {
                const parsedData = JSON.parse(result);
                setAuth_user(parsedData)
                console.log("parsedData", parsedData?.message);
            });

            // console.log("parsedData.......", parsedData)
        };

        auth_user_data();
    }, []);




    const get_dealer_list = async () => {
        try {
            const AuthUserData = await AsyncStorage.getItem('auth_user');
            const parsedAuthUserData = JSON.parse(AuthUserData);
            const response = await axios.get(`${REACT_NATIVE_BASE_URL}users`, {
                headers: {
                    "Accept": 'application/json',
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${parsedAuthUserData?.access_token}`
                },
            });
            setDealer_data(response?.data?.users?.data);
        } catch (error) {
            if (error.response.status === 401) {
                try {
                    const tokenResponse = await axios.post(`${REACT_NATIVE_BASE_URL}refresh`);
                    console.log("tokenres", tokenResponse)

                    const newToken = tokenResponse.data.authorization.token;
                    const AuthUser = tokenResponse.data.user;

                    await AsyncStorage.setItem('auth_user', JSON.stringify({
                        access_token: newToken,
                        user: AuthUser
                    }));
                    // await get_dealer_list();
                    const response = await axios.get(`${REACT_NATIVE_BASE_URL}users`, {
                        headers: {
                            "Accept": 'application/json',
                            'content-type': 'application/json',
                            "Authorization": `Bearer ${newToken}`
                        },
                    });
                    setDealer_data(response?.data?.users?.data);
                } catch (refreshError) {
                    console.log("Error refreshing token:", refreshError);
                }
            } else {
                console.log("Error fetching dealers:", error);
            }
        }
    }


    // const get_dealer_list = async () => {
    //     const AuthUserData = await AsyncStorage.getItem('auth_user');
    //     const parsedAuthUserData = JSON.parse(AuthUserData);
    //     await axios.get(`${REACT_NATIVE_BASE_URL}users`, {
    //         headers: {
    //             "Accept": 'application/json',
    //             'content-type': 'application/json',
    //             "Authorization": `Bearer ${parsedAuthUserData?.access_token}`
    //         },
    //     })
    //         .then(function (response) {
    //             // console.log("response - - -", response?.data?.users?.data);
    //             setDealer_data(response?.data?.users?.data)
    //         })
    //         .catch(function (error) {
    //             console.log("error fetching dealers- - -", error);
    //         })

    // }




    const selectUser = user => {
        console.log("user", user)
        setUserSelected(user)
        setModalVisible(true)
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


    async function schedulePushNotification() {
        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: 'Message sent successfully!',
        })
        setModalVisible(false)

        const recipientToken = "ExponentPushToken[InIylRDThGBGkF6ffikNIN]";
        await Notifications.scheduleNotificationAsync({
            // to: recipientToken,
            // title: 'New message',
            // body: 'You have a new message',
            content: {
                title: `Hubuzz Technology`,
                body: `👤${auth_user.username} shown interest in your property.`,
                data: { data: 'goes here' },
            },
            to: recipientToken,
            sound: 'default',
            trigger: { seconds: 2 },
        });
    }

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            // Learn more about projectId:
            // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
            // token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
            // token = await Notifications.getExpoPushTokenAsync({
            //     projectId: Constants.expoConfig.extra.eas.projectId,
            // });
            const { data: token } = await Notifications.getExpoPushTokenAsync();

            // console.log("notification token", token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }

    // useEffect(() => {
    //     setUserData(users)
    // }, [])
    const onSearch = (text) => {
        setSearchQuery(text)
        if (text == '') {
            get_dealer_list()
            // setDealer_data(Dealer_data)
        } else {

            let templist = Dealer_data.filter(item => {
                return item.user_city.toLowerCase().indexOf(text.toLowerCase()) > -1
            })
            setDealer_data(templist)

        }

    }

    const handle_dealer_profile_view = (item) => {
        console.log('user', item)
        navigation.navigate('UserProfile', { data: item })
    }

    const handle_change_location = () => {
        console.log('change location')

    }

    // const renderItem = useCallback(
    //     ({ item }) => <Pressable onPress={() => handle_contact_dealer(item)}>
    //         <PropertyDetail data={item} />
    //     </Pressable>, []
    // );

    const renderItem = ({ item }) => {
        // console.log("itemmmmm", item)
        return (

            <TouchableOpacity onPress={() => {
                handle_dealer_profile_view(item)
            }}>
                <View style={styles.row}>
                    <Image source={{ uri: item.image ? `${REACT_NATIVE_USER_PROFILE_URL}${item.image}` : "data:image/png;base64,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" }} style={styles.pic} />
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">
                                {item.name}
                            </Text>
                            <TouchableOpacity style={styles.eoi_button} onPress={async () => {
                                selectUser(item);
                            }}>
                                <Text style={styles.eoi_Text}>EOI</Text>
                            </TouchableOpacity>

                            {/* <MaterialCommunityIcons name="arrow-right" color='#DEDEDE' size={23} style={{ marginTop: 10, marginRight: "2%" }} onPress={() => handle_dealer_profile_view(item)} /> */}
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={styles.msgTxt}><MaterialIcons name="location-pin" color='#DEDEDE' size={12} />{item.user_city}</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }


    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
            />
            {/* <AlertNotificationRoot> */}

            <AppBar />

            <View style={styles.headerMenu}>
                <View style={styles.inputContainer}>
                    <Image
                        style={[styles.icon, styles.inputIcon]}
                        source={{ uri: 'https://img.icons8.com/color/70/000000/search.png' }}
                    />
                    <TextInput
                        onPress={() => {
                            handle_change_location()
                        }}
                        style={styles.inputs}
                        placeholder="Enter location..."
                        underlineColorAndroid="transparent"
                        value={searchQuery}
                        onChangeText={text => {
                            onSearch(text)
                        }}
                    />
                </View>

                {/* <Entypo onPress={() => {
                    handle_change_location()
                }} name="location" color='#DEDEDE' size={15} style={{ fontSize: 35, margin: 5, marginTop: "4%" }} /> */}
            </View>

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <View style={{ flex: 1 }} >
                    <FlatList
                        data={Dealer_data}
                        keyExtractor={item => {
                            return item._id
                        }}
                        renderItem={renderItem}
                    />
                </View>
            </TouchableWithoutFeedback>

            {/* <SafeAreaView style={styles.container}>
                <FlatList
                    data={Userdata}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={styles.separator}>
                    </View>}
                />
            </SafeAreaView> */}

            <Modal
                animationType={'fade'}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
                visible={modalVisible}>
                {/* <View style={styles.popupOverlay}> */}
                {/* <View style={styles.popup}> */}
                <View style={styles.popupContent}>
                    <View style={styles.card}>
                        <TextInput style={styles.to_button} placeholder="" editable={false}
                            selectTextOnFocus={false} value={userSelected?.fullname} />
                        <Text style={{ marginRight: "75%" }}>message:</Text>
                        <TextInput style={styles.message_input} placeholder="message"
                            editable
                            multiline
                            numberOfLines={4}
                            maxLength={400} />

                        <TouchableOpacity style={styles.sendnotifiButton} onPress={async () => {
                            await schedulePushNotification();
                        }}>
                            <Text style={styles.sendnotifiText}>Send</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelsendnotifi} onPress={() => {
                            setModalVisible(false)
                        }}>
                            <Text style={styles.cancelsendnotifiText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    {/* </View> */}
                    {/* <View style={styles.popupButtons}>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(false)
                                }}
                                style={styles.btnClose}>
                                <Text style={styles.txtClose}>Close</Text>
                            </TouchableOpacity>
                        </View> */}
                    {/* </View> */}
                </View>
            </Modal>


            {/* </AlertNotificationRoot> */}

            {/* ---------------------------------------------------------------------------------------------------------- */}

        </>

    );
}







const styles = StyleSheet.create({
    forgotPasswordButton: {
        width: '100%',
        textAlign: 'flex-end',
    },
    forgotPasswordButtonText: {
        color: "#0066b2",
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        padding: 20,
        marginTop: 40,
        width: '90%',
        alignItems: 'center',
    },
    message_input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 15,
        marginVertical: 10,
        width: '100%',
    },
    to_button: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '100%',
        color: "#DEDEDE"
    },
    eoi_button: {
        backgroundColor: "#0066b2",
        borderRadius: 5,
        padding: 5,
        marginTop: 6,
        width: 72,
        height: 30,
        alignItems: 'center',
        marginRight: 1
    },
    eoi_Text: {
        color: '#fff',
        fontWeight: 'bold',
    },
    sendnotifiButton: {
        backgroundColor: "#0066b2",
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    sendnotifiText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cancelsendnotifi: {
        marginTop: 20,
    },
    cancelsendnotifiText: {
        color: "#0066b2",
        fontSize: 12,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
    },
    popup: {
        backgroundColor: 'white',
        marginTop: 80,
        marginHorizontal: 20,
        borderRadius: 7,
    },
    popupOverlay: {
        backgroundColor: '#00000057',
        flex: 1,
        marginTop: 30,
    },
    popupContent: {
        flex: 1,
        marginTop: "50%",
        alignItems: 'center',
        margin: 5,
        height: 250,
    },
    popupHeader: {
        marginBottom: 45,
    },
    popupButtons: {
        marginTop: 15,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#eee',
        justifyContent: 'center',
    },
    popupButton: {
        flex: 1,
        marginVertical: 16,
    },
    btnClose: {
        flex: 1,
        height: 40,
        backgroundColor: "#0066b2",
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalInfo: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtClose: {
        color: 'white'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        height: 20,
        width: 20,
        marginLeft: 15,
        justifyContent: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        // borderRadius: 30,
        borderBottomWidth: 1,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        // margin: 10,
    },
    pic: {
        borderRadius: 30,
        width: 50,
        height: 50,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 17,
        width: 170,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: "#0066b2",
        fontSize: 12,
        marginLeft: 15,
    },
    // ------------------------------------------------------------------------------
    flatListContainer: {
        backgroundColor: "#ffffff",
        marginVertical: 10,
        marginHorizontal: 9,
        paddingBottom: 20,
        borderRadius: 10,
        shadowOpacity: 0

    },
    followButton: {
        borderRadius: 0, marginLeft: "73%",
        marginTop: 10,
        height: 35,
        width: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "#0066b2",
    },
    followButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: "#ffffff",
    },
    title: {
        fontSize: 15,
        color: "#999999"
    },
    separator: {
        // height: 2,
        backgroundColor: "#ADD8E6",
    },
    locationIcon: {
    },
    headerMenu: {
        flexDirection: 'row',
        padding: 5,
        // backgroundColor: "#ffffff",

    },
    searchBar: {
        backgroundColor: '#ffffff',
        margin: 5,
        width: "85%",
    },
    filterIcon: {
        // margin: 5,
        marginTop: "50%",
    },
    price: {
        fontWeight: "bold",
        fontSize: 20
    },
    actionButtons: {
        marginTop: "5%"
    },
    user_image: {
        height: 60,
        width: "20%",
        borderRadius: "90%"
    },
    headerBar: {

        backgroundColor: "#ffffff"
    },
    cardContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    },
    propertyDetailText: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#0066b2",
    },
    contentText: {
        padding: 10
    },
    loginText: {
        fontSize: 20,
        color: "red"
    },
    dealText: {
        position: "absolute",
        backgroundColor: "#0066b2",
        textAlign: "center",
        color: "white",
        padding: 5,
        margin: 10,
    },
    dealer_image: {
        width: "100%",
        height: 250,
    },
    fullname_text: {
        fontWeight: "bold"
    }
});