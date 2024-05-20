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
import { REACT_NATIVE_USER_PROFILE_URL } from '../../api/context/auth';
// import { theme_color } from '../../../config';


const LeftContent = props => <Avatar.Icon {...props} icon="account-supervisor" />
const LeftContent1 = props => <Avatar.Icon {...props} icon="power-settings" />

const LeftContent2 = props => <Avatar.Icon {...props} icon="package-variant-closed" />

const AccountTab = () => {
  const navigation = useNavigation()
  const [auth_user, setAuth_user] = useState([]);

  useEffect(() => {
    get_user_list()
  })

  const get_user_list = async () => {
    try {
      const AuthUserData = await AsyncStorage.getItem('auth_user');
      const parsedAuthUserData = JSON.parse(AuthUserData);
      const response = await axios.get(`${REACT_NATIVE_BASE_URL}login`, {
        headers: {
          "Accept": 'application/json',
          'content-type': 'application/json',
          "Authorization": `Bearer ${parsedAuthUserData?.access_token}`
        },
      });
      console.log("userrr.......", response)
      setUserData(response?.data?.userdata);
    } catch (error) {
      console.log("Error fetching dealers:", error);
    }
  }

  const { signOut } = React.useContext(AuthContext);

  React.useEffect(() => {
    const auth_user_data = async () => {

      let userData;
      // userData = await SecureStore.getItemAsync('auth_user');
      AsyncStorage.getItem('auth_user', (err, result) => {
        const parsedData = JSON.parse(result);
        setAuth_user(parsedData)
        // console.log("parsedData...", parsedData?.user);
      });

      // console.log("parsedData.......", parsedData)
    };

    auth_user_data();
  }, []);

  // console.log("parsedData in Account", auth_user?.user);


  const handleSignOut = () => {

    signOut()


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
      data: auth_user
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
              source={{ uri: auth_user?.user?.image === "N/A" ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAACUCAMAAADxqtj8AAAAMFBMVEX///+8vLz09PS5ubn39/f7+/u2trbn5+fKysq/v7/g4ODGxsbQ0NDCwsLx8fHb29umJ3q0AAAFu0lEQVR4nO2ci3LrKgxFE8TD2Bj+/28v2Enj+LlJBM6Z6z3TOXPaqb1ChRCS4Ha7dOnSpUuXLl26lCmlZJJSZ4PkSXnThuCca5LivyG0xv8LH0Ka0DS9vdO77rZvXDDybLw9yba7J+77mobvd+1vfgAlQ6/1KvfbZ9B9kL9mRMI4OkYfpbUz4mzgiXxoNsxl4w9ATfBnQz8kQ5fFPvJ34SdmQIgOJpN94L/bcDb6zXyEPkrfzanswqFTdYPfnTd9Vdt/PvCjqG9Pcp/SfYk+yp0ye739duBHkT3BeQYe9oG/tvNRjPAR31U1fuk44RN+ReOXDS98xG+q4auOGz7id5WMpwR8NXx+s3ng1zAexTxhJ/gVPE8x+IRfGr4tBx/x27LwviR8xC8aNMii7EklZ25Box9V0vTbwuxJxUxffL0ZORb1pXZbxe1mwC9kO+a7PSwqXWarXmPkk6gEfJs79K8Ecp50gYkrbRa5pt6FENqUyO/i/3J+2fI7/ZDF3gfjvRBSSiG8N6HP4mff54ouA74xYi6TE1d33F4zYxfeGbWAF1KZHv/4zIMv8P2U83IJn/g9bHzU8A6+QeFtu4o+qkVnPrH6fHhDRUuLf7N+9DGs2yyJvnXDal7WAz5IczrNgK1UZPbhIz44+qwrFuguwhF8xMemLvV88BIa+ugpEGGOn9F0sBDHHtrNaDuQ42E0HWidJYfAR3yoaEEdF7xCXncngdEL0O9w+UzIT1CzEh+sSkGWz7ZgQTGOhqx+ELRJY4t1MC8BwwsoK0QND7xCJi06Zwd6KO5gyoh7ZK3Se9HZXJAH7nmygpCD1vvh2bsgw7c80xbKoJHPoYcmEs96hW2rcug9NB48Tgeit1n0iC0y0UMeogA9S0oQ3FcVoOdwmRh9ls+BIh0eeqzCmecxscCJI8TH6AnYVz0lIT9Qlb7JoEefWI0+buVwenCjWZO+RfElttHkoUczUR28O8GyijU9JpLMeQw9mNJhyqeh9ODWEO2rYiq/oclvC1m+RIu+NaO09LruIIs5yKO5dCZ6uEJODhh7vOjLE99jya9xuA6zsHgNhmlvBe1rn+O1P3NVRqcDU4uszCm47eJnjHxcP5jysDnlPgrbgb7PaXTgyufkdVdQY+Sa9Utp8p7D1W0Bl9zG1/bOqzm/VD7k9cew5TFz+7moi/xT+1fKu+wWVLbyQ4bTeaoLXqpR0oeMef8UX+nnk3Z1rXWfTkg2PQFH4Ja/zlcuF/jrZw0tbw0uOc0umrFaDte4o8m7jTNMdHcOPlZGlg8erNeS7lov/OqRQyJn4s/aDmt1YTScGCwg9Lp/ZsF9sHpCGQ3f/i1irYWexdlmgZSarHl5eamEcemQcPy27ZwR0x8BUV/c6TDSHy5YZN18hU3Hyoc1Vs3WLind0WEn5nbqg9aoFB5shjcrUcNRpxR3c9Suy6etjqJN/P2Ajf0A1l6Qr1u00PzC361dMZWsJtocLML6Exb8ZudPyQ1/ExuegrqP4BP+VuBmCzRSr69YWCJhHX8jvcC6Uj2l1l71BfwmPhU5+rMyz+j+BbxYLx6WaEO+rS64R110x6O/fCTvMvvSslj24YSd4C88T7mzwvOOuIxqzyb+4pml4Ge2E1fYr+HnaZJidpP0NsuyCsw7+G/2WPS42MTvZDRD7UpOOkYK+Zs//V3/oB1a6TmSmjyzLPxfWpB6JvakR56KLfm3rUcJkeAS4bHkeHC0yvHg4SABj795avA7xH5eY1WDk2CasqOG7t5aV1rIrA5ASHHwq11JID6N6bcUY/2KV9Ewj3xU3XtomMe+Kjsz/gk36HAttbWthhn/rJvrOKznxFvTFtW1bPZzrwz8cl97Kvt3/Oez3z42n5+5Z/ID/p9hT1Kr1f1t9F9iHwT/AX5q2CcCPsCvoo+aF6l+3GDW9LjHWYrH1z94p3OUenxdunTp0qVLly5d+l/pP4bOVyErLSDcAAAAAElFTkSuQmCC' : auth_user?.user?.image !== "N/A" ? `${REACT_NATIVE_USER_PROFILE_URL}${auth_user?.user?.image}` : 'data:image/png;base64,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' }}
            />
            <Text style={styles.nameText}>{auth_user?.user ? auth_user?.user?.name : auth_user?.user?.name ? auth_user?.user?.name : "Anonymous"}</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Properties</Text>
            <Text style={styles.statValue}>9</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Following</Text>
            <Text style={styles.statValue}>123</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Followers</Text>
            <Text style={styles.statValue}>456</Text>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.button} onPress={() => {
            handleEditProfile()
          }}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate("Commission", {
              params: auth_user
            })
          }}>
            <Text style={styles.buttonText}>Commission details</Text>
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
            {/* <View style={styles.container2}> */}
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
            {/* </View> */}
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
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: '#999',
    fontSize: 14,
  },
  statValue: {
    fontSize: 15,
    color: "grey"
  },
  bio: {
    padding: 20,
    fontSize: 16,
    color: '#333',
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
    padding: 6,
    marginHorizontal: 15,
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
