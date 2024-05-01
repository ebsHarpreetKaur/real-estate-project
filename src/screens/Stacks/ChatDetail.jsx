import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    FlatList,
    Dimensions,
    KeyboardAvoidingView,
} from 'react-native'
import AppBar from '../Components/AppBar'
// import { theme_color } from '../../../config';
const { width, height } = Dimensions.get('window')

export default ChatDetail = () => {
    const messagesData = [
        {
            id: 1,
            sent: true,
            msg: 'Lorem ipsum dolor',
            image: 'https://media.istockphoto.com/id/1134350144/photo/happy-real-estate-agent-showing-a-property.jpg?s=612x612&w=0&k=20&c=qQkZqY0uI1o7Ih9ZKFsXw5EGX4o-bT0tb0ggJljmp50=',
        },
        {
            id: 2,
            sent: true,
            msg: 'sit amet, consectetuer',
            image: 'https://media.istockphoto.com/id/1134350144/photo/happy-real-estate-agent-showing-a-property.jpg?s=612x612&w=0&k=20&c=qQkZqY0uI1o7Ih9ZKFsXw5EGX4o-bT0tb0ggJljmp50=',
        },
        {
            id: 3,
            sent: false,
            msg: 'adipiscing elit. Aenean ',
            image: 'https://media.istockphoto.com/id/1362265242/photo/portrait-of-a-smiling-young-businesswoman.jpg?s=612x612&w=0&k=20&c=AvNqcwVLavdf9we0V6UNoFzfm7IPpmB5qCBvT6g6kJg=',
        },
        {
            id: 4,
            sent: true,
            msg: 'commodo ligula eget dolor.',
            image: 'https://media.istockphoto.com/id/1134350144/photo/happy-real-estate-agent-showing-a-property.jpg?s=612x612&w=0&k=20&c=qQkZqY0uI1o7Ih9ZKFsXw5EGX4o-bT0tb0ggJljmp50=',
        },
        {
            id: 5,
            sent: false,
            msg: 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes',
            image: 'adipiscing elit. Aenean ',
            image: 'https://media.istockphoto.com/id/1362265242/photo/portrait-of-a-smiling-young-businesswoman.jpg?s=612x612&w=0&k=20&c=AvNqcwVLavdf9we0V6UNoFzfm7IPpmB5qCBvT6g6kJg=',
        },
        {
            id: 6,
            sent: true,
            msg: 'nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo',
            image: 'https://media.istockphoto.com/id/1134350144/photo/happy-real-estate-agent-showing-a-property.jpg?s=612x612&w=0&k=20&c=qQkZqY0uI1o7Ih9ZKFsXw5EGX4o-bT0tb0ggJljmp50=',
        },
        {
            id: 7,
            sent: false,
            msg: 'rhoncus ut, imperdiet',
            image: 'adipiscing elit. Aenean ',
            image: 'https://media.istockphoto.com/id/1362265242/photo/portrait-of-a-smiling-young-businesswoman.jpg?s=612x612&w=0&k=20&c=AvNqcwVLavdf9we0V6UNoFzfm7IPpmB5qCBvT6g6kJg=',
        },
        {
            id: 8,
            sent: false,
            msg: 'a, venenatis vitae',
            image: 'adipiscing elit. Aenean ',
            image: 'https://media.istockphoto.com/id/1362265242/photo/portrait-of-a-smiling-young-businesswoman.jpg?s=612x612&w=0&k=20&c=AvNqcwVLavdf9we0V6UNoFzfm7IPpmB5qCBvT6g6kJg=',
        },
    ]
    const [messages, setMessages] = useState(messagesData)
    const [newMessage, setNewMessage] = useState('')

    const reply = () => {
        var messagesList = messages
        messagesList.push({
            id: Math.floor(Math.random() * 99999999999999999 + 1),
            sent: false,
            msg: newMessage,
            image: 'https://media.istockphoto.com/id/1362265242/photo/portrait-of-a-smiling-young-businesswoman.jpg?s=612x612&w=0&k=20&c=AvNqcwVLavdf9we0V6UNoFzfm7IPpmB5qCBvT6g6kJg=',
        })
        setNewMessage('')
        setMessages(messagesList)
    }

    const send = () => {
        if (newMessage.length > 0) {
            let messagesList = messages
            messagesList.push({
                id: Math.floor(Math.random() * 99999999999999999 + 1),
                sent: true,
                msg: newMessage,
                image: 'https://media.istockphoto.com/id/1134350144/photo/happy-real-estate-agent-showing-a-property.jpg?s=612x612&w=0&k=20&c=qQkZqY0uI1o7Ih9ZKFsXw5EGX4o-bT0tb0ggJljmp50=',
            })
            setMessages(messagesList)
            setTimeout(() => {
                reply()
            }, 2000)
        }
    }

    const renderItem = ({ item }) => {
        if (item.sent === false) {
            return (
                <View style={styles.eachMsg}>
                    <Image source={{ uri: item.image }} style={styles.userPic} />
                    <View style={styles.msgBlock}>
                        <Text style={styles.msgTxt}>{item.msg}</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.rightMsg}>
                    <View style={styles.rightBlock}>
                        <Text style={styles.rightTxt}>{item.msg}</Text>
                    </View>
                    <Image source={{ uri: item.image }} style={styles.userPic} />
                </View>
            )
        }
    }

    return (
        <>
            <AppBar />

            <View style={{ flex: 1, backgroundColor:"#fff"}}>
                <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
                    <FlatList
                        style={styles.list}
                        extraData={messages}
                        data={messages}
                        keyExtractor={item => {
                            return item.id
                        }}
                        renderItem={renderItem}
                    />
                    <View style={styles.input}>
                        <TextInput
                            style={{ flex: 1 }}
                            placeholderTextColor="#696969"
                            onChangeText={msg => setNewMessage(msg)}
                            blurOnSubmit={false}
                            onSubmitEditing={() => send()}
                            placeholder="Type a message"
                            returnKeyType="send"
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    keyboard: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width,
        height,
    },
    header: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#075e54',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
    },
    chatTitle: {
        color: '#fff',
        fontWeight: '600',
        margin: 10,
        fontSize: 15,
    },
    chatImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        margin: 5,
    },
    input: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        padding: 10,
        height: 40,
        width: width - 20,
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
        borderColor: '#696969',
        borderWidth: 1,
    },
    eachMsg: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 5,
    },
    rightMsg: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 5,
        alignSelf: 'flex-end',
    },
    userPic: {
        height: 40,
        width: 40,
        margin: 5,
        borderRadius: 20,
        backgroundColor: '#f8f8f8',
    },
    msgBlock: {
        width: 220,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        padding: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
    },
    rightBlock: {
        width: 220,
        borderRadius: 5,
        backgroundColor: "#0066b2",
        padding: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
    },
    msgTxt: {
        fontSize: 15,
        color: '#555',
        // fontWeight: '600',
    },
    rightTxt: {
        fontSize: 15,
        color: '#fff',
        // fontWeight: '600',
    },
})