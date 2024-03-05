import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import AppBar from '../Components/AppBar'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import Entypo from 'react-native-vector-icons/Entypo';


export default ChatTab = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  callsData = [
    {
      id: 1,
      name: 'Mark Doe',
      date: '12 jan',
      time: '11:14 am',
      video: false,
      image: 'https://media.istockphoto.com/id/1244900905/photo/happy-real-estate-agent-giving-to-a-couple-keys-of-their-new-home.jpg?s=612x612&w=0&k=20&c=HqjdOZzRvLWfjvSYyO_t5fkFnjmiUEQTV10iHk_pUbA=',
    },
    {
      id: 2,
      name: 'Clark Man',
      date: '12 jul',
      time: '15:58 am',
      video: false,
      image: 'https://media.istockphoto.com/id/1345853667/photo/agent-businessman-with-keys-to-a-new-home-smiling-on-the-background-of-a-new-apartment-house.jpg?s=612x612&w=0&k=20&c=Qly7WGPElJGHxNpl8ENylCwoUweveXMNC0leTdKvrp4=',
    },
    {
      id: 3,
      name: 'Jaden Boor',
      date: '12 aug',
      time: '12:45 am',
      video: true,
      image: 'https://media.istockphoto.com/id/825082848/photo/smiling-businessman-at-office.jpg?s=612x612&w=0&k=20&c=wJcvBKllY-GIpCi-gCtAB0lHp56dyqK57zaBW0OhGcw=',
    },
    {
      id: 4,
      name: 'Srick Tree',
      date: '12 feb',
      time: '08:32 am',
      video: false,
      image: 'https://media.istockphoto.com/id/1362265242/photo/portrait-of-a-smiling-young-businesswoman.jpg?s=612x612&w=0&k=20&c=AvNqcwVLavdf9we0V6UNoFzfm7IPpmB5qCBvT6g6kJg=',
    },
    {
      id: 5,
      name: 'John Doe',
      date: '12 oct',
      time: '07:45 am',
      video: true,
      image: 'https://media.istockphoto.com/id/1389993878/photo/happy-real-estate-agent-showing-a-property.jpg?s=612x612&w=0&k=20&c=1td_y6UAaLdj7UB_cYyMmC93x2CHTvMU9ZDqHjxZdy8=',
    },
    // {
    //   id: 6,
    //   name: 'John Doe',
    //   date: '12 jan',
    //   time: '09:54 am',
    //   video: false,
    //   image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
    // },
    // {
    //   id: 8,
    //   name: 'John Doe',
    //   date: '12 jul',
    //   time: '11:22 am',
    //   video: true,
    //   image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    // },
    // {
    //   id: 9,
    //   name: 'John Doe',
    //   date: '12 aug',
    //   time: '13:33 am',
    //   video: false,
    //   image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
    // },
    // {
    //   id: 10,
    //   name: 'John Doe',
    //   date: '12 oct',
    //   time: '11:58 am',
    //   video: true,
    //   image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
    // },
    // {
    //   id: 11,
    //   name: 'John Doe',
    //   date: '12 jan',
    //   time: '09:28 am',
    //   video: false,
    //   image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    // },
    // {
    //   id: 12,
    //   name: 'John Doe',
    //   date: '12 jan',
    //   time: '09:28 am',
    //   video: false,
    //   image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    // },
    // {
    //   id: 13,
    //   name: 'John Doe',
    //   date: '12 jan',
    //   time: '09:28 am',
    //   video: false,
    //   image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    // },
    // {
    //   id: 14,
    //   name: 'John Doe',
    //   date: '12 jan',
    //   time: '09:28 am',
    //   video: false,
    //   image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    // },
  ]

  const [calls, setCalls] = useState(callsData)


  const onSearch = (text) => {
    setSearchQuery(text)
    if (text == '') {
      setCalls(calls)
    } else {
      let templist = calls.filter(item => {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
      })
      setCalls(templist)
    }

  }


  const handle_chat_with_user = (item) => {
    console.log('chat data....', item)
    navigation.navigate('ChatDetail', { data: item })

  }

  const renderItem = ({ item }) => {
    var callIcon = 'https://img.icons8.com/color/48/000000/phone.png'
    if (item.video == true) {
      callIcon = 'https://img.icons8.com/color/48/000000/video-call.png'
    }
    return (
      <>
        <TouchableOpacity onPress={() => handle_chat_with_user(item)} >
          <View style={styles.row}>
            <Image source={{ uri: item.image }} style={styles.pic} />
            <View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>{item.name}</Text>
              </View>
              <View style={styles.end}>
                <Image
                  style={[styles.icon, { marginLeft: 15, marginRight: 5, width: 14, height: 14 }]}
                  source={{ uri: 'https://img.icons8.com/small/14/000000/double-tick.png' }}
                />
                <Text style={styles.time}>
                  {item.date} {item.time}
                </Text>
              </View>
            </View>
            {/* <Image style={[styles.icon, { marginRight: 50 }]} source={{ uri: callIcon }} /> */}
            <Image style={[styles.icon, { marginRight: 50 }]} source={{ uri: item.imagek }} />

          </View>
        </TouchableOpacity>
      </>

    )
  }

  return (
    <View style={{ flex: 1 }}>
      <AppBar />
      <View style={styles.headerMenu}>
        <View style={styles.inputContainer}>
          {/* <Image
            style={[styles.icon, styles.inputIcon]}
            source={{ uri: 'https://img.icons8.com/color/70/000000/search.png' }}
          /> */}

          <MaterialIcons onPress={() => {

          }} name="search" color='#DEDEDE' size={15} style={{ fontSize: 20, marginLeft: 10 }} />
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

        <MaterialCommunityIcons onPress={() => {
        }} name="filter-variant" color='#DEDEDE' size={15} style={{ fontSize: 35, margin: 5, marginTop: "4%" }} />
      </View>
      <FlatList
        extraData={calls}
        data={calls}
        keyExtractor={item => {
          return item.id
        }}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerMenu: {
    flexDirection: 'row',
    padding: 5,
    // backgroundColor: "#ffffff",

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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
  },
  icon: {
    height: 28,
    width: 28,
  },
})