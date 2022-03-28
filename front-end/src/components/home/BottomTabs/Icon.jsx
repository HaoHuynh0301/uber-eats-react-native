import { View, Text, TouchableOpacity } from "react-native";
import React, {memo} from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import styles from "./styles/bottomIcon.style";

export default memo(function Icon(props) {
  return (
    <TouchableOpacity onPress={props.handleNavigate}>
      <View style={styles.container}>
        <FontAwesome5
          name={props.icon}
          size={20}
          style={{ marginTop: 5, alignSelf: "center" }}
        />
        <Text>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
});
