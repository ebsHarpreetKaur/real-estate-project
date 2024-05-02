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
    TextInput,
    Platform,
    TouchableOpacity
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as SecureStore from 'expo-secure-store';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PropertyDetail from '../Stacks/PropertyDetail';
import Entypo from 'react-native-vector-icons/Entypo';
// import { theme_color } from '../../../config';
import { ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import axios from 'axios';
import { REACT_NATIVE_BASE_URL, REACT_NATIVE_IMAGE_URL, REACT_NATIVE_PROPERTY_URL, token } from '../../api/context/auth';

const LeftContent = props => <Avatar.Icon {...props} icon="gift" />


export default function PropertiesTab() {
    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState('');
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const [visible, setVisible] = useState(false);
    const [propertydata, setPropertyData] = useState()


    const get_property_list = async () => {
        const AuthUserData = await AsyncStorage.getItem('auth_user');
        const parsedAuthUserData = JSON.parse(AuthUserData);
        await axios.get(`${REACT_NATIVE_BASE_URL}properties`, {
            headers: {
                "Accept": 'application/json',
                'content-type': 'application/json',
                "Authorization": `Bearer ${parsedAuthUserData?.access_token}`
            },
        })
            .then(function (response) {
                // console.log("property - - ", response?.data?.data?.data);
                setPropertyData(response?.data?.data?.data)
            })
            .catch(function (error) {
                console.log("error fetching properites- - -", error);
            })
    }


    useEffect(() => {
        get_property_list()
    }, [])

    const onSearch = (text) => {
        setSearchQuery(text)
        if (text == '') {
            setPropertyData(propertydata)
        } else {
            let templist = propertydata.filter(item => {
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

                    <Card.Cover source={{ uri: item.photo ? item.photo : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" }} style={styles.image} />
                    <Text variant="bodyLarge" style={styles.dealText}>{item.deal}</Text>

                    {/* <Card.Title title="Property Owner" subtitle="Active" left={LeftContent} /> */}

                    <Card.Content style={styles.cardBody}>
                        <Text variant="bodyMedium" style={styles.price}>{item.price}</Text>

                        <Text variant="titleSmall" style={styles.address}>{<MaterialIcons name="location-pin" color="#0066b2" size={10} />}{item.district}</Text>
                        <Text style={styles.squareMeters}>{item.area_sqmt} sq. m.</Text>

                    </Card.Content>
                    <Divider />
                    <Card.Content style={styles.cardContent}>
                        <Text variant="bodyMedium" style={styles.propertyDetailText}>
                            {/* {<MaterialCommunityIcons name="bed" color="#0066b2" size={25} />} */}
                            {item.bed} Bed</Text>
                        <View style={styles.verticleLine}></View>

                        <Text variant="bodyMedium" style={styles.propertyDetailText}>
                            {/* {<FontAwesome name="bath" color="#0066b2" size={25} />} */}

                            {item.bath} Bath</Text>
                        <View style={styles.verticleLine}></View>

                        <Text variant="bodyMedium" style={styles.propertyDetailText}>
                            {/* {<MaterialCommunityIcons name="car-arrow-left" color="#0066b2" size={25} />} */}
                            {item.parking} Parking</Text>
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

            {/* <SafeAreaView style={styles.container}>
                <FlatList
                    data={propertydata}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={styles.separator}>

                    </View>}
                />
            </SafeAreaView> */}

            <View style={styles.container2}>
                <FlatList
                    style={styles.list}
                    data={propertydata}
                    keyExtractor={item => {
                        return item._id
                    }}
                    ItemSeparatorComponent={() => {
                        return <View style={styles.separator} />
                    }}
                    renderItem={property => {
                        const item = property.item
                        return (
                            <View style={styles.card}>
                                <Image style={styles.cardImage} source={{
                                    uri: item.photo ? `${REACT_NATIVE_PROPERTY_URL}${item.photo}` :
                                        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                                }} />
                                <View style={styles.cardHeader}>
                                    <View>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={styles.price}>${item.price}</Text>
                                        <Text style={styles.title}>{item.district}</Text>

                                        <Text style={styles.description}>{item.description.split(' ').slice(0, 10).join(' ')}{item.description.split(' ').length > 10 ? '...' : ''}
                                        </Text>
                                        <View style={styles.timeContainer}>
                                            <Image
                                                style={styles.iconData}
                                                source={{ uri: 'https://img.icons8.com/color/96/3498db/calendar.png' }}
                                            />
                                            <Text style={styles.time}>{item.updated_at.split('T')[0]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.cardFooter}>
                                    <View style={styles.socialBarContainer}>
                                        <View style={styles.socialBarSection}>
                                            <TouchableOpacity style={styles.socialBarButton}>
                                                {<MaterialCommunityIcons name="bed" color="#0066b2" size={22} />}
                                                <Text style={styles.bed}>{item.bedrooms ? item.bedrooms : "N/A"}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.verticleLine}></View>

                                        <View style={styles.socialBarSection}>
                                            <TouchableOpacity style={styles.socialBarButton}>
                                                {<FontAwesome name="bath" color="#0066b2" size={20} />}
                                                <Text style={styles.bed}>{item.bathrooms ? item.bathrooms : "N/A"}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.verticleLine}></View>
                                        <View style={styles.socialBarSection}>
                                            <TouchableOpacity style={styles.socialBarButton}>
                                                {<MaterialCommunityIcons name="car-arrow-left" color="#0066b2" size={22} />}
                                                <Text style={styles.bed}>{item.parking ? item.parking : "N/A"}</Text>

                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View>
                            </View>
                        )
                    }}
                />
            </View>

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
    list: {
        paddingHorizontal: 8,
        backgroundColor: '#ffffff',
    },
    bed: {
        color: "#0066b2",
        marginLeft: 5,
        fontWeight: "700"
    },

    timeContainer: {
        flexDirection: 'row',
    },
    cardBody: {
        marginBottom: 10,
        padding: 10,
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
        color:"grey"
    },
    iconData: {
        width: 15,
        height: 15,
        marginTop: 5,
        marginRight: 5,
    },
    description: {
        fontSize: 15,
        color: '#888',
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
    },
    time: {
        fontSize: 13,
        color: '#808080',
        marginTop: 5,
    },

    section2: {

        marginBottom: 16,
        // marginLeft: 15,
        marginTop: 20

    },
    separator: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginLeft: "5%"

    },
    socialBarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,

    },
    socialBarSection: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    socialBarlabel: {
        marginLeft: 8,
        alignSelf: 'flex-end',
        justifyContent: 'center',

    },

    socialBarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 9,
        marginVertical: 8,
        width: "100%",
        backgroundColor: 'white',
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        backgroundColor: '#ffff',
    },
    cardImage: {
        flex: 1,
        height: 200,
        width: null,
    },
    container2: {

        flex: 1,
        marginTop: 20,
    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#DEDEDE',
    },
    address: {
        fontSize: 13,
        marginBottom: 5,
        color: "#666"
    },
    squareMeters: {
        fontSize: 14,
        marginBottom: 5,
        color: '#666'
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

    locationIcon: {
    },
    headerMenu: {
        flexDirection: 'row',
        padding: Platform.OS ? 5 : 0,
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
        justifyContent: "space-evenly",
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
        borderRadius: 15,
        // padding: 1,
        width: 50,
        height: 25,
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