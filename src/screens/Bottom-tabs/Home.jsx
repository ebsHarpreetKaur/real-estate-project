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
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Searchbar, Menu, Avatar, Button, Card, Text, Divider, TextInput, } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppBar from '../Components/AppBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import users from '../../data/UserConstant';
import * as Location from 'expo-location';




const LeftContent = props => <Avatar.Icon {...props} icon="gift" />

export default function HomeTab() {
    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState('');
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const [visible, setVisible] = useState(false);
    const [Userdata, setUserData] = useState(users)


    // useEffect(() => {
    //     setUserData(users)
    // }, [])
    const onSearch = (text) => {
        setSearchQuery(text)
        if (text == '') {
            setUserData(users)
        } else {
            let templist = users.filter(item => {
                return item.user_city.toLowerCase().indexOf(text.toLowerCase()) > -1
            })
            setUserData(templist)
        }

    }
    
    const handle_contact_dealer = (item) => {
        console.log('user', item)
        // navigation.navigate('PropertyDetail', { data: item })

    }

    const handle_change_location = () => {
        console.log('change location')

    }


    // const renderItem = useCallback(
    //     ({ item }) => <Pressable onPress={() => handle_contact_dealer(item)}>
    //         <PropertyDetail data={item} />
    //     </Pressable>, []
    // );


    const renderItem = useCallback(
        ({ item }) =>
            <Pressable onPress={() => handle_contact_dealer(item)}>

                <Card style={styles.flatListContainer} mode='elevated'>

                    <Card.Cover source={{ uri: item.image }} style={styles.image} />
                    {/* <Text variant="bodyLarge" style={styles.dealText}>{item.fullname}</Text> */}

                    {/* <Card.Title title="Property Owner" subtitle="Active" left={LeftContent} /> */}
                    <Card.Content style={styles.contentText}>
                        <Text variant="bodyMedium" style={styles.price}>{item.fullname}</Text>

                        <Text variant="titleMedium" style={styles.title}>{<MaterialIcons name="location-pin" color='#336aea' size={15} />}{item.user_city}</Text>

                    </Card.Content>
                    <Divider />
                    {/* <Card.Content style={styles.cardContent}>
                        <Text variant="bodyMedium" style={styles.propertyDetailText}>{<MaterialCommunityIcons name="bed" color='#336aea' size={25} />}{item.bed} Bed</Text>
                        <Text variant="bodyMedium" style={styles.propertyDetailText}>{<FontAwesome name="bath" color='#336aea' size={25} />}{item.bath} Bath</Text>
                        <Text variant="bodyMedium" style={styles.propertyDetailText}>{<MaterialCommunityIcons name="car-arrow-left" color='#336aea' size={25} />}{item.parking} Parking</Text>
                    </Card.Content> */}
                    {/* <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions> */}
                </Card>
                {/* <Card mode='elevated' style={styles.flatListContainer}>
                    <Card.Title title="Property Owner" subtitle="Active" left={LeftContent} />
                    <Card.Content>
                        <Text variant="titleLarge" style={styles.title}>{item.title}</Text>
                        <Text variant="bodyMedium" style={styles.price}>{item.price}</Text>
                    </Card.Content>
                    <Card.Cover source={{ uri: item.photo }} style={styles.image} />
                    <Card.Actions style={styles.actionButtons}>
                        <Button>Contact Dealer</Button>
                        <Button>Explore</Button>
                    </Card.Actions>
                </Card> */}


            </Pressable>, []
    );


    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
            />

            <AppBar />

            <View style={styles.headerMenu}>
                <Searchbar
                    placeholder="Enter Location"
                    onChangeText={text => {
                        onSearch(text)
                    }}
                    value={searchQuery}
                    iconColor='gray'
                    style={styles.searchBar}
                />
                <MaterialIcons onPress={() => {
                    handle_change_location()
                }} name="location-pin" color='#336aea' size={15} style={{ fontSize: 35, margin: 5, marginTop: "4%" }} />
            </View>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={Userdata}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={styles.separator}>
                    </View>}
                />
            </SafeAreaView>


        </>

    );
}

const styles = StyleSheet.create({
    flatListContainer: {
        backgroundColor: "#ffffff",
        marginVertical: 10,
        marginHorizontal: 9,
        paddingBottom: 20,
        borderRadius: 10,
        shadowOpacity: 0

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
    image: {
        height: 200,
        width: "100%",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        marginBottom: "2%"
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
        color: "#336aea",
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
        backgroundColor: "#336aea",
        textAlign: "center",
        color: "white",
        padding: 5,
        margin: 10,
    },

});