import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import AppBar from '../Components/AppBar'
import { REACT_NATIVE_BASE_URL, REACT_NATIVE_USER_PROFILE_URL } from '../../api/context/auth'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LogBox } from 'react-native'
// import { theme_color } from '../../../config'

export default Notifications = () => {
  // Ignore specific warnings
  LogBox.ignoreLogs([
    'Warning: ...', // Can use a specific warning message or a regex
    'Deprecation warning: ...',
  ]);

  // Ignore all warnings
  LogBox.ignoreAllLogs();
  
  const data = [
    {
      id: 3,
      timeago: 1,
      image: 'https://media.istockphoto.com/id/1389993878/photo/happy-real-estate-agent-showing-a-property.jpg?s=612x612&w=0&k=20&c=1td_y6UAaLdj7UB_cYyMmC93x2CHTvMU9ZDqHjxZdy8=',
      name: 'March SoulLaComa',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9jeu_0nAPyWY-ZkzNrtsxh0lm1UnPOi_yoY8XwcQQUg&s',
    },
    {
      id: 2,
      timeago: 2,
      image: 'https://media.istockphoto.com/id/909675728/photo/businessman.jpg?s=612x612&w=0&k=20&c=AFoV-1P3FanXt4YKc37WsgPIiZvifm90_zDB1ZLVT4c=',
      name: 'John DoeLink',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9jeu_0nAPyWY-ZkzNrtsxh0lm1UnPOi_yoY8XwcQQUg&s',
    },
    {
      id: 4,
      timeago: 2,
      image: 'https://media.istockphoto.com/id/1364269973/photo/call-center-agent-with-headset-working-on-support-hotline-in-modern-office.jpg?s=612x612&w=0&k=20&c=iCblISdZ3DGN1EAo_EUy8bSXuQT9bAJfHAN1H1NsmYQ=',
      name: 'Finn DoRemiFaso',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: '',
    },
    {
      id: 5,
      timeago: 3,
      image: 'https://media.istockphoto.com/id/1056257342/photo/portrait-of-joyful-professional.jpg?s=612x612&w=0&k=20&c=D9H23OM1-heW-xjvmQftBp_YMbZh-n9KFnCb2hE3SHo=',
      name: 'Maria More',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: '',
    },
    {
      id: 1,
      timeago: 3,
      image: 'https://media.istockphoto.com/id/909675728/photo/businessman.jpg?s=612x612&w=0&k=20&c=AFoV-1P3FanXt4YKc37WsgPIiZvifm90_zDB1ZLVT4c=',
      name: 'Frank Odalthh',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9jeu_0nAPyWY-ZkzNrtsxh0lm1UnPOi_yoY8XwcQQUg&s',
    },
    {
      id: 6,
      timeago: 4,
      image: 'https://media.istockphoto.com/id/1364269973/photo/call-center-agent-with-headset-working-on-support-hotline-in-modern-office.jpg?s=612x612&w=0&k=20&c=iCblISdZ3DGN1EAo_EUy8bSXuQT9bAJfHAN1H1NsmYQ=',
      name: 'Clark June Boom!',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: '',
    },
    {
      id: 7,
      timeago: 5,
      image: 'https://media.istockphoto.com/id/1056257342/photo/portrait-of-joyful-professional.jpg?s=612x612&w=0&k=20&c=D9H23OM1-heW-xjvmQftBp_YMbZh-n9KFnCb2hE3SHo=',
      name: 'The googler',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: '',
    },
  ]

  const [comments, setComments] = useState(data)
  const [notifi, setNotifi] = useState([])


  useEffect(() => {
    notifi_list()
  }, [])

  const notifi_list = async () => {
    const AuthUserData = await AsyncStorage.getItem('auth_user');
    const parsedAuthUserData = JSON.parse(AuthUserData);
    console.log("hereeee notifi", parsedAuthUserData)

    const response = await axios.get(`${REACT_NATIVE_BASE_URL}notification/list/receiver/${parsedAuthUserData?.user?._id}`, {
      headers: {
        "Accept": 'application/json',
        'content-type': 'application/json',
        "Authorization": `Bearer ${parsedAuthUserData?.access_token}`
      },
    });
    console.log("notifi.......", response?.data?.data)

    setNotifi(response?.data?.data);
  }
  // console.log("notifi.......", notifi)

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



  return (
    <>
      <View style={{ backgroundColor: "#fff", height: "100%" }}>
        <AppBar />
        {
          notifi.length === 0 ?
            <Image
              source={require('../../../assets/no-notification.png')}
              style={{ width: 150, height: 200, marginTop: "35%", marginLeft: "28%" }}
            />
            :
            <FlatList
              style={styles.root}
              data={notifi}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />
              }}
              keyExtractor={item => {
                return item._id
              }}
              renderItem={item => {
                const Notification = item.item
                let attachment = <View />
                let mainContentStyle
                const dateTimeString = Notification?.updated_at;
                const formattedTime = formatTimeToIST(dateTimeString);
                if (Notification.attachment) {
                  mainContentStyle = styles.mainContent
                  attachment = <Image style={styles.attachment} source={{ uri: Notification.attachment }} />
                }
                return (
                  <>
                    <TouchableOpacity style={styles.container}>
                      <Image source={{
                        uri: Notification?.receiver_data?.image === "N/A" || Notification?.receiver_data?.image === "" ? 'data:image/png;base64,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' : Notification?.receiver_data?.image !== "N/A" ? `${REACT_NATIVE_USER_PROFILE_URL}${Notification?.receiver_data?.image}` :
                          'data:image/png;base64,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'
                      }} style={styles.pic} />
                      <View style={styles.content}>
                        {/* <View style={styles.text}> */}
                        <Text style={styles.name}>{Notification?.receiver_data?.name}</Text>
                        <Text style={{ color: "#999", marginTop: "1%" }}>{Notification.message.length > 35 ? `${Notification.message.substring(0, 35)}...` : Notification.message}</Text>
                        <View>
                          <Text style={styles.timeAgo}>{formattedTime}</Text>
                          <Text style={{ fontSize: 3 }}>{Notification.description}</Text>
                        </View>
                        {/* </View> */}
                        {/* {attachment} */}
                      </View>
                    </TouchableOpacity>
                  </>
                )
              }}
            />
        }
      </View>

    </>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingLeft: 15,
    paddingTop: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  pic: {
    borderRadius: 30,
    width: 50,
    height: 50,
  },
  text: {
    // marginBottom: 3,
    flexDirection: 'column',
    // flexWrap: "nowrap",
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 30,

  },
  img: {
    height: 50,
    width: 50,
    margin: 0,
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 20,
    width: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  timeAgo: {
    fontSize: 12,
    color: '#696969',
    marginLeft: "75%"
  },
  name: {
    fontSize: 16,
    color: "#0066b2",
  },
})