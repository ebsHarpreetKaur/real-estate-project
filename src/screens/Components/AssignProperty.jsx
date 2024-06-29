import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppBar from '../Components/AppBar';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'

export default function AssignProperty(data) {
    const propertyData = data.route.params.data

    // console.log("data.................", propertyData)
    const [name, setName] = useState('')
    const [text, setText] = React.useState("");
    const [formData, setFormData] = React.useState({
        // Initialize form fields with property data
        title: propertyData.title || '',
        price: propertyData.price || '',
        location: propertyData.location || '',
        bed: propertyData.bed || '',
        bath: propertyData.bath || '',
        area_sqft: propertyData.area_sqft || '',
      });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <>
            <AppBar />
            <SafeAreaView>
                <TextInput
                    label="Title"
                    value={formData.title}
                    onChangeText={(text) => handleChange('title', text)}
                />
                <TextInput
                    label="Price"
                    value={formData.price}
                    onChangeText={(text) => handleChange('price', text)}
                />
                <TextInput
                    label="Location"
                    value={formData.location}
                    onChangeText={(text) => handleChange('location', text)}
                />
                <TextInput
                    label="Bed"
                    value={formData.bed}
                    onChangeText={(text) => handleChange('bed', text)}
                />
                <TextInput
                    label="Bath"
                    value={formData.bath}
                    onChangeText={(text) => handleChange('bath', text)}
                />
                <TextInput
                    label="Area (sqft)"
                    value={formData.area_sqft}
                    onChangeText={(text) => handleChange('area_sqft', text)}
                />
                <Button mode="contained" onPress={handleSubmit}>
                    Assign
                </Button>
            </SafeAreaView >
        </>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        width: '70%',
    },
});