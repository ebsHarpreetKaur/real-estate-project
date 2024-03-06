import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, Text, View, Button } from 'react-native';
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




const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

// const StackParamList = {
//     PhoneNumber: undefined,
//     Otp: undefined,
//     Gated: undefined
// };

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
    const [isLogin, setisLogin] = useState(false);
    // useEffect(() => {
    //     AuthUser()
    // }, [])
    // const AuthUser = async () => {
    //     try {
    //         isSignedIn()
    //             .then(res => {
    //                 if (res) {
    //                     res;
    //                     console.log(res, 'res')
    //                     if (res) {
    //                         setisLogin(res)
    //                     } else {
    //                         console.log('waiting...')
    //                     }
    //                 }
    //             })
    //     } catch (e) {
    //         console.log("error while getting async storage value", e)
    //     }
    // };

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        is_profile_completed: action.is_profile_completed_status,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                        is_profile_completed: action.is_profile_completed_status,

                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                        is_profile_completed: false,

                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            is_profile_completed: false,

        }
    );
    // console.log("state.....", state)

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userData;
            userData = await SecureStore.getItemAsync('auth_user');
            const parsedData = JSON.parse(userData);
            const user_access_token = parsedData?.token
            const user_profile_complete_status = parsedData?.profile_complete_status

            // console.log("parsedData", parsedData)
            // console.log("userData", userData)


            try {



            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: user_access_token, is_profile_completed_status: user_profile_complete_status });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                user_access_token = data?.auth_user?.token
                user_profile_complete_status = data?.auth_user?.profile_complete_status

                console.log("data..........", data?.auth_user?.profile_complete_status)


                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: user_access_token, is_profile_completed_status: user_profile_complete_status });
            },
            signOut: () => {
                // auth_user = SecureStore.getItem('auth_user')
                // console.log(auth_user, "signout user")

                dispatch({ type: 'SIGN_OUT' })
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
                        tabBarLabel: 'Dealers',
                        tabBarActiveTintColor: "#20B2AA",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home-analytics" color="#20B2AA" size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Properties"
                    component={PropertiesScreen}
                    options={{
                        tabBarLabel: 'Properties',
                        tabBarActiveTintColor: "#20B2AA",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home-city" color="#20B2AA" size={size} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={{
                        tabBarLabel: 'Chat',
                        tabBarActiveTintColor: "#20B2AA",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="chat" color="#20B2AA" size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notifications"
                    component={NotificationScreen}
                    options={{
                        tabBarLabel: 'Notifications',
                        tabBarActiveTintColor: "#20B2AA",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="bell" color="#20B2AA" size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Account"
                    component={AccountScreen}
                    options={{
                        tabBarLabel: 'Account',
                        tabBarActiveTintColor: "#20B2AA",
                        // tabBarInactiveBackgroundColor:"#",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" color="#20B2AA" size={30} />
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

    function MyStack() {

        return (
            // <Stack.Navigator
            //     screenOptions={{
            //         headerShown: false,
            //     }}
            // >
            //     <Stack.Screen
            //         name=" "
            //         component={Root}
            //     // options={{ headerShown: false }}
            //     />
            //     <Stack.Screen name="Otp" component={Otp} />
            //     <Stack.Screen name="Login" component={Login} />
            //     <Stack.Screen name="PropertyDetail" component={PropertyDetail} />


            // </Stack.Navigator>

            <AuthContext.Provider value={authContext}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    {
                        state.userToken === null || state.userToken === ' ' || state.userToken === undefined ? (
                            <>
                                {/* <Stack.Screen name="Welcome" component={WelcomeScreen} />
                                <Stack.Screen name="SignIn" component={SignInScreen} /> */}
                                <Stack.Screen name="Login" component={SignInScreen} />
                                <Stack.Screen name="Otp" component={Otp} />


                            </>

                        ) :
                            // state.is_profile_completed === false || null ?
                            //     (
                            //         <>
                            //             <Stack.Screen name="CheckAuthCredentials" component={CheckAuthCredentials} />

                            //         </>
                            //     )
                            //     :
                            (
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

                                </>
                            )}
                </Stack.Navigator>
            </AuthContext.Provider>

        );
    }

    return (

        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )

}

