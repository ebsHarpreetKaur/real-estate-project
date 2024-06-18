import React, { useEffect, useState } from 'react'
import { ScrollView, TextInput } from 'react-native'
import { Modal, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { REACT_NATIVE_BASE_URL, REACT_NATIVE_USER_PROFILE_URL, today } from '../../api/context/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBar from './AppBar';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

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
  const [ViewmodalVisible, setViewCommModalVisible] = useState(false);
  const navigation = useNavigation()
  const [country, setCountry] = useState('uk');
  const [view_amount, setview_amount] = useState();
  const [view_Name, setview_Name] = useState();
  const [userData, setUserData] = useState([]);

  const selectUser = user => {
    console.log("user", user)
    // setUserSelected(user)
    setModalVisible(true)
  }
  const [Dealer_data, setDealer_data] = useState([]);
  const [comm_users, setCommissionUsers] = useState([]);
  const [comm_amount, setAmount] = useState('');
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${REACT_NATIVE_BASE_URL}commission/list`);

        if (response.data?.data) {
          const AuthCommissions = [...new Set(response?.data?.data.map(user => user._id))].map(id => {
            return response?.data?.data.find(user => user._id === id);
          });
          console.log("sdsdsd", AuthCommissions)
        }
        setCommissionUsers(response.data?.data);
        // console.log("ccccc", response?.data?.data)
      } catch (err) {
        setError(err);
      }
    };
    fetchUsers();
  }, []);

  const handleViewCommission = (item) => {
    setview_Name(item?.commission_with_user_id?.name)
    setview_amount(item?.amount)

    console.log("sdsdsdsdsd", item)
    setViewCommModalVisible(true)
  }

  useEffect(() => {
    const get_user_list = async () => {
      try {
        const AuthUserData = await AsyncStorage.getItem('auth_user');
        const parsedAuthUserData = JSON.parse(AuthUserData);
        const response = await axios.get(`${REACT_NATIVE_BASE_URL}properties`, {
          headers: {
            "Accept": 'application/json',
            'content-type': 'application/json',
            "Authorization": `Bearer ${parsedAuthUserData?.access_token}`
          },
        });
        console.log("proper.......", response?.data?.userdata)
        if (response?.data?.userdata) {
          const modifiedUserdata = {
            ...response.data.userdata,
            description: "description"
          };

          setDealer_data(modifiedUserdata);
        } else {
          console.warn("No userdata found in response");m
        }

        setDealer_data(response?.data?.userdata);
        if (response?.data?.userdata) {
          const uniqueUsers = [...new Set(response?.data?.userdata.map(user => user._id))].map(id => {
            return response?.data?.userdata.find(user => user._id === id);
          });
          const formattedItems = uniqueUsers.map(user => ({
            label: user.name,
            value: user._id
          }))

          setItems(formattedItems);
          // console.log("Ddddd", uniqueUsers)
        }

      } catch (error) {
        if (error.response.status === 401) {
          try {
            const tokenResponse = await axios.post(`${REACT_NATIVE_BASE_URL}refresh`);
            const newToken = tokenResponse.data.authorization.token;
            const AuthUser = tokenResponse.data.user;

            await AsyncStorage.setItem('auth_user', JSON.stringify({
              access_token: newToken,
              user: AuthUser
            }));

            // await get_user_list();
            const response = await axios.get(`${REACT_NATIVE_BASE_URL}properties`, {
              headers: {
                "Accept": 'application/json',
                'content-type': 'application/json',
                "Authorization": `Bearer ${newToken}`
              },
            });
            setDealer_data(response?.data?.userdata);
          } catch (refreshError) {
            console.log("Error refreshing token here:", refreshError);
          }
        } else {
          console.log("Error fetching dealers here:", error);
        }
      }
    }
    get_user_list()
  }, [])

  const _goBack = () => {
    navigation.navigate('Account')
  }

  const handleAddCommission = async () => {
    const AuthUserData = await AsyncStorage.getItem('auth_user');
    const parsedAuthUserData = JSON.parse(AuthUserData);
    try {
      axios.post(`${REACT_NATIVE_BASE_URL}add/commission`, {
        amount: comm_amount,
        user_id: parsedAuthUserData?.user?._id,
        comm_date: today,
        status: true,
        commission_with_user_id: value,
        property_id: "",
        title: "",
        description: ""
      }, {
        headers: {
          "Accept": 'application/json',
          'content-type': 'application/json',
          'Authorization': `Bearer ${parsedAuthUserData?.access_token}`

        },
      })
        .then(function (response) {
          console.log("commission response - - -", response?.data);
          setModalVisible(false)
        })
        .catch(function (error) {
          console.log("error while commission here - - -", error);
        })
    } catch (error) {
      console.log("hererr erre")

      console.log('Error making POST request', error);
    }
  };

  return (
    <>
      <AppBar />
      <View style={styles.container}>
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <View style={{ display: "flex", flexDirection: "row" }}>

            <Appbar.BackAction onPress={() => {
              _goBack()
            }} style={{ width: "100px", fontSize: 5, marginRight: "65%" }} />
            {/* <Text style={{ marginTop: "4%", marginRight: "34%" }}>Commission details</Text> */}
            <TouchableOpacity style={styles.addcommbtn} onPress={() => {
              ""
            }}>
              <Text style={styles.addcommText} onPress={() => {
                selectUser()
              }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>


      </View>
      <ScrollView>

        <FlatList
          style={styles.notificationList}
          enableEmptySections={true}
          data={comm_users}
          keyExtractor={item => item._id}
          renderItem={({ item }) => {
            console.log("first", item)
            return (
              <>
                <View style={styles.notificationBox}>
                  <Image source={{
                    uri: item?.image === "N/A" || item?.image === "" ? 'data:image/png;base64,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' : item?.commission_with_user_id?.image !== "N/A" ? `${REACT_NATIVE_USER_PROFILE_URL}${item?.commission_with_user_id?.image}` :
                      'data:image/png;base64,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'
                  }} style={styles.pic} />
                  <View>
                    <Text style={styles.description}>{item.commission_with_user_id?.name}</Text>
                    <Text style={styles.descriptionText}>{item.descriptionText}</Text>
                  </View>

                  <TouchableOpacity style={styles.commbtn} onPress={() => {
                    handleViewCommission(item)
                  }}>
                    <Text style={styles.commText}>View</Text>
                  </TouchableOpacity>
                </View>
              </>
            )
          }}
        />
      </ScrollView>
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
            <Text style={{ marginRight: "75%" }}>message:</Text>
            {/* <TextInput style={styles.message_input} placeholder="message"
              editable
              multiline
              numberOfLines={4}
              maxLength={400} /> */}
            <TextInput style={styles.to_button} placeholder="Enter amount" editable={true}
              onChangeText={(text) => setAmount(text)}
              selectTextOnFocus={false} />

            <TouchableOpacity style={styles.sendnotifiButton} onPress={async () => {
              handleAddCommission()
            }} >
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


      <Modal
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => setViewCommModalVisible(false)}
        visible={ViewmodalVisible}>
        {/* <View style={styles.popupOverlay}> */}
        {/* <View style={styles.popup}> */}
        <View style={styles.popupContent}>
          <View style={styles.card}>
            {/* <TextInput style={styles.to_button} placeholder="" editable={true}
              selectTextOnFocus={false} /> */}
            <Text style={{ marginRight: "75%", marginTop: "5%" }}>Name</Text>

            <TextInput style={styles.to_button} placeholder="" editable={false}
              selectTextOnFocus={false} value={view_Name} />
            <Text style={{ marginRight: "75%", marginTop: "5%" }}>Amount</Text>
            {/* <TextInput style={styles.message_input} placeholder="message"
              editable
              multiline
              numberOfLines={4}
              maxLength={400} /> */}
            <TextInput style={styles.to_button} placeholder="" editable={false}
              selectTextOnFocus={false} value={view_amount} />

            <TouchableOpacity style={styles.cancelsendnotifi} onPress={() => {
              setViewCommModalVisible(false)
            }}>
              <Text style={styles.cancelsendnotifiText}>Close</Text>
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
    padding: 12,
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
    fontSize: 15,
    color: '#000',
    marginLeft: 10,
    marginTop: "2%",
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
  },
  addcommText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});