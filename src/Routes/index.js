import * as React from 'react';
// import * as SecureStore from 'expo-secure-store';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from '../screens/Bottom-tabs/Home'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Otp from '../screens/Stacks/Otp';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Login from '../screens/Components/Login';
import PropertiesTab from '../screens/Bottom-tabs/Properties';
import AccountTab from '../screens/Bottom-tabs/Account';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import PropertyDetail from '../screens/Stacks/PropertyDetail';
import AuthContext from '../api/context/Context';
import NotificationTab from '../screens/Bottom-tabs/Notification';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ChatTab from '../screens/Bottom-tabs/Chat';
import AssignProperty from '../screens/Components/AssignProperty';
import CheckAuthCredentials from './../screens/Components/Check-AuthCredentials';
import UserProfile from '../screens/Stacks/UserProfile';
import ChatDetail from '../screens/Stacks/ChatDetail';
import WelcomeScreen from '../screens/Components/Welcome';
import EditProfileView from '../screens/Components/EditProfile';
// import { theme_color } from '../../config';
import VideoConference from '../screens/Components/VideoConference'
import Commission from '../screens/Components/Commission';
import AddProperty from '../screens/Components/AddProperty';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()



function HomeScreen({ navigation }) {
    return (
        <>
            <HomeTab />
        </>
    );
}

function AccountScreen({ navigation }) {
    return (
        <>
            <AccountTab />
        </>
    );
}

function ChatScreen({ navigation }) {
    return (
        <>
            <ChatTab />
        </>
    );
}

function SignInScreen({ navigation }) {
    return (
        <>
            <Login />
        </>
    );
}

function PropertiesScreen({ navigation }) {
    return (
        <>
            <PropertiesTab />
        </>
    );
}

function NotificationScreen({ navigation }) {
    return (
        <>
            <NotificationTab />
        </>
    );
}




export default function AppNavigation() {
    // const [auth_user, setAuth_user] = useState([]);

    // React.useEffect(() => {
    //     const auth_user_data = async () => {
    //         let userData;
    //         // userData = await SecureStore.getItemAsync('auth_user');
    //         AsyncStorage.getItem('auth_user', (err, result) => {
    //             const parsedData = JSON.parse(result);
    //             setAuth_user(parsedData)
    //             console.log("parsedData", parsedData?.message);
    //         });

    //         // console.log("parsedData.......", parsedData)
    //     };

    //     auth_user_data();
    // }, []);


    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        userPaymentStatus: action.auth_payment_status,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                        userPaymentStatus: action.auth_payment_status,

                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                        userPaymentStatus: null,

                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            const userData = await AsyncStorage.getItem('auth_user');
            const parsedUserData = JSON.parse(userData);
            let userToken = parsedUserData?.access_token
            let user_payment_status = parsedUserData?.user?.payment_status


            // console.log("userToken", parsedUserData?.user?.payment_status)


            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken, userPaymentStatus: user_payment_status });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                // console.log("Data", data?.modifiedResponse?.access_token)
                const auth_token = data?.modifiedResponse?.access_token
                const user_payment_status = data?.modifiedResponse?.user?.payment_status

                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: auth_token, userPaymentStatus: user_payment_status });
            },
            signOut: () => {
                AsyncStorage.removeItem('auth_user')
                    .then(() => {
                        console.log('User logged out');
                        dispatch({ type: 'SIGN_OUT' })

                    })
                    .catch(error => {
                        console.error('Error removing auth_user:', error);
                    });

            },
            signUp: async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );


    // console.log("auth_user", auth_user?.user)


    // const user = [
    //     {
    //         "message": "User logged in successfully",
    //         "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzEwNTAzMTM3LCJleHAiOjE3MTA1MDY3MzcsIm5iZiI6MTcxMDUwMzEzNywianRpIjoiOHdLc0JRTGV1RW1TY2VuMyIsInN1YiI6IjY1ZjQxMTAzOWU0N2NhOTdiYzA5NWFhMiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.kUu8onNc5GS3DfVF3zo4zBFTtzD2pKCNAaeygDBzFcU",
    //         // "access_token": "",
    //         "user": {
    //             "_id": "65f411039e47ca97bc095aa2",
    //             "mobile": 4675336343,
    //             "otp_status": true,
    //             "user_location": [
    //                 {
    //                     "coords": {
    //                         "speed": -1,
    //                         "longitude": 76.69112317715411,
    //                         "latitude": 30.71134927265382,
    //                         "accuracy": 16.965582688710988,
    //                         "heading": -1,
    //                         "altitude": 318.2151985168457,
    //                         "altitudeAccuracy": 7.0764055252075195
    //                     },
    //                     "timestamp": 1709037095653.2131
    //                 }
    //             ],
    //             "status": true,
    //             "email": "g@gmail.co",
    //             "user_pincode": 3953553,
    //             "name": "hhs",
    //             "payment_res": [
    //                 {
    //                     "amount": 100,
    //                     "currency": "USD",
    //                     "card_number": "4111111111111111",
    //                     "card_exp_month": "12",
    //                     "card_exp_year": "2025",
    //                     "card_cvv": "123",
    //                     "billing_address": {
    //                         "line1": "123 Billing St",
    //                         "line2": null,
    //                         "city": "Billing City",
    //                         "state": "CA",
    //                         "postal_code": "12345",
    //                         "country": "US"
    //                     },
    //                     "customer_name": "John Doe",
    //                     "customer_email": "john.doe@example.com",
    //                     "customer_phone": "+1234567890",
    //                     "description": "Payment for order #12345",
    //                     "metadata": {
    //                         "order_id": "12345",
    //                         "customer_id": "67890"
    //                     }
    //                 }
    //             ],
    //             "payment_status": true,
    //             "updated_at": "2024-03-15T09:12:35.474000Z",
    //             "created_at": "2024-03-15T09:12:35.474000Z"
    //         },
    //         "token_type": "Bearer",
    //         "expires_in": 3600
    //     }
    // ]



    // const user = []
    //         setAuth_user(user[0])
    //     };



    //     auth_user_data();
    // }, []);


    function Root() {
        return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >

                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Properties',
                        tabBarActiveTintColor: "#0066b2",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home-analytics" color={color} size={size} />
                        ),
                    }}
                />

                {/* <Tab.Screen
                    name="Properties"
                    component={PropertiesScreen}
                    options={{
                        tabBarLabel: 'Properties',
                        tabBarActiveTintColor: "#0066b2",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home-city" color={color} size={size} />
                        ),
                    }}
                /> */}
                <Tab.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={{
                        tabBarLabel: 'Chat',
                        tabBarActiveTintColor: "#0066b2",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="chat" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notifications"
                    component={NotificationScreen}
                    options={{
                        tabBarLabel: 'Notifications',
                        tabBarActiveTintColor: "#0066b2",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="bell" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Account"
                    component={AccountScreen}
                    options={{
                        tabBarLabel: 'Account',
                        tabBarActiveTintColor: "#0066b2",
                        // tabBarInactiveBackgroundColor:"#",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" color={color} size={size} />
                        ),
                    }}
                />
                {/* <Tab.Screen
                    name="Login"
                    component={Login}
                /> */}

            </Tab.Navigator>
        );
    }
    // console.log("state....", state)
    function MyStack() {

        return (
            <AuthContext.Provider value={authContext}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    {state.userToken === undefined || state.userToken === null ? (
                        <>
                            <Stack.Screen name="Login" component={SignInScreen} />
                            <Stack.Screen name="Otp" component={Otp} />
                            <Stack.Screen name="CheckAuthCredentials" component={CheckAuthCredentials} initialParams={{ user: state.userToken }} />
                        </>
                    )

                        // : state?.userPaymentStatus === false || null || undefined ? (
                        //     <>
                        //         <Stack.Screen name="CheckAuthCredentials" component={CheckAuthCredentials} initialParams={{ user: state.userToken }} />


                        //     </>
                        // )
                        :
                        <>
                            <Stack.Screen
                                name=" "
                                component={Root}
                            // options={{ headerShown: false }}
                            />
                            <Stack.Screen name="AssignProperty" component={AssignProperty} />
                            <Stack.Screen name="ChatDetail" component={ChatDetail} />
                            <Stack.Screen name="PropertyDetail" component={PropertyDetail} />
                            <Stack.Screen name="UserProfile" component={UserProfile} />
                            <Stack.Screen name="EditProfile" component={EditProfileView} />
                            <Stack.Screen name="VideoConferencing" component={VideoConference} />
                            <Stack.Screen name="CheckAuthCredentials" component={CheckAuthCredentials} initialParams={{ user: state.userToken }} />
                            <Stack.Screen name="Commission" component={Commission} />
                            <Stack.Screen name="AddProperty" component={AddProperty} />

                        </>

                    }


                </Stack.Navigator>
                {/* 
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    {state.userToken == undefined || state.userToken === null || state.userToken.length === 0 ? (
                        <>
                            <Stack.Screen name="Login" component={SignInScreen} />
                            <Stack.Screen name="Otp" component={Otp} />
                            <Stack.Screen name="CheckAuthCredentials" component={CheckAuthCredentials} initialParams={{ user: state.userToken }} />
                        </>
                    ) :
                        <>

                    // state?.access_token === null || state?.access_token === '' || state?.access_token === undefined ? (
                    //     <>
                                <Stack.Screen name="Login" component={SignInScreen} />
                                <Stack.Screen name="Otp" component={Otp} />
                                <Stack.Screen name="CheckAuthCredentials" component={CheckAuthCredentials} initialParams={{ user: state.userToken }} />
                    //     </>
                    // ) :
                    // state?.payment_status === false || null || undefined ? (
                    //     <>
                    //         <Stack.Screen name="CheckAuthCredentials" component={CheckAuthCredentials} initialParams={{ user: state.userToken }} />


                    //     </>
                    // ) :

                            <Stack.Screen name="CheckAuthCredentials" component={CheckAuthCredentials} 
                            // initialParams={{ user: user }} 
                            />

                            <Stack.Screen
                                name=" "
                                component={Root}
                            // options={{ headerShown: false }}
                            />
                            <Stack.Screen name="AssignProperty" component={AssignProperty} />
                            <Stack.Screen name="ChatDetail" component={ChatDetail} />
                            <Stack.Screen name="PropertyDetail" component={PropertyDetail} />
                            <Stack.Screen name="UserProfile" component={UserProfile} />
                            <Stack.Screen name="EditProfile" component={EditProfileView} />
                            <Stack.Screen name="VideoConferencing" component={VideoConference} />
                        </>

                    }


                </Stack.Navigator> */}
            </AuthContext.Provider>


            // <Stack.Navigator
            //     screenOptions={{
            //         headerShown: false,
            //     }}
            // >
            //     {

            //         auth_user === undefined || auth_user === null || auth_user.length === 0 ? (
            //             <>
            //                 <Stack.Screen name="Login" component={SignInScreen} />
            //                 <Stack.Screen name="Otp" component={Otp} />
            //                 <Stack.Screen name="CheckAuthCredentials" component={CheckAuthCredentials} initialParams={{ user: auth_user }} />


            //             </>

            //         ) :
            //             auth_user?.access_token === null || auth_user?.access_token === '' || auth_user?.access_token === undefined ? (
            //                 <>
            //                     {/* <Stack.Screen name="Welcome" component={WelcomeScreen} />
            //                     <Stack.Screen name="SignIn" component={SignInScreen} /> */}
            //                     <Stack.Screen name="Login" component={SignInScreen} />
            //                     <Stack.Screen name="Otp" component={Otp} />
            //                     <Stack.Screen name="CheckAuthCredentials" component={CheckAuthCredentials} initialParams={{ user: auth_user }} />

            //                 </>

            //             ) :
            //                 auth_user?.payment_status === false || null || undefined ?
            //                     (
            //                         <>
            //                             <Stack.Screen name="CheckAuthCredentials" component={CheckAuthCredentials} initialParams={{ user: user }} />

            //                         </>
            //                     )
            //                     :
            //                     (
            //                         <>
            //                             <Stack.Screen
            //                                 name=" "
            //                                 component={Root}
            //                             // options={{ headerShown: false }}
            //                             />
            //                             <Stack.Screen name="AssignProperty" component={AssignProperty} />
            //                             <Stack.Screen name="ChatDetail" component={ChatDetail} />
            //                             <Stack.Screen name="PropertyDetail" component={PropertyDetail} />
            //                             <Stack.Screen name="UserProfile" component={UserProfile} />
            //                             <Stack.Screen name="EditProfile" component={EditProfileView} />
            //                             <Stack.Screen name="VideoConferencing" component={VideoConference} />


            //                         </>
            //                     )
            //     }
            // </Stack.Navigator>

        );
    }

    return (

        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )

}

