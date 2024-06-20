import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { theme_color } from '../../../config';
import { useNavigation } from "@react-navigation/native";
import RoomScreen from "../Components/RoomScreen";
import CallScreen from "../Components/CallScreen";
import JoinScreen from "../Components/JoinScreen";
import {
  REACT_NATIVE_BASE_URL,
  REACT_NATIVE_IMAGE_URL,
  REACT_NATIVE_PROPERTY_URL,
  REACT_NATIVE_USER_PROFILE_URL,
} from "../../api/context/auth";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const ProfileView = (props) => {
  const user_data = props?.route?.params?.data;
  console.log("proops", props?.route?.params?.data);
  const navigation = useNavigation();
  const [propertydata, setPropertyData] = useState([]);

  useEffect(() => {
    get_property_list();
  }, []);

  const get_property_list = async () => {
    try {
      const AuthUserData = await AsyncStorage.getItem("auth_user");
      const parsedAuthUserData = JSON.parse(AuthUserData);

      const response = await axios.get(
        `${REACT_NATIVE_BASE_URL}my/properties/${user_data?._id}`,
        {
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${parsedAuthUserData?.access_token}`,
          },
        }
      );
      console.log("prop. data......", response?.data);
      setPropertyData(response?.data?.data);
    } catch (error) {
      console.log("Error fetching dealers:", error);
    }
  };

  useEffect(() => {
    const generateRandomId = () => {
      const characters = "abcdefghijklmnopqrstuvwxyz";
      let result = "";
      for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return setRoomId(result);
    };
    generateRandomId();
  }, []);

  const handleVideoConferencing = () => {
    console.log("here....");
    setScreen("CALL"); // Set screen state to 'CALL' to render CallScreen
  };

  const screens = {
    ROOM: "JOIN_ROOM",
    CALL: "CALL",
    JOIN: "JOIN",
  };

  const [screen, setScreen] = useState(screens.ROOM);
  const [roomId, setRoomId] = useState("");

  let content;

  switch (screen) {
    case screens.ROOM:
      content = (
        <RoomScreen
          roomId={roomId}
          setRoomId={setRoomId}
          screens={screens}
          setScreen={setScreen}
        />
      );
      break;

    case screens.CALL:
      content = (
        <CallScreen roomId={roomId} screens={screens} setScreen={setScreen} />
      );
      break;

    case screens.JOIN:
      content = (
        <JoinScreen roomId={roomId} screens={screens} setScreen={setScreen} />
      );
      break;

    default:
      content = <Text>Wrong Screen</Text>;
  }

  // const item = props.route.params.data

  // console.log("props", props.route.params.data)

  console.log("setscreen", setScreen);
  return (
    <>
      {screen === "CALL" ? (
        <CallScreen
          roomId={roomId}
          screens={{ CALL: "CALL", ROOM: "ROOM" }}
          setScreen={setScreen}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              style={styles.avatar}
              source={{
                uri:
                  user_data?.image === "N/A" || user_data?.image === ""
                    ? "data:image/png;base64,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"
                    : user_data?.image !== "N/A"
                    ? `${REACT_NATIVE_USER_PROFILE_URL}${user_data.image}`
                    : "data:image/png;base64,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",
              }}
            />
            <View style={styles.info}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={styles.name}>{user_data?.name}</Text>
                <MaterialCommunityIcons
                  style={{ marginTop: "1%", marginLeft: "9%" }}
                  name="video"
                  color="#0066b2"
                  size={30}
                  onPress={handleVideoConferencing}
                />
                {/* <MaterialCommunityIcons name="video" color={theme_color} size={30} onPress={handleVideoConferencing} /> */}
              </View>
              <View style={styles.msgContainer}>
                <Text style={styles.msgTxt}>
                  <MaterialIcons
                    name="location-pin"
                    color="#DEDEDE"
                    size={12}
                  />
                  {user_data?.user_city}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Properties</Text>
              <Text style={styles.statValue}>1,234</Text>
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
          <Text style={styles.bio}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
          <View style={styles.body}>
            <View style={styles.section2}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={styles.sectionTitle}>Properties</Text>
                
              </View>
              {/* <View style={styles.container2}> */}
              <FlatList
                style={styles.list}
                data={propertydata}
                keyExtractor={(item) => {
                  return item._id;
                }}
                ItemSeparatorComponent={() => {
                  return <View style={styles.separator} />;
                }}
                renderItem={(post) => {
                  const item = post.item;
                  return (
                    <View style={styles.card}>
                      {/* <Image style={styles.cardImage} source={{ uri: item.image }} /> */}
                      <Image
                        style={styles.cardImage}
                        source={{
                          uri:
                            item?.photo === "N/A"
                              ? "https://tse1.mm.bing.net/th?id=OIP.IEvuVH2kuKvCPcykUockWQHaFj&pid=Api&rs=1&c=1&qlt=95&w=134&h=100"
                              : item?.photo !== "N/A"
                              ? `${REACT_NATIVE_PROPERTY_URL}${item?.photo}`
                              : "https://tse1.mm.bing.net/th?id=OIP.IEvuVH2kuKvCPcykUockWQHaFj&pid=Api&rs=1&c=1&qlt=95&w=134&h=100",
                        }}
                      />

                      <View style={styles.cardHeader}>
                        <View>
                          <Text style={styles.title}>{item.property_name}</Text>
                          <Text style={styles.description}>
                            {item.description}
                          </Text>
                          <View style={styles.timeContainer}>
                            <Image
                              style={styles.iconData}
                              source={{
                                uri: "https://img.icons8.com/color/96/3498db/calendar.png",
                              }}
                            />
                            <Text style={styles.time}>{item.updated_at}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.cardFooter}>
                        <View style={styles.socialBarContainer}>
                          
                         
                        <View style={styles.verticleLine}></View>
                       
                          <View style={styles.socialBarSection}>
                            <TouchableOpacity
                              onPress={() => {
                                handle_heart_modal_property(item);
                              }}
                            >
                              <MaterialCommunityIcons
                                name="heart-outline"
                                color="#0066b2"
                                size={23}
                              />
                            </TouchableOpacity>
                          </View>
                          <View style={styles.verticleLine}></View>
                         
                          <View style={styles.socialBarSection}>
                            <TouchableOpacity style={styles.socialBarButton}>
                              <FontAwesome5
                                onPress={() => {}}
                                name="eye"
                                color="#0066b2"
                                size={20}
                              />
                            </TouchableOpacity>
                          </View>
                          <View style={styles.verticleLine}></View>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
              {/* </View> */}
            </View>
          </View>
        </View>
      )}

      {/* <SafeAreaView className="flex-1 justify-center">{content}</SafeAreaView> */}
    </>
  );
};

const styles = {
  msgTxt: {
    fontWeight: "400",
    color: "#0066b2",
    fontSize: 12,
  },
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eoi_button: {
    backgroundColor: "#0066b2",
    borderRadius: 5,
    // padding: 5,
    marginTop: 6,
    // width: 72,
    height: 30,
    alignItems: "center",
    marginRight: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7,
  },
  timeContainer: {
    flexDirection: "row",
  },
  eoi_Text: {
    color: "#fff",
    fontWeight: "bold",
  },
  header: {
    // marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  user_city_text: {
    color: "#999",
    fontSize: 13,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    color: "#999",
    fontSize: 14,
  },
  statValue: {
    fontSize: 18,
  },
  bio: {
    padding: 20,
    fontSize: 16,
    color: "#333",
  },

  body: {},
  stats: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    color: "#999",
    fontSize: 14,
  },
  statValue: {
    fontSize: 15,
    color: "grey",
  },
  bio: {
    padding: 20,
    fontSize: 16,
    color: "#333",
  },
  section2: {
    marginBottom: 16,
    // marginLeft: 15,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: "5%",
  },
  sectionContent: {
    marginTop: 8,
  },
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#DEDEDE",
  },
  sectionItem: {
    marginVertical: 4,
  },
  headerContainer: {
    alignItems: "center",
  },
  coverPhoto: {
    width: "100%",
    height: 180,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -70,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  bioContainer: {
    padding: 15,
  },
  bioText: {
    fontSize: 16,
    textAlign: "center",
    color: "#A9A9A9",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  statCount: {
    color: "#999",
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 16,
    color: "#999",
  },
  propbutton: {
    backgroundColor: "#0066b2",
    borderRadius: 5,
    padding: 4,
    marginHorizontal: 15,
    marginLeft: "49%",
    width: 60,
  },
  propbuttonText: {
    fontSize: 13,
    color: "#fff",
    textAlign: "center",
    padding: "4%",
  },
  button: {
    backgroundColor: "#0066b2",
    borderRadius: 5,
    padding: 6,
    marginHorizontal: 15,
  },
  buttonText: {
    fontSize: 13,
    color: "#fff",
    textAlign: "center",
    padding: "1%",
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
    backgroundColor: "#ffffff",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 9,
    marginVertical: 8,
    width: "100%",
    backgroundColor: "white",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: "#ffff",
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
    color: "#888",
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  time: {
    fontSize: 13,
    color: "#808080",
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
    flexDirection: "row",
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  socialBarSection: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: "flex-end",
    justifyContent: "center",
  },

  socialBarButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  popupContent: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card1: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  to_button: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  sendnotifiButton: {
    backgroundColor: "#D2042D",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    marginRight: "6%",
  },
  sendnotifiText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelbutton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    marginRight: "2%",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  cancelbuttonText: {
    fontSize: 13,
    color: "#ccc",
    textAlign: "center",
    fontWeight: "bold",
  },
};
export default ProfileView;
