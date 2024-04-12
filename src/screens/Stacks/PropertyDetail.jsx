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
import { theme_color } from '../../../config';

export default function PropertyDetail(props) {
  const navigation = useNavigation();
  const data = props.route.params.data
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

          <Card.Cover source={{ uri: data.photo }} style={styles.image} />
          <Text variant="bodyLarge" style={styles.dealText}>{data.deal}</Text>

          {/* <Card.Title title="Property Owner" subtitle="Active" left={LeftContent} /> */}
          <Card.Content style={styles.contentText}>
            <Text variant="bodyMedium" style={styles.price}>{data.price}</Text>

            <Text variant="titleMedium" style={styles.title}>{<MaterialIcons name="location-pin" color={theme_color} size={15} />}{data.district}</Text>
            <Button style={{ fontWeight: "bold", fontSize: 20 }} onPress={() => handlePropertyAssign(data)}>Assign</Button>

          </Card.Content>
          <Divider />
          <Card.Content style={styles.cardContent}>
            <Text variant="bodyMedium" style={styles.propertyDetailText}>{<MaterialCommunityIcons name="bed" color={theme_color} size={25} />}{data.bed} Bed</Text>
            <Text variant="bodyMedium" style={styles.propertyDetailText}>{<FontAwesome name="bath" color={theme_color} size={25} />}{data.bath} Bath</Text>
            <Text variant="bodyMedium" style={styles.propertyDetailText}>{<MaterialCommunityIcons name="car-arrow-left" color={theme_color} size={25} />}{data.parking} Parking</Text>
          </Card.Content>
          <Divider />
          <View style={{ padding: 10 }}>
            <Text variant="bodyMedium" style={{ fontWeight: "bold", fontSize: 20 }}>Description</Text>

            <Card.Actions >
              <Text style={{ color: "black", fontSize: 15 }}>{data.description}</Text>

            </Card.Actions>
          </View>
          <Divider />
          <View style={{ padding: 10 }}>
            <Text variant="bodyMedium" style={{ fontWeight: "bold", fontSize: 20 }}>Photos</Text>
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
            <Text variant="bodyMedium" style={{ fontWeight: "bold", fontSize: 20 }}>Property Details</Text>

            <Card.Actions style={{ display: "flex", flexDirection: "column" }}>

              {data.property_details && data.property_details.map((item, index) => (
                <>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <MaterialCommunityIcons name="check-circle-outline" color={theme_color} size={25} />
                    <Text style={{ color: "black", fontSize: 18, marginLeft: 5 }}>{item.city_view}</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <MaterialCommunityIcons name="check-circle-outline" color={theme_color} size={25} />
                    <Text style={{ color: "black", fontSize: 18, marginLeft: 5 }}>{item.air_conditioned}</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <MaterialCommunityIcons name="check-circle-outline" color={theme_color} size={25} />
                    <Text style={{ color: "black", fontSize: 18, marginLeft: 5 }}>{item.phone}</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <MaterialCommunityIcons name="check-circle-outline" color={theme_color} size={25} />
                    <Text style={{ color: "black", fontSize: 18, marginLeft: 5 }}>{item.family_villa}</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <MaterialCommunityIcons name="check-circle-outline" color={theme_color} size={25} />
                    <Text style={{ color: "black", fontSize: 18, marginLeft: 5 }}>{item.internet}</Text>
                  </View>


                </>

              ))}
            </Card.Actions>
          </View>

          <Divider />

          <View style={{ padding: 10 }}>
            <Text variant="bodyMedium" style={{ fontWeight: "bold", fontSize: 20 }}>Contact</Text>

            <Card.Actions >
              <Text style={{ color: { theme_color }, fontWeight: "bold", fontSize: 15, marginRight: "30%" }}>{data.dealer}</Text>

              <Text style={{ color: { theme_color }, fontWeight: "bold" }}>{<MaterialCommunityIcons name="phone" color={theme_color} size={25} />}</Text>
              <Text style={{ color: { theme_color }, fontWeight: "bold" }}>{<MaterialCommunityIcons name="email" color={theme_color} size={25} />}</Text>
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
    height: "100%"

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
    marginBottom: 30,

  },
  propertyDetailText: {
    fontWeight: "bold",
    fontSize: 15,
    color: theme_color,
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
    backgroundColor: theme_color,
    textAlign: "center",
    color: "white",
    padding: 5,
    margin: 10,
  },


});
