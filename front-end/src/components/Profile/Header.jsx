import { View, Text, Image } from "react-native";
import React from "react";
import styles from './style/header.style';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const ProfileImage = () => (
  <View style = {styles.profileInforWrapper}>
    <View style = {styles.profileImgWrapper}>
      <FontAwesome5 
        name={'user'}
        size={35}
      />
    </View>
    <Text style = {styles.usernameTxt}>Hao Huynh</Text>
  </View>
)

export default function Header() {
  return (
    <View style = {styles.container}>
      <ProfileImage />
    </View>
  );
}
