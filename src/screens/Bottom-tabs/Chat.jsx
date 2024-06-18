import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import AppBar from '../Components/AppBar'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import Entypo from 'react-native-vector-icons/Entypo';
import { REACT_NATIVE_BASE_URL, REACT_NATIVE_USER_PROFILE_URL, token } from '../../api/context/auth'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LogBox } from 'react-native'


export default ChatTab = () => {
  // Ignore specific warnings
  LogBox.ignoreLogs([
    'Warning: ...', // Can use a specific warning message or a regex
    'Deprecation warning: ...',
  ]);

  // Ignore all warnings
  LogBox.ignoreAllLogs();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [ChatData, setChatData] = useState([]);

  const uniqueUsers = [...new Set(ChatData.map(user => user?.recipient_data?._id))].map(id => {
    return ChatData.find(user => user?.recipient_data?._id === id);
  });
  // console.log("dddd", uniqueUsers)

  useEffect(() => {
    get_chat_list()
  }, [])

  const get_chat_list = async () => {
    const AuthUserData = await AsyncStorage.getItem('auth_user');
    const parsedAuthUserData = JSON.parse(AuthUserData);
    console.log("here", parsedAuthUserData?.user)

    await axios.post(`${REACT_NATIVE_BASE_URL}chat/list`, { sender_id: parsedAuthUserData?.user?._id }, {
      headers: {
        "Accept": 'application/json',
        'content-type': 'application/json',
        "Authorization": `Bearer ${parsedAuthUserData?.access_token}`
      },
    })
      .then(function (response) {
        console.log("chat - - ", response?.data?.authChatList);
        setChatData(response?.data?.authChatList)
      })
      .catch(function (error) {
        console.log("error while fetching chat- - -", error);
      })
  }


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

  const formatTimeToIST = (dateString) => {
    const date = new Date(dateString);
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(date.getTime() + istOffset);

    let hours = istDate.getUTCHours();
    const minutes = istDate.getUTCMinutes();
    const seconds = istDate.getUTCSeconds();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert '0' to '12'

    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    const secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${minutesFormatted}:${secondsFormatted} ${ampm}`;
  };
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
    // console.log('chat data....', item)
    navigation.navigate('ChatDetail', { data: item })

  }

  const renderItem = ({ item }) => {
    console.log("skdsd", item?.recipient_data)
    const dateTimeString = item?.recipient_data?.updated_at;
    const formattedTime = formatTimeToIST(dateTimeString);
    var callIcon = 'https://img.icons8.com/color/48/000000/phone.png'
    if (item.video == true) {
      callIcon = 'https://img.icons8.com/color/48/000000/video-call.png'
    }
    return (
      <>
        <TouchableOpacity onPress={() => handle_chat_with_user(item)} >
          <View style={styles.row}>
            {/* <Image source={{ uri: item.image }} style={styles.pic} /> */}

            <Image source={{
              uri: item?.recipient_data?.image === "N/A" || item?.recipient_data?.image === "" ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAACUCAMAAADxqtj8AAAAMFBMVEX///+8vLz09PS5ubn39/f7+/u2trbn5+fKysq/v7/g4ODGxsbQ0NDCwsLx8fHb29umJ3q0AAAFu0lEQVR4nO2ci3LrKgxFE8TD2Bj+/28v2Enj+LlJBM6Z6z3TOXPaqb1ChRCS4Ha7dOnSpUuXLl26lCmlZJJSZ4PkSXnThuCca5LivyG0xv8LH0Ka0DS9vdO77rZvXDDybLw9yba7J+77mobvd+1vfgAlQ6/1KvfbZ9B9kL9mRMI4OkYfpbUz4mzgiXxoNsxl4w9ATfBnQz8kQ5fFPvJ34SdmQIgOJpN94L/bcDb6zXyEPkrfzanswqFTdYPfnTd9Vdt/PvCjqG9Pcp/SfYk+yp0ye739duBHkT3BeQYe9oG/tvNRjPAR31U1fuk44RN+ReOXDS98xG+q4auOGz7id5WMpwR8NXx+s3ng1zAexTxhJ/gVPE8x+IRfGr4tBx/x27LwviR8xC8aNMii7EklZ25Box9V0vTbwuxJxUxffL0ZORb1pXZbxe1mwC9kO+a7PSwqXWarXmPkk6gEfJs79K8Ecp50gYkrbRa5pt6FENqUyO/i/3J+2fI7/ZDF3gfjvRBSSiG8N6HP4mff54ouA74xYi6TE1d33F4zYxfeGbWAF1KZHv/4zIMv8P2U83IJn/g9bHzU8A6+QeFtu4o+qkVnPrH6fHhDRUuLf7N+9DGs2yyJvnXDal7WAz5IczrNgK1UZPbhIz44+qwrFuguwhF8xMemLvV88BIa+ugpEGGOn9F0sBDHHtrNaDuQ42E0HWidJYfAR3yoaEEdF7xCXncngdEL0O9w+UzIT1CzEh+sSkGWz7ZgQTGOhqx+ELRJY4t1MC8BwwsoK0QND7xCJi06Zwd6KO5gyoh7ZK3Se9HZXJAH7nmygpCD1vvh2bsgw7c80xbKoJHPoYcmEs96hW2rcug9NB48Tgeit1n0iC0y0UMeogA9S0oQ3FcVoOdwmRh9ls+BIh0eeqzCmecxscCJI8TH6AnYVz0lIT9Qlb7JoEefWI0+buVwenCjWZO+RfElttHkoUczUR28O8GyijU9JpLMeQw9mNJhyqeh9ODWEO2rYiq/oclvC1m+RIu+NaO09LruIIs5yKO5dCZ6uEJODhh7vOjLE99jya9xuA6zsHgNhmlvBe1rn+O1P3NVRqcDU4uszCm47eJnjHxcP5jysDnlPgrbgb7PaXTgyufkdVdQY+Sa9Utp8p7D1W0Bl9zG1/bOqzm/VD7k9cew5TFz+7moi/xT+1fKu+wWVLbyQ4bTeaoLXqpR0oeMef8UX+nnk3Z1rXWfTkg2PQFH4Ja/zlcuF/jrZw0tbw0uOc0umrFaDte4o8m7jTNMdHcOPlZGlg8erNeS7lov/OqRQyJn4s/aDmt1YTScGCwg9Lp/ZsF9sHpCGQ3f/i1irYWexdlmgZSarHl5eamEcemQcPy27ZwR0x8BUV/c6TDSHy5YZN18hU3Hyoc1Vs3WLind0WEn5nbqg9aoFB5shjcrUcNRpxR3c9Suy6etjqJN/P2Ajf0A1l6Qr1u00PzC361dMZWsJtocLML6Exb8ZudPyQ1/ExuegrqP4BP+VuBmCzRSr69YWCJhHX8jvcC6Uj2l1l71BfwmPhU5+rMyz+j+BbxYLx6WaEO+rS64R110x6O/fCTvMvvSslj24YSd4C88T7mzwvOOuIxqzyb+4pml4Ge2E1fYr+HnaZJidpP0NsuyCsw7+G/2WPS42MTvZDRD7UpOOkYK+Zs//V3/oB1a6TmSmjyzLPxfWpB6JvakR56KLfm3rUcJkeAS4bHkeHC0yvHg4SABj795avA7xH5eY1WDk2CasqOG7t5aV1rIrA5ASHHwq11JID6N6bcUY/2KV9Ewj3xU3XtomMe+Kjsz/gk36HAttbWthhn/rJvrOKznxFvTFtW1bPZzrwz8cl97Kvt3/Oez3z42n5+5Z/ID/p9hT1Kr1f1t9F9iHwT/AX5q2CcCPsCvoo+aF6l+3GDW9LjHWYrH1z94p3OUenxdunTp0qVLly5d+l/pP4bOVyErLSDcAAAAAElFTkSuQmCC' : item?.recipient_data?.image !== "N/A" ? `${REACT_NATIVE_USER_PROFILE_URL}${item?.recipient_data?.image}` :
                'data:image/png;base64,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'
            }} style={styles.pic} />
            <View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>{item?.recipient_data?.name}</Text>
              </View>
              <View style={styles.end}>
                <Image
                  style={[styles.icon, { marginLeft: 15, marginRight: 5, width: 14, height: 14 }]}
                  source={{ uri: 'https://img.icons8.com/small/14/000000/double-tick.png' }}
                />
                <Text style={styles.time}>
                  {/* {formattedTime} */}
                </Text>
              </View>
              <Text style={styles.formatted_time}>
                {formattedTime}
              </Text>
            </View>
            {/* <Image style={[styles.icon, { marginRight: 50 }]} source={{ uri: callIcon }} /> */}
            <Image style={[styles.icon, { marginRight: 50 }]} source={{ uri: item.image }} />

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

          {/* <MaterialIcons onPress={() => {

          }} name="search" color='#DEDEDE' size={15} style={{ fontSize: 20, marginLeft: 10 }} /> */}
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
          <MaterialCommunityIcons onPress={() => {
          }} name="filter-variant" color='#DEDEDE' size={15} style={{ fontSize: 35, marginLeft: "61%" }} />
        </View>

      </View>
      <FlatList
        extraData={uniqueUsers}
        data={uniqueUsers}
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
    height: 20,
    width: 20,
    marginLeft: 15,
    marginRight: 15,

    justifyContent: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    // borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    // margin: 10,
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
  formatted_time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
    marginLeft: "76%"
  },
  icon: {
    height: 28,
    width: 28,
  },
})