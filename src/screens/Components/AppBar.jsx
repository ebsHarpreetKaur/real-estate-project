import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AppBar = () => {
    const navigation = useNavigation()
    const [current_route, setCurrent_route] = useState('')
    const [auth_user, setAuth_user] = useState([])


    const screenName = useNavigationState((state) => {
        // console.log("state", state.routeNames)
        // setCurrent_route(state.routeNames)                       
    })

    const _goBack = () => {
        console.log('Went back');
        navigation.goBack();
    }
    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');

    React.useEffect(() => {
        const auth_user_data = async () => {
            let userData;
            userData = await SecureStore.getItemAsync('auth_user');
            const parsedData = JSON.parse(userData);
            setAuth_user(parsedData)
            // console.log("parsedData", parsedData)
            // console.log("auth_user..........", auth_user)


        };

        auth_user_data();
    }, []);


    return (
        <>

            {/* array.map(function(currentValue, index, array) {
                // Return element for newArray
            }); */}

            <Appbar.Header statusBarHeight={Platform.OS === 'android' ? 5 : 55} style={styles.headerBar} mode='' >
                {/* <Appbar.BackAction onPress={_goBack} />
                <Appbar.Content title="Header" style={styles.loginText} onPress={() => {

                }} />
                <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
                {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
            </Appbar.Header>

            <View style={styles.userCard}>
                <View>
                    <Image source={{ uri: 'https://media.istockphoto.com/id/186841959/photo/beautiful-modern-indian-woman.jpg?s=612x612&w=0&k=20&c=zFH5vouHzfXYrrFhtEulQCa9fDoJDt1X3kH0u4kOS9c=' }} style={styles.userPhoto} />
                    {/* <Image source={{ uri: auth_user !== null || '' ? auth_user.image : 'https://www.shutterstock.com/shutterstock/photos/1760295569/display_1500/stock-vector-profile-picture-avatar-icon-vector-1760295569.jpg' }} style={styles.userPhoto} /> */}
                </View>
                <View style={styles.userInfo}>
                    {/* <Text style={styles.userName}>{auth_user !== null || '' ? auth_user.username : null}</Text> */}
                    <Text style={styles.userName}>Bhawna Ahuja</Text>

                    {/* <Text style={styles.userFollowers}>{auth_user !== null || '' ? auth_user.email : null}</Text> */}
                </View>
                <TouchableOpacity >
                    <MaterialCommunityIcons name="menu" style={styles.editButtonText} size={23} onPress={() => <></>} />
                </TouchableOpacity>
            </View>


        </>
    );
}

const styles = StyleSheet.create({

    headerBar: {
        backgroundColor: "#ffffff"
    },
    loginText: {
        fontSize: 20,
        color: "red"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 60,
    },
    userCard: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    userPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userInfo: {
        flex: 1,
        marginLeft: 10,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    userFollowers: {
        color: '#999',
    },
    editButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#008B8B',
    },
    editButtonText: {
        color: '#D3D3D3',
        fontWeight: 'bold',
        fontSize: 27
    },
    statsCard: {
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f4f4f4',
    },
    statsTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    statItem: {
        marginTop: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: '#fff',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    statsCategory: {
        color: '#999',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6495ED',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addButtonText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default AppBar;