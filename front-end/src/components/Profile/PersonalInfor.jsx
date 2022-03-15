import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./style/personalInfor.style";
import { Avatar, AvatarHelper, Colors, Typography } from "react-native-ui-lib"; //eslint-disable-line
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const basicInfors = (user) => {
  const items = user.map((prop, index) => {
    const val = prop.value || "Set now";
    return(
      <View key={index} style={styles.profileItemWrapper}>
        <Text style = {styles.itemLabel}>{prop.label}</Text>
        {linkEditInformation(`${val}`)}
      </View>
    );
    
  });
  return <View style={styles.basicInforContainer}>{items}</View>;
};

const imgProfile = () => (
  <View style={styles.profileItemWrapper}>
    <Avatar backgroundColor="#bfbfbf" name="HH" />
    {linkEditInformation("Change profile pictor")}
  </View>
);

const linkEditInformation = (text) => (
  <TouchableOpacity style={styles.linklinkContainer}>
    <Text style = {{marginRight: 10}}>{text}</Text>
    <FontAwesome5
      name={"angle-right"}
      size={25}
      style={{ alignSelf: "center" }}
    />
  </TouchableOpacity>
);

const detailInfor = () => <View></View>;

export default function PersonalInfor({ user }) {
  return <View style={styles.container}>
    {imgProfile()}
    {basicInfors(user)}
  </View>;
}
