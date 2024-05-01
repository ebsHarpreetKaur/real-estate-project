import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Avatar, Button, Card, Divider } from 'react-native-paper';
import AppBar from '../Components/AppBar';
import { useEffect, useLayoutEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../api/context/Context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Appbar } from 'react-native-paper';
import { FlatList } from 'react-native';
// import { theme_color } from '../../../config';


const LeftContent = props => <Avatar.Icon {...props} icon="account-supervisor" />
const LeftContent1 = props => <Avatar.Icon {...props} icon="power-settings" />

const LeftContent2 = props => <Avatar.Icon {...props} icon="package-variant-closed" />

const AccountTab = () => {
  const navigation = useNavigation()

  // const auth_user = SecureStore.getItem('auth_user')
  // const parsedData = JSON.parse(auth_user);

  // console.log("auth_user", parsedData)

  // const [auth_user, setAuth_user] = useState([]);

  // React.useEffect(() => {
  //   const auth_user_data = async () => {
  //     let userData;
  //     userData = await SecureStore.getItemAsync('auth_user');
  //     const parsedData = JSON.parse(userData);
  //     setAuth_user(parsedData)
  //     // console.log("parsedData.......", parsedData)
  //   };

  //   auth_user_data();
  // }, []);

  // console.log("auth_user status on logout", auth_user)

  const [auth_user, setAuth_user] = useState([]);

  React.useEffect(() => {
    const auth_user_data = async () => {
      let userData;
      userData = await SecureStore.getItemAsync('auth_user');
      const parsedData = JSON.parse(userData);
      setAuth_user(parsedData)
      // console.log("parsedData.......", parsedData)
    };

    auth_user_data();
  }, []);

  console.log("auth_user.......", auth_user)


  const handleSignOut = () => {
    SecureStore.deleteItemAsync('auth_user')
    navigation.navigate("Login")

  }
  const data = [
    {
      id: 1,
      title: 'Lorem ipsum dolor',
      time: '2018-08-01 12:15 pm',
      image: 'https://images.pexels.com/photos/259646/pexels-photo-259646.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean  ligula...',
    },
    {
      id: 2,
      title: 'Sit amet, consectetuer',
      time: '2018-08-12 12:00 pm',
      image: 'https://images.pexels.com/photos/1212053/pexels-photo-1212053.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Lorem  dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula...',
    },
    {
      id: 3,
      title: 'Dipiscing elit. Aenean ',
      time: '2017-08-05 12:21 pm',
      image: 'https://images.pexels.com/photos/460695/pexels-photo-460695.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Lorem ipsum dolor sit , consectetuer  elit. Aenean commodo ligula...',
    },
    {
      id: 4,
      title: 'Commodo ligula eget dolor.',
      time: '2015-08-12 12:00 pm',
      image: 'https://images.pexels.com/photos/273244/pexels-photo-273244.jpeg?auto=compress&cs=tinysrgb&w=60000x200/48D1CC/000000',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula...',
    },
    {
      id: 5,
      title: 'Aenean massa. Cum sociis',
      time: '2013-06-12 12:11 pm',
      image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.  commodo ligula...',
    },
    {
      id: 6,
      title: 'Natoque penatibus et magnis',
      time: '2018-08-12 12:56 pm',
      image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Lorem ipsum  sit amet, consectetuer adipiscing elit. Aenean commodo ligula...',
    },
    {
      id: 7,
      title: 'Dis parturient montes, nascetur',
      time: '2018-08-12 12:33 pm',
      image: 'https://images.pexels.com/photos/1797393/pexels-photo-1797393.jpeg?auto=compress&cs=tinysrgb&w=600',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula...',
    },
    {
      id: 8,
      title: 'Ridiculus mus. Donec quam',
      time: '2018-06-12 12:44 pm',
      image: 'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Lorem ipsum  sit amet, consectetuer adipiscing elit.  commodo ligula...',
    },
    {
      id: 9,
      title: 'Felis, ultricies nec, pellentesque',
      time: '2012-07-12 12:23 pm',
      image: 'https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Lorem ipsum dolor sit amet, consectetuer  elit. Aenean commodo ligula...',
    },
  ]
  const [posts, setPosts] = useState(data)

  const handleEditProfile = () => {
    navigation.navigate("EditProfile", {
      // data: parsedData
    })
  }

  return (
    <>

      <ScrollView style={styles.container}>

        {/* <Appbar.Header statusBarHeight={0}> */}
        {/* <Appbar.BackAction onPress={() => { }} />
        <Appbar.Content title="Title" />
        <Appbar.Action icon="calendar" onPress={() => { }} />
        <Appbar.Action icon="magnify" onPress={() => { }} /> */}
        {/* </Appbar.Header> */}

        <View style={styles.headerContainer}>
          <Image
            style={styles.coverPhoto}
            source={{ uri: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D' }}
          />
          <View style={styles.profileContainer}>
            <Image
              style={styles.profilePhoto}
              source={{ uri: "https://media.istockphoto.com/id/186841959/photo/beautiful-modern-indian-woman.jpg?s=612x612&w=0&k=20&c=zFH5vouHzfXYrrFhtEulQCa9fDoJDt1X3kH0u4kOS9c=" }}
            />
            <Text style={styles.nameText}>Bhavna Ahuja</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.statCount}>1234 </Text>
          <Text style={styles.statLabel}>Properties</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bioText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            ullamcorper nisi.
          </Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.button} onPress={() => {
            handleEditProfile()
          }}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={() => {
              handleSignOut()
            }}>Sign out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <View style={styles.section2}>
            <Text style={styles.sectionTitle}>Properties</Text>
            <View style={styles.container2}>
              <FlatList
                style={styles.list}
                data={posts}
                keyExtractor={item => {
                  return item.id
                }}
                ItemSeparatorComponent={() => {
                  return <View style={styles.separator} />
                }}
                renderItem={post => {
                  const item = post.item
                  return (
                    <View style={styles.card}>
                      <Image style={styles.cardImage} source={{ uri: item.image }} />
                      <View style={styles.cardHeader}>
                        <View>
                          <Text style={styles.title}>{item.title}</Text>
                          <Text style={styles.description}>{item.description}</Text>
                          <View style={styles.timeContainer}>
                            <Image
                              style={styles.iconData}
                              source={{ uri: 'https://img.icons8.com/color/96/3498db/calendar.png' }}
                            />
                            <Text style={styles.time}>{item.time}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.cardFooter}>
                        <View style={styles.socialBarContainer}>
                          <View style={styles.socialBarSection}>
                            <TouchableOpacity style={styles.socialBarButton}>
                              <Feather onPress={() => {
                                handle_change_location()
                              }} name="edit" color="#0066b2" size={20} />
                              {/* <Image
                                style={styles.icon}
                                source={{ uri: 'https://img.icons8.com/material/96/2ecc71/visible.png' }}
                              /> */}

                            </TouchableOpacity>
                          </View>
                          <View style={styles.verticleLine}></View>

                          <View style={styles.socialBarSection}>
                            <TouchableOpacity style={styles.socialBarButton}>
                              <Feather onPress={() => {
                                handle_change_location()
                              }} name="share" color="#0066b2" size={20} />
                            </TouchableOpacity>
                          </View>
                          <View style={styles.verticleLine}></View>
                          <View style={styles.socialBarSection}>
                            <TouchableOpacity style={styles.socialBarButton}>
                              <FontAwesome5 onPress={() => {
                                handle_change_location()
                              }} name="eye" color="#0066b2" size={20} />
                            </TouchableOpacity>
                          </View>
                        </View>

                      </View>
                    </View>
                  )
                }}
              />
            </View>
          </View>

        </View>
      </ScrollView>
    </>

  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {

  },

  section2: {

    marginBottom: 16,
    // marginLeft: 15,
    marginTop: 20

  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: "5%"

  },
  sectionContent: {
    marginTop: 8,
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#DEDEDE',
  },
  sectionItem: {
    marginVertical: 4,
  },
  headerContainer: {
    alignItems: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: 180,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -70,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bioContainer: {
    padding: 15,
  },
  bioText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#A9A9A9'
  },
  section: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  statCount: {
    color: '#999',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: '#999',
  },
  button: {
    backgroundColor: "#0066b2",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  friendCard: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 2,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendsScroll: {
    paddingBottom: 10,

  },
  container2: {

    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 8,
    backgroundColor: '#ffffff',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
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
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
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
  icon: {
    width: 25,
    height: 25,
  },
  iconData: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 5,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  /******** social bar ******************/
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

};

export default AccountTab;
