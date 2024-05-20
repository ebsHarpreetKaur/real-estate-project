import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { Modal, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { REACT_NATIVE_BASE_URL } from '../../api/context/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
  { id: 1, description: 'Vivek', descriptionText: 'This is related to the Property...' },
  { id: 2, description: 'Anuj', descriptionText: 'This property is outside the br...' },
  { id: 3, description: 'Manjit', descriptionText: 'All things needs to be...' },
  { id: 4, description: 'Aman', descriptionText: 'Includes all facili...' },
  { id: 5, description: 'Oberoi Realty', descriptionText: 'no description' },
]


export default Commission = ({ }) => {
  const [notifications, setNotifications] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);
  const [country, setCountry] = useState('uk');
  const [userData, setUserData] = useState([]);

  const selectUser = user => {
    console.log("user", user)
    // setUserSelected(user)
    setModalVisible(true)
  }
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Manjit', value: 'manjit' },
    { label: 'Anonymous', value: 'anonymous' },
    { label: 'Oberoi Realty', value: 'oberoi' },
  ]);


  useEffect(() => {

    const get_user_list = async () => {
      try {
        const AuthUserData = await AsyncStorage.getItem('auth_user');
        const parsedAuthUserData = JSON.parse(AuthUserData);
        const response = await axios.get(`${REACT_NATIVE_BASE_URL}userlist`, {
          headers: {
            "Accept": 'application/json',
            'content-type': 'application/json',
            "Authorization": `Bearer ${parsedAuthUserData?.access_token}`
          },
        });
        console.log("useerrrrr.......", response)

        // setDealer_data(response?.data?.userdata);
        // setProperty_data(response?.data?.data?.data);

      } catch (error) {
        console.log("Error fetching dealers here:", error);

      }
    }
    get_user_list()
  }, [])


  return (
    <>
      <View style={styles.container}>
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ marginTop: "5%", fontWeight: "bold" }}>Commission details</Text>
          <TouchableOpacity style={styles.addcommbtn} onPress={() => {
            ""
          }}>
            <Text style={styles.addcommText} onPress={() => {
              selectUser()
            }}>Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.notificationList}
          enableEmptySections={true}
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <>
                <View style={styles.notificationBox}>
                  <Image
                    style={styles.icon}
                    source={require("../../../assets/no-image.jpg")}
                  />
                  <View>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.descriptionText}>{item.descriptionText}</Text>
                  </View>

                  <TouchableOpacity style={styles.commbtn} onPress={() => {
                    ""
                  }}>
                    <Text style={styles.commText}>View</Text>
                  </TouchableOpacity>
                </View>
              </>
            )
          }}
        />
      </View>
      <Modal
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        visible={modalVisible}>
        {/* <View style={styles.popupOverlay}> */}
        {/* <View style={styles.popup}> */}
        <View style={styles.popupContent}>
          <View style={styles.card}>
            {/* <TextInput style={styles.to_button} placeholder="" editable={true}
              selectTextOnFocus={false} /> */}
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              searchable={true}
              placeholder="Select user"
              searchPlaceholder="Search..."
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
            {/* <Text style={{ marginRight: "75%" }}>message:</Text> */}
            {/* <TextInput style={styles.message_input} placeholder="message"
              editable
              multiline
              numberOfLines={4}
              maxLength={400} /> */}
            <TextInput style={styles.to_button} placeholder="Enter amount" editable={true}
              selectTextOnFocus={false} />

            <TouchableOpacity style={styles.sendnotifiButton} onPress={async () => {
            }}>
              <Text style={styles.sendnotifiText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelsendnotifi} onPress={() => {
              setModalVisible(false)
            }}>
              <Text style={styles.cancelsendnotifiText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
          {/* <View style={styles.popupButtons}>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false)
                            }}
                            style={styles.btnClose}>
                            <Text style={styles.txtClose}>Close</Text>
                        </TouchableOpacity>
                    </View> */}
          {/* </View> */}
        </View>
      </Modal>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  commdetails: {
    marginTop: "2%",
    maeginLeft: "2%"
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
    borderRadius: 5,
  },
  dropdownContainer: {
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
  },
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: '#00000057',
    flex: 1,
    marginTop: 30,
  },
  popupContent: {
    flex: 1,
    marginTop: "50%",
    alignItems: 'center',
    margin: 5,
    height: 250,
  },
  popupHeader: {
    marginBottom: 45,
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
  },
  popupButton: {
    flex: 1,
    marginVertical: 16,
  },
  btnClose: {
    flex: 1,
    height: 40,
    backgroundColor: "#0066b2",
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtClose: {
    color: 'white'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
    marginTop: 40,
    width: '90%',
    alignItems: 'center',
  },
  to_button: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    color: "#000"
  },
  message_input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
    width: '100%',
  },
  sendnotifiButton: {
    backgroundColor: "#0066b2",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  sendnotifiText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelsendnotifi: {
    marginTop: 20,
  },
  cancelsendnotifiText: {
    color: "#0066b2",
    fontSize: 12,
    fontWeight: 'bold',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    height: 20,
    width: 20,
    marginLeft: 15,
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
  pic: {
    borderRadius: 30,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 17,
    width: 170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: "#0066b2",
    fontSize: 12,
    marginLeft: 15,
  },
  wrapper: {
  },
  notificationList: {
    marginTop: 10,
    padding: 10,
  },
  notificationBox: {
    padding: 15,
    marginTop: 5,
    marginBottom: 5,
    // marginLeft: 5,
    // marginRight: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    width: "97%",
  },
  icon: {
    borderRadius: 30,
    width: 50,
    height: 50,
  },
  description: {
    fontSize: 18,
    color: '#3498db',
    marginLeft: 10,
    width: 100
  },
  descriptionText: {
    fontSize: 13,
    color: '#999',
    marginLeft: 10,
    width: 200
  },
  commbtn: {
    backgroundColor: "#0066b2",
    borderRadius: 5,
    // padding: 5,
    marginTop: "3%",
    // width: 72,
    height: 30,
    alignItems: 'center',
    marginRight: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7,
    color: "#fff",
    marginLeft: 20
  },
  commText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addcommbtn: {
    backgroundColor: "#0066b2",
    borderRadius: 5,
    // padding: 5,
    marginTop: "3%",
    width: 72,
    height: 30,
    alignItems: 'center',
    marginRight: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7,
    color: "#fff",
    marginLeft: "65%"
  },
  addcommText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});