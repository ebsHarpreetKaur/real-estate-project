import { View, Text, Image, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";
import { ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { REACT_NATIVE_BASE_URL, today } from '../../api/context/auth';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { ALERT_TYPE, Toast, Dialog } from 'react-native-alert-notification';
//import MapView from 'react-native-maps';


const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];
const AddProperty = (data) => {
    
    // const dd = params.route.params.data
   
    
    const navigation = useNavigation();
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [Area_sqft, setArea_sqft] = useState("");
    const [Bedrooms, setBedrooms] = useState("");
    const [dealerContact, setDealerContact] = useState("");
    const [Bathrooms, setBathrooms] = useState("");
    const phoneInput = useRef(null);
    const [value1, setValue1] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [district, setDistrict] = useState("");
    const [deal, setDeal] = useState("");
    const [type, setType] = useState("");

    const [location, setLocation] = useState("");

    const [description, setdescription] = useState("");
    const [parking, setParking] = useState("");
    const [Default_Image, setDefault_Image] = useState("");
    const [Price, setPrice] = useState("");
    const [Airconditioned, setAirconditioned] = useState("");
    const [Phone, setPhone] = useState("");
    const [Internet, setInternet] = useState("");
    const [CityView, setCityView] = useState("");
    const [FamilyyVilla, setFamilyyVilla] = useState("");
    const [Available, setAvailable] = useState("");
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [image, setImage] = useState(null);
    const [mimeType, setMimeType] = useState(null);
    const [Dropvalue, setDropValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'House', value: 'house' },
        { label: 'Apartment', value: 'apartment' },
        { label: 'Family Villa', value: 'villa' },

    ]);

    const [open, setOpen] = useState(false);

    const [Dropvalue2, setDropValue2] = useState(null);
    const [Dropvalue3, setDropValue3] = useState(null);
    const [Dropvalue4, setDropValue4] = useState(null);
    const [Dropvalue5, setDropValue5] = useState(null);
    const [Dropvalue6, setDropValue6] = useState(null);
    const [Dropvalue7, setDropValue7] = useState(null);

    const [items2, setItems2] = useState([
        { label: 'Sale', value: 'sale' },
        { label: 'Rent', value: 'rent' },
    ]);
    const [items3, setItems3] = useState([
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
    ]);
    const [items4, setItems4] = useState([
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
    ]);
    const [items5, setItems5] = useState([
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
    ]);
    const [items6, setItems6] = useState([
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
    ]);
    const [items7, setItems7] = useState([
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
    ]);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);
    const [open7, setOpen7] = useState(false);

    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     console.log(result,"result");

    //     if (!result.canceled) {
    //         setDefault_Image(result.assets[0].uri);
    //     }
    // };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log("result", result)
            setDefault_Image(result.assets[0].uri);
            setMimeType(result.assets[0].mimeType);
        }
    };

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };


    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };


    const propertyDetails = [{
        air_conditioned: Airconditioned,
        isInternet: Internet,
        family_villa: FamilyyVilla,
        internet: CityView,
        phone: Phone,

    }];
    const [nameError, setNameError] = useState('');
    const [PriceError, setPriceError] = useState('');
    const [DealTypeError, setDealTypeError] = useState('');
    const [BedroomError, setBedroomError] = useState('');
    const [AreqSqftError, setAreqSqftError] = useState('');
    const [BathroomsError, setBathroomsError] = useState('');
    const [PropertyTypeError, setPropertyTypeError] = useState('');
    const [ParkingError, setParkingError] = useState('');
    const [DescriptionError, setDescriptionError] = useState('');
    const [DealerContactError, setDealerContactError] = useState('');
    const [DistrictError, setDistrictError] = useState('');
    const [PhotoError, setPhotoError] = useState('');
    const [LocationError, setLocationError] = useState('');
    const [isAvailableError, setisAvailableError] = useState('');
    const [PropertyDetailsError, setPropertyDetailsError] = useState('');



    const handleSubmitProperty = async () => {
        console.log("heree first",)
        if (name.length < 5 || !/^[a-zA-Z]+$/.test(name)) {
            setNameError('Name must be at least 5 alpha characters.');
        }
        else if (!Default_Image) {
            alert('Please select an image first');
            return;
        }
        else if (Price.length < 0 || !/^\d+$/.test(Price)) {
            setPriceError('Price must be a numeric value.');
        }
        else if (Bedrooms.length < 0 || !/^\d+$/.test(Bedrooms)) {
            setPriceError('Bedrooms must be a numeric value.');
        }
        else {
            // setError('');
        }

        if (!mimeType) {
            alert('Mime type is not defined');
            return;
        }

        const fileExtension = mimeType.split('/')[1];

        const formData = new FormData();
        console.log("fileExtension", fileExtension)

        const AuthUserData = await AsyncStorage.getItem('auth_user');
        const parsedAuthUserData = JSON.parse(AuthUserData);

       
        formData.append('photo', {
            uri: Default_Image,
            type: mimeType,
            name: `${name}.${fileExtension}`,
        });
        formData.append('user_id', parsedAuthUserData?.user?._id);
        formData.append('dealer_contact', formattedValue);
        formData.append('location', data?.route?.params?.params);  // formData.append('location', JSON.stringify({ lat: 123, lng: 456 }));
        formData.append('bedrooms', Bedrooms);
        formData.append('bathrooms', Bathrooms);
        formData.append('area_sqft', Area_sqft);
        formData.append('property_name', name);
        formData.append('deal', Dropvalue2);
        formData.append('type', Dropvalue);
        formData.append('parking', parking);
        formData.append('description', description);
        formData.append('assigned_buyer', "");
        formData.append('isAvailable', Available);
        formData.append('property_details', JSON.stringify(propertyDetails));
        formData.append('dealer', JSON.stringify(parsedAuthUserData?.user));
        formData.append('district', "");
        formData.append('price', Price);
        formData.append('status', true);
        formData.append('prop_post_date', today);
        formData.append('pincode', "");
        try {
            await axios.post(`${REACT_NATIVE_BASE_URL}property/add`,
                formData
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${parsedAuthUserData?.access_token}`
                    },
                })
                .then(function (response) {
                    // console.log('FormData:', formData);
                    console.log("add property response - - -", response?.data);
                    if (response) {
                        Dialog.show({
                            type: ALERT_TYPE.SUCCESS,
                            // title:  ``,
                            textBody: 'Property added successfully',
                            button: 'close',
                        });
                    }
                    navigation.navigate("Account")

                })

                .catch(function (error) {
                    // console.log('FormData:', formData);

                    if (error.response) {
                        console.error("Response data:", error.response.data);
                        console.error("Response status:", error.response.status);
                        console.error("Response headers:", error.response.headers);
                    } else if (error.request) {
                        console.error("Request data:", error.request);
                    } else {
                        console.error("Error message:", error.message);
                    }
                    console.log('Error making POST request', error);


                })
        } catch (error) {
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                console.error("Request data:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
            console.log('Error making POST request', error);
        }
    }

    const handleCancelAddProperty = () => {
        navigation.navigate("Account")
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ flex: 1, marginHorizontal: 11, }}>

                <View style={{ marginVertical: 5 }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: "#000"
                    }}>
                        Add Property
                    </Text>
                </View>
                <ScrollView >
                    <View style={{ display: "flex", flexDirection: "row", }}>
                        <View style={{ marginBottom: 12, }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 400,
                                marginVertical: 3
                            }}>Name</Text>

                            <View style={{
                                width: "100%",
                                height: 40,
                                width: 170,
                                borderColor: "#ccc",
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 12
                            }}>
                                <TextInput
                                    placeholder=''
                                    placeholderTextColor={"#000"}
                                    // keyboardType='email-address'
                                    style={{
                                        width: "100%"
                                    }}
                                    onChangeText={(text) => {
                                        setName(text);
                                        if (text.length >= 3 && /^[a-zA-Z]+$/.test(text)) {
                                            setNameError('');
                                        } else {
                                            setNameError('Name must be at least 5 alphabetical characters.');
                                        }
                                    }}

                                />

                            </View>
                            {nameError ? <Text style={{ color: 'red', marginTop: 5, fontSize: 9, }}>{nameError}</Text> : null}
                        </View>

                        <View style={{ marginBottom: 12, marginLeft: "4%" }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 400,
                                marginVertical: 3
                            }}>Price</Text>

                            <View style={{
                                width: "100%",
                                height: 40,
                                width: 150,
                                borderColor: "#ccc",
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 22
                            }}>
                                <TextInput
                                    placeholder=''
                                    placeholderTextColor={"#000"}
                                    // keyboardType='email-address'
                                    style={{
                                        width: "100%"
                                    }}
                                    onChangeText={(text) => {
                                        setPrice(text);
                                        if (text.length > 0 && /^\d+$/.test(text)) {
                                            setPriceError('');
                                        } else {
                                            setPriceError('Price must be a numeric value.');
                                        }
                                    }}
                                />

                            </View>
                            {PriceError ? <Text style={{ color: 'red', marginTop: 5, fontSize: 9 }}>{PriceError}</Text> : null}
                        </View>
                    </View>
                    <View style={{ marginBottom: 12, }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 400,
                            marginVertical: 3
                        }}>Deal type</Text>

                        {/* <View style={{
                                width: "100%",
                                height: 40,
                                width: 108,
                                borderColor: "#ccc",
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 12
                            }}> */}
                        <DropDownPicker
                            open={open2}
                            value={Dropvalue2}
                            items={items2}
                            setOpen={setOpen2}
                            setValue={setDropValue2}
                            setItems={setItems2}
                            // searchable={true}
                            placeholder="Select deal type"
                            searchPlaceholder="Search..."
                            style={styles.dropdown1}
                            dropDownContainerStyle={styles.dropdownContainer1}
                        />
                        {/* </View> */}
                    </View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ marginBottom: 12 }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 400,
                                marginVertical: 3
                            }}>Bedroom</Text>

                            <View style={{
                                width: "100%",
                                height: 40,
                                width: 108,
                                borderColor: "#ccc",
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 12
                            }}>
                                <TextInput
                                    placeholder=''
                                    placeholderTextColor={"#000"}
                                    // keyboardType='email-address'
                                    style={{
                                        width: "100%"
                                    }}
                                    onChangeText={(text) => {
                                        setBedrooms(text);
                                        if (text.length > 0 && /^\d+$/.test(text)) {
                                            setBedroomError('');
                                        } else {
                                            setBedroomError('Bedrooms must be a numeric value.');
                                        }
                                    }}
                                />
                            </View>
                            {BedroomError ? <Text style={{ color: 'red', marginTop: 5, fontSize: 9 }}>{BedroomError}</Text> : null}
                        </View>
                        <View style={{ marginBottom: 12, marginLeft: "4%" }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 400,
                                marginVertical: 3
                            }}>Area Sqft</Text>

                            <View style={{
                                width: "100%",
                                height: 40,
                                width: 108,
                                borderColor: "#ccc",
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 22
                            }}>
                                <TextInput
                                    placeholder=''
                                    placeholderTextColor={"#000"}
                                    // keyboardType='email-address'
                                    style={{
                                        width: "100%"
                                    }}
                                    onChangeText={(text) => {
                                        setArea_sqft(text)
                                        if (text.length > 0 && /^\d+$/.test(text)) {
                                            setAreqSqftError('');
                                        } else {
                                            setAreqSqftError('Area Sqft must be a numeric value.');
                                        }
                                    }}
                                />
                            </View>
                            {AreqSqftError ? <Text style={{ color: 'red', marginTop: 5, fontSize: 9 }}>{AreqSqftError}</Text> : null}
                        </View>

                        <View style={{ marginBottom: 12, marginLeft: "4%" }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 400,
                                marginVertical: 3
                            }}>Bathrooms</Text>

                            <View style={{
                                width: "100%",
                                height: 40,
                                width: 90,
                                borderColor: "#ccc",
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 22
                            }}>
                                <TextInput
                                    placeholder=''
                                    placeholderTextColor={"#000"}
                                    // keyboardType='email-address'
                                    style={{
                                        width: "100%"
                                    }}
                                    onChangeText={(text) => {
                                        setBathrooms(text)
                                        if (text.length > 0 && /^\d+$/.test(text)) {
                                            setBathroomsError('');
                                        } else {
                                            setBathroomsError('Bathrooms must be a numeric value.');
                                        }

                                    }}
                                />
                            </View>
                            {BathroomsError ? <Text style={{ color: 'red', marginTop: 5, fontSize: 9 }}>{BathroomsError}</Text> : null}
                        </View>
                    </View>
                    {/* <View style={{ display: "flex", flexDirection: "row" }}> */}

                    <View style={{ marginBottom: 12, }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 400,
                            marginVertical: 3
                        }}>Property type</Text>

                        {/* <View style={{exp+unify-react-native://expo-development-client/?url=http%3A%2F%2F192.168.1.12%3A8081
                                width: "100%",
                                height: 40,
                                width: 108,
                                borderColor: "#ccc",
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 22
                            }}> */}
                        <DropDownPicker
                            open={open}
                            value={Dropvalue}
                            items={items}
                            setOpen={setOpen}
                            setValue={setDropValue}
                            setItems={setItems}
                            // searchable={true}
                            placeholder="Select type"
                            searchPlaceholder="Search..."
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownContainer}
                        />
                        {/* </View> */}
                    </View>
                    {/* </View> */}
                    <View style={{ marginBottom: 12, marginLeft: "1%" }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 400,
                            marginVertical: 3
                        }}>Parking</Text>

                        <View style={{
                            width: "100%",
                            height: 40,
                            width: 108,
                            borderColor: "#ccc",
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder=''
                                placeholderTextColor={"#000"}
                                // keyboardType='email-address'
                                style={{
                                    width: "100%"
                                }}
                                onChangeText={(text) => {
                                    setParking(text)
                                    if (text.length > 0 && /^\d+$/.test(text)) {
                                        setParkingError('');
                                    } else {
                                        setParkingError('Parking must be a numeric value.');
                                    }
                                }}
                            />
                        </View>
                        {ParkingError ? <Text style={{ color: 'red', marginTop: 5, fontSize: 9 }}>{ParkingError}</Text> : null}
                    </View>
                    <View style={{ marginBottom: 12, }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 400,
                            marginVertical: 3
                        }}>Description</Text>

                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: "#ccc",
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22

                        }}>
                            <TextInput
                                placeholder=''
                                placeholderTextColor={"#000"}
                                secureTextEntry={isPasswordShown}
                                style={{
                                    width: "100%",
                                }}
                                onChangeText={(text) => {
                                    setdescription(text)
                                    if (text.length >= 3 && /^[a-zA-Z]+$/.test(text)) {
                                        setDescriptionError('');
                                    } else {
                                        setDescriptionError('Description must be at least 4 alphabetical characters.');
                                    }
                                }}
                            />
                        </View>
                        {DescriptionError ? <Text style={{ color: 'red', marginTop: 5, fontSize: 9 }}>{DescriptionError}</Text> : null}
                    </View>
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 400,
                            marginVertical: 3
                        }}>Dealer contact</Text>

                        <View style={{
                            // width: "100%",
                            // height: 48,
                            // borderColor: "#ccc",
                            // borderWidth: 1,
                            // borderRadius: 8,
                            // alignItems: "center",
                            // flexDirection: "row",
                            // justifyContent: "space-between",
                            // // paddingLeft: 22
                        }}>
                            <PhoneInput
                                ref={phoneInput}
                                defaultValue={value1}
                                defaultCode="IN"
                                layout="first"
                                onChangeText={(text) => {
                                    setValue1(text);
                                }}
                                onChangeFormattedText={(text) => {
                                    setFormattedValue(text);
                                }}
                                countryPickerProps={{ withAlphaFilter: true }}
                                withShadow
                            // autoFocus
                            />
                        </View>
                    </View>

                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ marginBottom: 12 }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 400,
                                marginVertical: 3
                            }}>District</Text>

                            <View style={{
                                width: "100%",
                                height: 40,
                                width: 170,
                                borderColor: "#ccc",
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 12
                            }}>
                                <TextInput
                                    placeholder=''
                                    placeholderTextColor={"#000"}
                                    // keyboardType='email-address'
                                    style={{
                                        width: "100%"
                                    }}
                                    onChangeText={(text) => {
                                        setDistrict(text)
                                        if (text.length >= 3 && /^[a-zA-Z]+$/.test(text)) {
                                            setDistrictError('');
                                        } else {
                                            setDistrictError('District must be at least 4 alphabetical characters.');
                                        }
                                    }}
                                />
                            </View>
                            {DistrictError ? <Text style={{ color: 'red', marginTop: 5, fontSize: 9 }}>{DistrictError}</Text> : null}
                        </View>
                        <View style={{ marginBottom: 12, marginLeft: "4%" }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 400,
                                marginVertical: 3
                            }}>Select image</Text>

                            {/* <View style={{
                                width: "100%",
                                height: 40,
                                width: 170,
                                borderColor: "#ccc",
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 22
                            }}> */}
                            <View style={styles.container4}>
                                <Button title="Pick an image" onPress={pickImage} />
                                {Default_Image && <Image source={{ uri: Default_Image }} style={styles.image} />}
                            </View>
                            {/* </View> */}
                        </View>
                    </View>
                    {/* <View style={styles.container}>
                        {renderLabel()}
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select item' : '...'}
                            searchPlaceholder="Search..."
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChangeText={itextem => {
                                setValue(item.value);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color={isFocus ? 'blue' : 'black'}
                                    name="Safety"
                                    size={20}
                                />
                            )}
                        />
                    </View> */}
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Mapview")
                    }}>
                        
                        <View style={{ marginBottom: 12 }} >
                            <Text style={{
                                foentSize: 15,
                                fontWeight: 400,
                                marginVertical: 3
                            }}>Location</Text>

                            <View style={{
                                width: "100%",
                                height: 48,
                                borderColor: "#ccc",
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 22
                            }}>

                                {/* <MapView
                                    style={styles.map}
                                    
                                /> */}
                                {/* <TextInput
                                placeholder='location'
                                placeholderTextColor={"#ccc"}
                                secureTextEntry={isPasswordShown}
                                style={{
                                    width: "100%"
                                }}
                                onChangeText={(text) => {
                                    setLocation(text)
                                    }}
                            />  */}

                            </View>
                        </View>
                    </TouchableOpacity>
                    {/* <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ marginBottom: 12 }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 400,
                                marginVertical: 3
                            }}>District</Text>

                            <View style={{
                                width: "100%",
                                height: 40,
                                width: 170,
                                borderColor: "#ccc",
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 12
                            }}>
                                <TextInput
                                    placeholder=''
                                    placeholderTextColor={"#000"}
                                    // keyboardType='email-address'
                                    style={{
                                        width: "100%"
                                    }}
                                    onChangeText={(text) => {
                                        setEmail(text)
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ marginBottom: 12, marginLeft: "4%" }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 400,
                                marginVertical: 3
                            }}>Default image</Text>

                            <View style={{
                                width: "100%",
                                height: 40,
                                width: 170,
                                borderColor: "#ccc",
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 22
                            }}>
                                <TextInput
                                    placeholder=''
                                    placeholderTextColor={"#000"}
                                    // keyboardType='email-address'
                                    style={{
                                        width: "100%"
                                    }}
                                    onChangeText={(text) => {
                                        setEmail(text)
                                    }}
                                />
                            </View>
                        </View>
                    </View> */}
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 8
                    }}>
                        <Checkbox
                            style={{ marginRight: 8 }}
                            value={Available}
                            onValueChange={setAvailable}
                            color={Available ? "#0066b2" : "#ccc"}
                        />
                        <Text>is Available</Text>
                    </View>
                    <View style={styles.container3}>
                        <TouchableOpacity onPress={toggleFormVisibility} style={styles.iconButton}>
                            <View style={{ display: "flex", flexDirection: "row" }}>

                                <Text style={{ marginTop: "2%" }}>More details</Text>
                                <MaterialCommunityIcons name={showForm ? 'chevron-down' : 'chevron-up'} color="#ccc" size={25} style={{ marginTop: "1.5%" }} />
                            </View>
                        </TouchableOpacity>
                        {showForm && (
                            <View style={styles.form}>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <View style={{ marginLeft: "1%" }}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: 400,
                                            marginVertical: 3
                                        }}>City view</Text>

                                        <DropDownPicker
                                            open={open3}
                                            value={CityView}
                                            items={items3}
                                            setOpen={setOpen3}
                                            setValue={setCityView}
                                            setItems={setItems3}
                                            // searchable={true}
                                            placeholder="Select"
                                            searchPlaceholder="Search..."
                                            style={styles.dropdown1}
                                            dropDownContainerStyle={styles.dropdownContainer1}
                                        />

                                    </View>
                                    <View style={{ marginBottom: 12, marginLeft: "4%" }}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: 400,
                                            marginVertical: 3
                                        }}>Family villa</Text>

                                        <DropDownPicker
                                            open={open4}
                                            value={FamilyyVilla}
                                            items={items4}
                                            setOpen={setOpen4}
                                            setValue={setFamilyyVilla}
                                            setItems={setItems4}
                                            // searchable={true}
                                            placeholder="Select"
                                            searchPlaceholder="Search..."
                                            style={styles.dropdown1}
                                            dropDownContainerStyle={styles.dropdownContainer1}
                                        />
                                    </View>
                                    <View style={{ marginBottom: 12, marginLeft: "4%" }}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: 400,
                                            marginVertical: 3
                                        }}>Air conditioned</Text>


                                        <DropDownPicker
                                            open={open5}
                                            value={Airconditioned}
                                            items={items5}
                                            setOpen={setOpen5}
                                            setValue={setAirconditioned}
                                            setItems={setItems5}
                                            // searchable={true}
                                            placeholder="Select"
                                            searchPlaceholder="Search..."
                                            style={styles.dropdown1}
                                            dropDownContainerStyle={styles.dropdownContainer1}
                                        />
                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <View style={{ marginBottom: 12, marginLeft: "2%" }}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: 400,
                                            marginVertical: 3
                                        }}>Phone</Text>

                                        <DropDownPicker
                                            open={open6}
                                            value={Phone}
                                            items={items6}
                                            setOpen={setOpen6}
                                            setValue={setPhone}
                                            setItems={setItems6}
                                            // searchable={true}
                                            placeholder="Select"
                                            searchPlaceholder="Search..."
                                            style={styles.dropdown1}
                                            dropDownContainerStyle={styles.dropdownContainer1}
                                        />
                                    </View>
                                    <View style={{ marginBottom: 12, marginLeft: "4%" }}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: 400,
                                            marginVertical: 3
                                        }}>Internet</Text>


                                        <DropDownPicker
                                            open={open7}
                                            value={Internet}
                                            items={items7}
                                            setOpen={setOpen7}
                                            setValue={setInternet}
                                            setItems={setItems7}
                                            // searchable={true}
                                            placeholder="Select"
                                            searchPlaceholder="Search..."
                                            style={styles.dropdown1}
                                            dropDownContainerStyle={styles.dropdownContainer1}
                                        />
                                    </View>
                                </View>
                                <View style={{ marginBottom: 12, marginLeft: "2%" }}>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: 400,
                                        marginVertical: 3
                                    }}>Air conditioned</Text>


                                    <DropDownPicker
                                        open={open5}
                                        value={Airconditioned}
                                        items={items5}
                                        setOpen={setOpen5}
                                        setValue={setAirconditioned}
                                        setItems={setItems5}
                                        // searchable={true}
                                        placeholder="Select"
                                        searchPlaceholder="Search..."
                                        style={styles.dropdown1}
                                        dropDownContainerStyle={styles.dropdownContainer1}
                                    />
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>

                {/* <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? "#000"ry : undefined}
                    />

                    <Text>I agree to the terms and conditions</Text>
                </View> */}
                <View style={{ display: "flex", flexDirection: "row", marginTop: "4%", marginBottom: "4%" }}>
                    <TouchableOpacity style={styles.propcancelbutton}>
                        <Text style={styles.propcancelbuttonText} onPress={() => {
                            handleCancelAddProperty()
                        }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.propbutton} onPress={() => {
                        handleSubmitProperty()
                    }}>
                        <Text style={styles.propbuttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default AddProperty


const styles = {
    dropdown1: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderRadius: 5,
        width: "66%"
    },
    dropdownContainer1: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        width: "66%"

    },
    dropdown: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderRadius: 5,
        width: "66%",

    },
    dropdownContainer: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        width: "66%"

    },
    container4: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 150,
        height: 120,
        marginTop: "3%"
    },
    container3: {
        backgroundColor: 'white',
        // padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        marginBottom: 20,
    },
    form: {
        width: '80%',
        // padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 8,
    },
    propbutton: {
        backgroundColor: "#0066b2",
        borderRadius: 5,
        padding: 4,
        marginHorizontal: 15,
        // marginLeft: "80%",
        width: 60,
    },
    propbuttonText: {
        fontSize: 13,
        color: '#fff',
        textAlign: 'center',
        padding: "4%"
    },
    propcancelbutton: {
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 4,
        marginHorizontal: 15,
        marginLeft: "55%",
        width: 60,
        borderColor: "#ccc",
        borderWidth: 1,
    },
    propcancelbuttonText: {
        fontSize: 13,
        color: '#999',
        textAlign: 'center',
        padding: "4%"
    },
};
