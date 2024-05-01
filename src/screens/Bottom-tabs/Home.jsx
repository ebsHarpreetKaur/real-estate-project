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
import { REACT_NATIVE_BASE_URL, REACT_NATIVE_IMAGE_URL, token } from '../../api/context/auth';

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
        auth_user_data();
        get_dealer_list();
    }, []);

    const auth_user_data = async () => {
        let userData;
        userData = await SecureStore.getItemAsync('auth_user');
        const parsedData = JSON.parse(userData);
        setAuth_user(parsedData)
        // console.log("parsedData", parsedData)
        // console.log("auth_user..........", auth_user)
    };

    const get_dealer_list = async () => {

        await axios.get(`${REACT_NATIVE_BASE_URL}users`, {
            headers: {
                "Accept": 'application/json',
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        })
            .then(function (response) {
                // console.log("response - - -", response?.data?.users?.data);
                setDealer_data(response?.data?.users?.data)
            })
            .catch(function (error) {
                console.log("error - - -", error);
            })

    }




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
            setDealer_data(Dealer_data)
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
                handle_dealer_profile_view()
            }}>
                <View style={styles.row}>
                    <Image source={{ uri: item.image ? `${REACT_NATIVE_IMAGE_URL}user_images/${item.image}` : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAACUCAMAAADBJsndAAAAMFBMVEXk5ueutLenrrGrsbTo6uvg4uO3vL/Jzc/b3d++w8XGysy7wMLV2NrM0NLCxsiyuLpTF7avAAADsUlEQVR4nO2b3bajIAyFjQRERXn/tx10nNaO/QGiCa7FvmrPOhffAhJCsts0VVVVVVVVVVVVVVVVVVVVJwnx+Kk0BTLrpqFfNHeTs0WyIrreAKiHwJvBFkaKjR6ghf+lWpi0NNtO6GZQB8pVLQy6kDXF5iPluqi+KwIUnfpCuZKCLYB0OJ7LI+kgDmp+LOYGOsqC6ijKBdRLhpONpFxATSMGquMxJUGTMBdQoZxv0jhB9RILil1sDD1BJ35QdBF58yDLztn4DEwYuSlxSN71RWpi5kzInK+gvCcU56zlDJy8xZPOCaJVnhMT+8zlDOJc0MSbaC/FGPI45XOCYsyhY/62g5rZNp6w7cCZmhxhOcMTlKtsyk6e23pyRTxSKIO43kqYneT/iivVWyInU3WXV3nu5Vg2PrOk24mnrMeZiMnF2RMxmRITjlROnm5T5TyZ8y7n8y7xfpf8SSvrgOs+usv9Tq6XDA9mg1mtpafY6k/C6x04WyI3eR/d5r15l/d7Rst7x8nYD6H0lzinHnfp1xH6n8A6RMrvJzNPjrP786yU+fMOplJpp5xLnrOZvOk287iMnZeYbzZ3mRffZ/6e6GfwcsaLFH+IpJEFo590YdNlnUGR/iUj7lyMSk+DMGQT5a/jLI0/66dfUd5ctwnd/GlNFcwlmBU3YaPfkapWdSX5aRet/mSvXvzJc2n+5FWI2rpu6Megcv3eq/BBhlgk5EqltbZPhW9F4eLm759HY7z/56CHcDzNOA/TZJsCWMOZdLPxazJ/E+/r37wfJ8GzuoTN1EPbRtyb4Z/GzmmBwg4bN4/w68Z8XVvTT9xFkx3h2135iRXAOC7EEDWdz2/btKp3DPu/XDsZK/m6qqa7nNR56vBoJYXuQsYQO4Y6OnqghgrlojVFNybE929SM1ySUzVtGvOO1J/eFcOmI0bPW7X9uUU0WsqE44uUP7PlhNM1lCvpadNOPP9kvoCedErRnpEyv+qMvae7An5LzXRMihU5HnQkXqSkCSEfKN2yEg1KaeLyYZLy05Vp8w1obveeI9JfQDOjXhPtKumgWaNkvDy9H0EzqhKiST5TyUGPToAy44iyH84NNPHZLLPrkGwaIvgqiJxJMU90plHkE2YjMkH0Vyph1MR5rx8Vn5to/jmi4s0EvPXHUdGcopTQxt6eVnY5Yw2NOIhiRvuXyb+LoCoyhVqZq/2puIiXTPIbZ1Sql85Ky0spat+ZnuxfFPfDSbka5KGoq9O04irCT1JVVSWkP19hMaEOQ65tAAAAAElFTkSuQmCC"}} style={styles.pic} />
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
                        style={styles.inputs}
                        placeholder="Enter location..."
                        underlineColorAndroid="transparent"
                        value={searchQuery}
                        onChangeText={text => {
                            onSearch(text)
                        }}
                    />
                </View>

                <Entypo onPress={() => {
                    handle_change_location()
                }} name="location" color='#DEDEDE' size={15} style={{ fontSize: 35, margin: 5, marginTop: "4%" }} />
            </View>

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <View style={{ flex: 1 }} >
                    <FlatList
                        data={Dealer_data}
                        keyExtractor={item => {
                            return item.id
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
        marginLeft: 15,
        justifyContent: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        margin: 10,
    },
    pic: {
        borderRadius: 30,
        width: 60,
        height: 60,
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