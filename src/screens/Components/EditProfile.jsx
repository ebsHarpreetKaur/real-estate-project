import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const EditProfileView = (params) => {
    const data = params.route.params.data
    // console.log("params", params.route.params.data)
    const profile = {
        name: data.firstName,
        email: data.email,
        rera_num: 'FEX898CE',
        avatar: data.image,
    }
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [rera_num, setRera_num] = useState(profile.rera_num);
    const [avatar, setAvatar] = useState(profile.avatar);
    const [password, setPassword] = useState()

    onClickListener = viewId => {
        Alert.alert('Alert', 'Button pressed ' + viewId)
    }

    const handleSubmit = () => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={{ uri: data.image }}
                />
                <TouchableOpacity style={styles.changeAvatarButton} onPress={() => {/* open image picker */ }}>
                    <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={{ marginBottom: 10, marginRight: "48%" }}>Username</Text>
                <View style={styles.inputContainer}>

                    <TextInput
                        style={styles.inputs}
                        placeholder="Full name"
                        underlineColorAndroid="transparent"
                        onChangeText={name => setName({ name })}
                        value={name}
                    />

                </View>
                <Text style={{ marginBottom: 10, marginRight: "56%" }}>Email</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        underlineColorAndroid="transparent"
                        onChangeText={email => setEmail({ email })}
                        value={email}
                    />

                </View>
                <Text style={{ marginBottom: 10, marginRight: "46%" }}>Rera number</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="RERA number"
                        underlineColorAndroid="transparent"
                        onChangeText={rera => setRera_num({ rera })}
                        value={rera_num}
                    />

                </View>

                <TouchableOpacity
                    style={[styles.buttonContainer, styles.submitButton]}
                    onPress={() => this.onClickListener('submit')}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>


            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    label: {
        fontWeight: "100"
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: '#808080',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
        justifyContent: 'center',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent',
    },
    btnByRegister: {
        height: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        width: 300,
        backgroundColor: 'transparent',
    },
    submitButton: {
        backgroundColor: '#20B2AA',

        shadowColor: '#808080',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,

        elevation: 19,
    },
    submitText: {
        color: 'white',
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    textByRegister: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',

        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        marginTop: '10%'
    },
    form: {
        width: '80%',
    },
    label: {
        marginTop: 20,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#20B2AA',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: "center"
    },
    avatarContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changeAvatarButton: {
        marginTop: 10,
    },
    changeAvatarButtonText: {
        color: '#20B2AAl',
        fontSize: 18,
    },
});

export default EditProfileView;