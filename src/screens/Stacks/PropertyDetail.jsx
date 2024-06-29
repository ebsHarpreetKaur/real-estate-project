import { StyleSheet, View, Share, Image, StatusBar, ScrollView, FlatList } from 'react-native';
import AppBar from '../Components/AppBar';
import { Avatar, Button, Card, Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { REACT_NATIVE_PROPERTY_URL } from '../../api/context/auth';
// import { theme_color } from '../../../config';

export default function PropertyDetail(props) {
  const navigation = useNavigation();
  const data = props.route.params.data
  const property_details = [props.route.params.data?.property_details]
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

  console.log("props", data)

  const handlePropertyAssign = (data) => {
    console.log(data, "data")
    navigation.navigate('AssignProperty', { data: data })

    console.log("assign")
  }
  return (
    <>
      <AppBar />
      <ScrollView style={styles.container}>
        {/* <Image source={{ uri: data.photo }} style={{ height: 350, width: "100%" }} /> */}
        <Card style={styles.flatListContainer} mode='elevated'>

          <Card.Cover source={{ uri: data?.photo ? `${REACT_NATIVE_PROPERTY_URL}${data?.photo}` : "https://www.riserproperty.com/property-not-found.svg" }} style={styles.mainphoto} />
          <Text variant="bodyLarge" style={styles.dealText}>{data.deal}</Text>

          {/* <Card.Title title="Property Owner" subtitle="Active" left={LeftContent} /> */}
          <Card.Content style={styles.contentText}>
          <Text variant="bodyMedium" style={styles.price}>{data.property_name}</Text>

            <Text variant="bodyMedium" style={styles.price}>${data.price}</Text>

            <Text variant="titleSmall" style={styles.title}>{<MaterialIcons name="location-pin" color="#0066b2" size={10} />}{data.district}</Text>
            <Button style={{ fontWeight: "bold", fontSize: 20 }} onPress={() => handlePropertyAssign(data)}>Share</Button>

          </Card.Content>
          <Divider />
          <Card.Content style={styles.cardContent}>
            <View>
              <MaterialCommunityIcons name="bed" color="#0066b2" size={25} />
              <Text variant="bodyMedium" style={styles.propertyDetailText}>{data.bedrooms} Bed</Text>
            </View>

            <View>
              <FontAwesome name="bath" color="#0066b2" size={25} />
              <Text variant="bodyMedium" style={styles.propertyDetailText}>{data.bathrooms} Bath</Text>
            </View>
            <View>
              <MaterialCommunityIcons name="car-arrow-left" color="#0066b2" size={25} />
              <Text variant="bodyMedium" style={styles.propertyDetailText}>{data.parking} Parking</Text>
            </View>


          </Card.Content>
          <Divider />
          <View style={{ padding: 10 }}>
            <Text variant="bodyMedium" style={{ fontWeight: "bold", fontSize: 15,  }}>Description</Text>

            <Card.Actions >
              <Text style={{ color: "black", fontSize: 15,marginRight:"55%" }}>{data.description}</Text>
            </Card.Actions>
          </View>
          <Divider />
          <View style={{ padding: 10 }}>
            <Text variant="bodyMedium" style={{ fontWeight: "bold", fontSize: 15 }}>Photos</Text>
            <ScrollView
              horizontal={true}
            >
              <FlatList
                data={data.images}
                keyExtractor={item => item.id.toString()}
                numColumns={3}
                renderItem={({ item, index }) => (
                  <View style={{ padding: 5 }}>
                    <Image style={{ height: 200, width: 200, borderRadius: 20 }} source={{ uri: item.image }} />
                  </View>
                )}
              />
            </ScrollView>
          </View>
          <Divider />

          <View style={{ padding: 10 }}>
            <Text variant="bodyMedium" style={{ fontWeight: "bold", fontSize: 15 }}>Property Details</Text>

            <Card.Actions style={{ display: "flex", flexDirection: "column" }}>

              {property_details && property_details.map((item, index) => (
                <>
                  <View style={{ display: "flex", flexDirection: "row", marginRight: "50%" }}>

                    <View>
                      <MaterialCommunityIcons name="check-circle-outline" color="#0066b2" size={20} style={{ marginRight: 5 }} />
                      <MaterialCommunityIcons name="check-circle-outline" color="#0066b2" size={20} style={{ marginRight: 5 }} />
                      <MaterialCommunityIcons name="check-circle-outline" color="#0066b2" size={20} style={{ marginRight: 5 }} />
                      <MaterialCommunityIcons name="check-circle-outline" color="#0066b2" size={20} style={{ marginRight: 5 }} />
                      <MaterialCommunityIcons name="check-circle-outline" color="#0066b2" size={20} style={{ marginRight: 5 }} />
                    </View>
                    <View>
                      <View>
                        <Text style={{ color: "black", fontSize: 15 }}>City view : {item.city_view ? item.city_view : "N/A"}</Text>
                      </View>
                      <View>
                        <Text style={{ color: "black", fontSize: 15 }}>Air conditioned : {item.air_conditioned ? item.air_conditioned : "N/A"}</Text>
                      </View>
                      <View>
                        <Text style={{ color: "black", fontSize: 15 }}>Contact : {item.phone ? item.phone : "N/A"}</Text>
                      </View>
                      <View>
                        <Text style={{ color: "black", fontSize: 15 }}>Family villa : {item.family_villa ? item.family_villa : "N/A"}</Text>
                      </View>
                      <View>
                        <Text style={{ color: "black", fontSize: 15 }}>Internet : {item.internet ? item.internet : "N/A"}</Text>
                      </View>
                    </View>

                  </View>

                </>

              ))}
            </Card.Actions>
          </View>

          <Divider />

          <View style={{ padding: 10 }}>
            <Text variant="bodyMedium" style={{ fontWeight: "bold", fontSize: 15 }}>Contact</Text>

            <Card.Actions >
              <Text style={{ color: "#0066b2", fontWeight: "bold", fontSize: 15, marginRight: "30%" }}>{data.dealer}</Text>

              <Text style={{ color: "#0066b2", fontWeight: "bold" }}>{<MaterialCommunityIcons name="phone" color="#0066b2" size={25} />}</Text>
              <Text style={{ color: "#0066b2", fontWeight: "bold" }}>{<MaterialCommunityIcons name="email" color="#0066b2" size={25} />}</Text>
            </Card.Actions>
          </View>

        </Card>
      </ScrollView>
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
    shadowOpacity: 0,
    height: "100%",
    width: "100%"


  },
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 12,
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
  mainphoto: {
    marginRight: 18
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
    fontSize: 15
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
    marginBottom: 30,

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
    padding: 5,
    margin: 10,
    // borderRadius:50
  },


});
