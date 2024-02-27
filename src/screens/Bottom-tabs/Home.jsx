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
import property from '../../data/PropertyConstants';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Searchbar, Menu, Avatar, Button, Card, Text, Divider, TextInput, } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppBar from '../Components/AppBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropertyDetail from '../Stacks/PropertyDetail';

const LeftContent = props => <Avatar.Icon {...props} icon="gift" />

export default function HomeTab() {
    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState('');
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const [visible, setVisible] = useState(false);
    const [propertydata, setPropertyData] = useState(property)
  



    // useEffect(() => {
    //     setPropertyData(property)
    // }, [])

    const onSearch = (text) => {
        setSearchQuery(text)
        if (text == '') {
            setPropertyData(property)
        } else {
            let templist = property.filter(item => {
                return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1
            })
            setPropertyData(templist)
        }

    }
    const handle_contact_dealer = (item) => {
        console.log('property', item)
        navigation.navigate('PropertyDetail', { data: item })

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

                    <Card.Cover source={{ uri: item.photo }} style={styles.image} />
                    <Text variant="bodyLarge" style={styles.dealText}>{item.deal}</Text>

                    {/* <Card.Title title="Property Owner" subtitle="Active" left={LeftContent} /> */}
                    <Card.Content style={styles.contentText}>
                        <Text variant="bodyMedium" style={styles.price}>{item.price}</Text>

                        <Text variant="titleMedium" style={styles.title}>{<MaterialIcons name="location-pin" color='#336aea' size={15} />}{item.district}</Text>
                    </Card.Content>
                    <Divider />
                    <Card.Content style={styles.cardContent}>
                        <Text variant="bodyMedium" style={styles.propertyDetailText}>{<MaterialCommunityIcons name="bed" color='#336aea' size={25} />}{item.bed} Bed</Text>
                        <Text variant="bodyMedium" style={styles.propertyDetailText}>{<FontAwesome name="bath" color='#336aea' size={25} />}{item.bath} Bath</Text>
                        <Text variant="bodyMedium" style={styles.propertyDetailText}>{<MaterialCommunityIcons name="car-arrow-left" color='#336aea' size={25} />}{item.parking} Parking</Text>
                    </Card.Content>
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
                    placeholder="Search"
                    onChangeText={text => {
                        onSearch(text)
                    }}
                    value={searchQuery}
                    iconColor='gray'
                    style={styles.searchBar}
                />
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <MaterialCommunityIcons name="filter-variant" color='black' size={35} style={styles.filterIcon} onPress={openMenu} />

                        // <SimpleLineIcons
                        //     name="equalizer" size={25} style={styles.filterIcon} color="black" onPress={openMenu} />
                    }>
                    <Menu.Item
                        onPress={() => {
                            console.log('Low to High Price was pressed');
                        }}
                        title="Low to High Price"
                    />
                    <Menu.Item
                        onPress={() => {
                            console.log('High to Low Pricewas pressed');
                        }}
                        title="High to Low Price"
                    />
                    <Menu.Item
                        onPress={() => {
                            console.log('Sort by Name was pressed');
                            let templist = propertydata.sort((a, b) =>
                                a.title > b.title ? 1 : -1)
                            setPropertyData(templist)

                        }}
                        title="Sort by Name"
                    // disabled
                    />
                </Menu>
            </View>

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={propertydata}
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