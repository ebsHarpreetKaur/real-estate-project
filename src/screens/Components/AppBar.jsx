import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

const AppBar = () => {
    const navigation = useNavigation()
    const [current_route, setCurrent_route] = useState('')

    const screenName = useNavigationState((state) => {
        console.log("state", state.routeNames)
        // setCurrent_route(state.routeNames)                       
    })

    const _goBack = () => {
        console.log('Went back');
        navigation.goBack();
    }
    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');



    return (
        <>
            {/* array.map(function(currentValue, index, array) {
                // Return element for newArray
            }); */}
            <Appbar.Header statusBarHeight={55} style={styles.headerBar} mode='center-aligned'>
                <Appbar.BackAction onPress={_goBack} />
                <Appbar.Content title="Header" style={styles.loginText} onPress={() => {

                }} />
                {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
            </Appbar.Header>
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
    }

});

export default AppBar;