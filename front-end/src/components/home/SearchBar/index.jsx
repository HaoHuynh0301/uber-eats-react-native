import { View, TextInput } from "react-native";
import styles from "./style/searchBar.style";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function SearchBar(props) {
  let value = props.value || "";
  const { onChange } = props;
  return (
    <View style={styles.container}>
      <FontAwesome5 name={"search"} size={18} />
      <TextInput
        onChangeText={onChange}
        value={value}
        style={styles.textInput}
        placeholder="Search"
      />
    </View>
  );
}
