import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";

import Icon from "react-native-vector-icons/MaterialIcons";

const CallActionBox = ({ switchCamera, toggleMute, toggleCamera, endCall }) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const onToggleCamera = () => {
    toggleCamera();
    setIsCameraOn(!isCameraOn);
  };
  const onToggleMicrophone = () => {
    toggleMute();
    setIsMicOn(!isMicOn);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={switchCamera} style={styles.button}>
        <Text>
          <Icon name={"flip-camera-ios"} size={35} color={"white"} />
        </Text>
      </Pressable>
      <Pressable onPress={onToggleCamera} style={styles.button}>
        <Text>
          <Icon
            name={isCameraOn ? "videocam" : "videocam-off"}
            size={35}
            color={"white"}
          />
        </Text>
      </Pressable>
      <Pressable onPress={onToggleMicrophone} style={styles.button}>
        <Text>
          <Icon name={isMicOn ? "mic" : "mic-off"} size={35} color={"white"} />
        </Text>
      </Pressable>
      <Pressable onPress={endCall} style={[styles.button, styles.endButton]}>
        <Text>
          <Icon name={"call"} size={35} color={"white"} />
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#888",
    backgroundColor: "#888",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
    paddingBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#666",
    padding: 10,
    borderRadius: 25,
  },
  endButton: {
    backgroundColor: "#f00",
  },
});

export default CallActionBox;















// import { View, Text, Pressable } from "react-native";
// import React, { useState } from "react";

// import Icon from "react-native-vector-icons/MaterialIcons";

// const CallActionBox = ({ switchCamera, toggleMute, toggleCamera, endCall }) => {
//   const [isCameraOn, setIsCameraOn] = useState(true);
//   const [isMicOn, setIsMicOn] = useState(true);

//   const onToggleCamera = () => {
//     toggleCamera();
//     setIsCameraOn(!isCameraOn);
//   };
//   const onToggleMicrophone = () => {
//     toggleMute();
//     setIsMicOn(!isMicOn);
//   };

//   return (
//     <View className="border-2 border-gray-800 bg-gray-800 rounded-t-3xl p-5 pb-10 w-full flex-row justify-between">
//       <Pressable
//         onPress={switchCamera}
//         className="bg-gray-600 p-3 rounded-full"
//       >
//         <Text>
//           <Icon name={"flip-camera-ios"} size={35} color={"white"} />
//         </Text>
//       </Pressable>
//       <Pressable
//         onPress={onToggleCamera}
//         className="bg-gray-600 p-3 rounded-full"
//       >
//         <Text>
//           <Icon
//             name={isCameraOn ? "videocam" : "videocam-off"}
//             size={35}
//             color={"white"}
//           />
//         </Text>
//       </Pressable>
//       <Pressable
//         onPress={onToggleMicrophone}
//         className="bg-gray-600 p-3 rounded-full"
//       >
//         <Text>
//           <Icon name={isMicOn ? "mic" : "mic-off"} size={35} color={"white"} />
//         </Text>
//       </Pressable>
//       <Pressable onPress={endCall} className="bg-red-600 p-3 rounded-full">
//         <Text>
//           <Icon name={"call"} size={35} color={"white"} />
//         </Text>
//       </Pressable>
//     </View>
//   );
// };

// export default CallActionBox;
