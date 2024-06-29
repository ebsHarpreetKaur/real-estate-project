import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity , Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const LocationMapview= () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();

  const searchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const geoLocation = await Location.geocodeAsync(searchQuery);
      setLocation(geoLocation[0]);
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };
console.log("fdddddddddd", location)
  const handleOkPress = () => {
    // Navigate to "add to property" route and pass the selected location
    navigation.navigate("AddToProperty", { selectedLocation: location });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.icon}
            source={{ uri: 'https://img.icons8.com/color/70/000000/search.png' }}
          />
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={searchLocation}
          />
        </View>
      </View>
      <MapView style={styles.map}>
        {location && (
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        )}
      </MapView>
      <TouchableOpacity onPress={() => {
            navigation.navigate("AddProperty",{
              params: location
            });
        }} style={styles.okButton}>
    <Text style={styles.okButtonText}>OK</Text>
</TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  okButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  okButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LocationMapview;
