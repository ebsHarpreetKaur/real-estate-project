import React, { useEffect, useState } from 'react'
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
import axios from 'axios'
import { REACT_NATIVE_BASE_URL, REACT_NATIVE_USER_PROFILE_URL } from '../../api/context/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity } from 'react-native'
// import { theme_color } from '../../../config';
const { width, height } = Dimensions.get('window')
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';


export default ChatDetail = (item) => {
    console.log("rrersrr", item?.route?.params?.data?.recipient_data?._id)
    console.log("sssssss", item?.route?.params?.data?.sender_data?._id)

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
    const [ChatDetailsData, setChatDetailsData] = useState([]);



    useEffect(() => {
        get_chat_details_list()
    }, [])

    const get_chat_details_list = async () => {
        const AuthUserData = await AsyncStorage.getItem('auth_user');
        const parsedAuthUserData = JSON.parse(AuthUserData);
        console.log("here", parsedAuthUserData?.user)

        await axios.post(`${REACT_NATIVE_BASE_URL}chat/messages`, { recipient_id: item?.route?.params?.data?.recipient_data?._id, sender_id: parsedAuthUserData?.user?._id }, {
            headers: {
                "Accept": 'application/json',
                'content-type': 'application/json',
                "Authorization": `Bearer ${parsedAuthUserData?.access_token}`
            },
        })
            .then(function (response) {
                console.log("chat details - - ", response?.data?.chatuserlist);
                setChatDetailsData(response?.data?.chatuserlist)
            })
            .catch(function (error) {
                console.log("error while fetching chat dett- - -", error);
            })
    }
    const new_message = [
        {
            "msg": newMessage
        }

    ]
    const handleNewMessageSend = async () => {

        try {
            const AuthUserData = await AsyncStorage.getItem('auth_user');
            const parsedAuthUserData = JSON.parse(AuthUserData);
            console.log("here", parsedAuthUserData?.user)
            if (!newMessage) {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Warning',
                    textBody: 'Enter any message',
                })
            } else {
                await axios.post(`${REACT_NATIVE_BASE_URL}chat`,
                    {
                        sender_id: item?.route?.params?.data?.sender_data?._id,
                        recipient_id: item?.route?.params?.data?.recipient_data?._id,
                        message: new_message
                    }
                    , {
                        headers: {
                            "Accept": 'application/json',
                            'content-type': 'application/json',
                            'Authorization': `Bearer ${parsedAuthUserData?.access_token}`
                        },
                    })
                    .then(function (response) {
                        console.log("new message response - - -", response?.data);
                        setNewMessage("")
                    })
                    .catch(function (error) {

                        if (error.response) {
                            console.error("Response data:", error.response.data);
                            console.error("Response status:", error.response.status);
                            console.error("Response headers:", error.response.headers);
                        } else if (error.request) {
                            console.error("Request data:", error.request);
                        } else {
                            console.error("Error message:", error.message);
                        }
                        console.log('Error making POST request', error);
                    })
            }

        } catch (error) {
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                console.error("Request data:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
            console.log('Error making POST request', error);
        }

    }
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
        // console.log("eeeeeeeee", item?.message)
        if (item.sent === false) {
            return (
                <View style={styles.eachMsg}>
                    {/* <Image source={{ uri: item.image }} style={styles.userPic} /> */}
                    <Image source={{
                        uri: item?.recipient_data?.image === "N/A" || item?.recipient_data?.image === "" ? 'data:image/png;base64,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' : item?.recipient_data?.image !== "N/A" ? `${REACT_NATIVE_USER_PROFILE_URL}${item?.recipient_data?.image}` :
                            'data:image/png;base64,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'
                    }} style={styles.userPic} />
                    <View style={styles.msgBlock}>
                        <Text style={styles.msgTxt}>{item?.message[0]?.msg}</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.rightMsg}>
                    <View style={styles.rightBlock}>
                        <Text style={styles.rightTxt}>{item?.message[0]?.msg}</Text>
                    </View>
                    {/* <Image source={{ uri: item.image }} style={styles.userPic} /> */}
                    <Image source={{
                        uri: item?.sender_data?.image === "N/A" || item?.sender_data?.image === "" ? 'data:image/png;base64,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' : item?.image !== "N/A" ? `${REACT_NATIVE_USER_PROFILE_URL}${item.image}` :
                            'data:image/png;base64,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'
                    }} style={styles.userPic} />
                </View>
            )
        }
    }

    return (
        <>
            <AppBar />

            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
                    <FlatList
                        style={styles.list}
                        extraData={ChatDetailsData}
                        data={ChatDetailsData}
                        keyExtractor={item => {
                            return item.id
                        }}
                        renderItem={renderItem}
                    />
                    <View style={styles.input}>
                        <TextInput
                            value={newMessage}
                            style={{ flex: 1 }}
                            placeholderTextColor="#696969"
                            onChangeText={msg => setNewMessage(msg)}
                            blurOnSubmit={false}
                            onSubmitEditing={() => send()}
                            placeholder="Type a message"
                            returnKeyType="send"
                        />
                        <TouchableOpacity style={styles.propbutton} onPress={() => {
                            handleNewMessageSend()
                        }}>
                            <MaterialCommunityIcons name="send-outline" color='#0066b2' size={20} style={{}} />
                        </TouchableOpacity>
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