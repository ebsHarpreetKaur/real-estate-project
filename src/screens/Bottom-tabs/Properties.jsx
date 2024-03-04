
// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';



// const propertyData = [
//     {
//         id: '1',
//         image: 'https://source.unsplash.com/900x900/?house',
//         price: '$250,000',
//         address: '123 Main St',
//         squareMeters: '150',
//         beds: '3',
//         baths: '2',
//         parking: '1'
//     },
//     {
//         id: '2',
//         image: 'https://source.unsplash.com/900x900/?apartment',
//         price: '$400,000',
//         address: '456 Oak Ave',
//         squareMeters: '200',
//         beds: '4',
//         baths: '3',
//         parking: '2'
//     },
//     {
//         id: '3',
//         image: 'https://source.unsplash.com/900x900/?house+front',
//         price: '$150,000',
//         address: '789 Maple Rd',
//         squareMeters: '100',
//         beds: '2',
//         baths: '1',
//         parking: '0'
//     },
//     {
//         id: '4',
//         image: 'https://source.unsplash.com/900x900/?small+house',
//         price: '$150,000',
//         address: '789 Maple Rd',
//         squareMeters: '100',
//         beds: '2',
//         baths: '1',
//         parking: '0'
//     }
// ];

// const PropertiesTab = () => {
//     const [searchText, setSearchText] = useState('');

//     const handleSearch = (text) => {
//         setSearchText(text);
//     }

//     const renderItem = ({ item }) => (
//         <TouchableOpacity style={styles.card}>
//             <Image source={{ uri: item.image }} style={styles.image} />
//             <View style={styles.cardBody}>
//                 <Text style={styles.price}>{item.price}</Text>
//                 <Text style={styles.address}>{item.address}</Text>
//                 <Text style={styles.squareMeters}>{item.squareMeters} sq. m.</Text>
//             </View>
//             <View style={styles.cardFooter}>
//                 <Text style={styles.beds}>{item.beds} beds</Text>
//                 <Text style={styles.baths}>{item.baths} baths</Text>
//                 <Text style={styles.parking}>{item.parking} parking</Text>
//             </View>
//         </TouchableOpacity>
//     );

//     const filteredData = propertyData.filter((item) => {
//         return item.address.toLowerCase().includes(searchText.toLowerCase());
//     });

//     return (
//         <View style={styles.container}>
//             <View style={styles.searchInputContainer}>
//                 <TextInput
//                     style={styles.searchInput}
//                     placeholder="Search properties..."
//                     onChangeText={handleSearch}
//                     value={searchText}
//                 />
//             </View>
//             <FlatList
//                 contentContainerStyle={styles.propertyListContainer}
//                 data={filteredData}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.id}
//             />
//         </View>
//     );
// }

// export default PropertiesTab;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 60,
//     },
//     searchInputContainer: {
//         paddingHorizontal: 20,
//     },
//     searchInput: {
//         height: 40,
//         borderWidth: 1,
//         borderColor: '#dcdcdc',
//         backgroundColor: '#fff',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10
//     },
//     propertyListContainer: {
//         paddingHorizontal: 20,
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 5,
//         marginTop: 10,
//         marginBottom: 10,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5
//     },
//     image: {
//         height: 150,
//         marginBottom: 10,
//         borderTopLeftRadius: 5,
//         borderTopRightRadius: 5,
//     },
//     cardBody: {
//         marginBottom: 10,
//         padding: 10,
//     },
//     price: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 5
//     },
//     address: {
//         fontSize: 16,
//         marginBottom: 5
//     },
//     squareMeters: {
//         fontSize: 14,
//         marginBottom: 5,
//         color: '#666'
//     },
//     cardFooter: {
//         padding: 10,
//         flexDirection: 'row',
//         borderTopWidth: 1,
//         borderTopColor: '#dcdcdc',
//         justifyContent: 'space-between',
//     },
//     beds: {
//         fontSize: 14,
//         color: '#ffa500',
//         fontWeight: 'bold'
//     },
//     baths: {
//         fontSize: 14,
//         color: '#ffa500',
//         fontWeight: 'bold'
//     },
//     parking: {
//         fontSize: 14,
//         color: '#ffa500',
//         fontWeight: 'bold'
//     }
// });












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
    TextInput
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as SecureStore from 'expo-secure-store';
import property from '../../data/PropertyConstants';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Searchbar, Menu, Avatar, Button, Card, Text, Divider, } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AppBar from '../Components/AppBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropertyDetail from '../Stacks/PropertyDetail';
import Entypo from 'react-native-vector-icons/Entypo';

const LeftContent = props => <Avatar.Icon {...props} icon="gift" />


export default function PropertiesTab() {
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

                        <Text variant="titleMedium" style={styles.title}>{<MaterialIcons name="location-pin" color='#20B2AA' size={15} />}{item.district}</Text>
                    </Card.Content>
                    <Divider />
                    <Card.Content style={styles.cardContent}>
                        <Text variant="bodyMedium" style={styles.propertyDetailText}>{<MaterialCommunityIcons name="bed" color='#20B2AA' size={25} />}{item.bed} Bed</Text>
                        <Text variant="bodyMedium" style={styles.propertyDetailText}>{<FontAwesome name="bath" color='#20B2AA' size={25} />}{item.bath} Bath</Text>
                        <Text variant="bodyMedium" style={styles.propertyDetailText}>{<MaterialCommunityIcons name="car-arrow-left" color='#20B2AA' size={25} />}{item.parking} Parking</Text>
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
                <View style={styles.inputContainer}>
                    <Image
                        style={[styles.icon, styles.inputIcon]}
                        source={{ uri: 'https://img.icons8.com/color/70/000000/search.png' }}
                    />
                    <TextInput
                        style={styles.inputs}
                        placeholder="Search..."
                        underlineColorAndroid="transparent"
                        value={searchQuery}
                        onChangeText={text => {
                            onSearch(text)
                        }}
                    />
                </View>

                <Ionicons

                    onPress={() => {
                    }} name="filter-sharp" color='#DEDEDE' size={15} style={{ fontSize: 35, margin: 5, marginTop: "4%" }} />
            </View>
            {/* <View style={styles.headerMenu}>
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
            </View> */}

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
        color: "#20B2AA",
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
        backgroundColor: "#20B2AA",
        textAlign: "center",
        color: "white",
        padding: 5,
        margin: 10,
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
});