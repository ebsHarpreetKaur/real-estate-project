import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import AppBar from '../Components/AppBar'

export default Notifications = () => {
  const data = [
    {
      id: 3,
      image: 'https://media.istockphoto.com/id/1389993878/photo/happy-real-estate-agent-showing-a-property.jpg?s=612x612&w=0&k=20&c=1td_y6UAaLdj7UB_cYyMmC93x2CHTvMU9ZDqHjxZdy8=',
      name: 'March SoulLaComa',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9jeu_0nAPyWY-ZkzNrtsxh0lm1UnPOi_yoY8XwcQQUg&s',
    },
    {
      id: 2,
      image: 'https://media.istockphoto.com/id/909675728/photo/businessman.jpg?s=612x612&w=0&k=20&c=AFoV-1P3FanXt4YKc37WsgPIiZvifm90_zDB1ZLVT4c=',
      name: 'John DoeLink',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9jeu_0nAPyWY-ZkzNrtsxh0lm1UnPOi_yoY8XwcQQUg&s',
    },
    {
      id: 4,
      image: 'https://media.istockphoto.com/id/1364269973/photo/call-center-agent-with-headset-working-on-support-hotline-in-modern-office.jpg?s=612x612&w=0&k=20&c=iCblISdZ3DGN1EAo_EUy8bSXuQT9bAJfHAN1H1NsmYQ=',
      name: 'Finn DoRemiFaso',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: '',
    },
    {
      id: 5,
      image: 'https://media.istockphoto.com/id/1056257342/photo/portrait-of-joyful-professional.jpg?s=612x612&w=0&k=20&c=D9H23OM1-heW-xjvmQftBp_YMbZh-n9KFnCb2hE3SHo=',
      name: 'Maria More',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: '',
    },
    {
      id: 1,
      image: 'https://media.istockphoto.com/id/909675728/photo/businessman.jpg?s=612x612&w=0&k=20&c=AFoV-1P3FanXt4YKc37WsgPIiZvifm90_zDB1ZLVT4c=',
      name: 'Frank Odalthh',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9jeu_0nAPyWY-ZkzNrtsxh0lm1UnPOi_yoY8XwcQQUg&s',
    },
    {
      id: 6,
      image: 'https://media.istockphoto.com/id/1364269973/photo/call-center-agent-with-headset-working-on-support-hotline-in-modern-office.jpg?s=612x612&w=0&k=20&c=iCblISdZ3DGN1EAo_EUy8bSXuQT9bAJfHAN1H1NsmYQ=',
      name: 'Clark June Boom!',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: '',
    },
    {
      id: 7,
      image: 'https://media.istockphoto.com/id/1056257342/photo/portrait-of-joyful-professional.jpg?s=612x612&w=0&k=20&c=D9H23OM1-heW-xjvmQftBp_YMbZh-n9KFnCb2hE3SHo=',
      name: 'The googler',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: '',
    },
  ]

  const [comments, setComments] = useState(data)

  return (
    <>
      <AppBar />
      <FlatList
        style={styles.root}
        data={comments}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />
        }}
        keyExtractor={item => {
          return item.id
        }}
        renderItem={item => {
          const Notification = item.item
          let attachment = <View />

          let mainContentStyle
          if (Notification.attachment) {
            mainContentStyle = styles.mainContent
            attachment = <Image style={styles.attachment} source={{ uri: Notification.attachment }} />
          }
          return (
            <TouchableOpacity style={styles.container}>
              <Image source={{ uri: Notification.image }} style={styles.avatar} />
              <View style={styles.content}>
                <View style={mainContentStyle}>
                  <View style={styles.text}>
                    <Text style={styles.name}>{Notification.name}</Text>
                    <Text>{Notification.text}</Text>
                  </View>
                  <Text style={styles.timeAgo}>2 hours ago</Text>
                </View>
                {attachment}
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </>

  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
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
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
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
  },
  name: {
    fontSize: 16,
    color: '#20B2AA',
  },
})