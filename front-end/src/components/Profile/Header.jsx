import { View, Text } from "react-native";
import React from "react";
import styles from "./style/header.style";
import { Avatar } from "react-native-ui-lib"; //eslint-disable-line

const ProfileImage = () => (
  <View style={styles.profileInforWrapper}>
    <View style={styles.profileImgWrapper}>
      <Avatar backgroundColor="#FFFFFF" name="HH" />
    </View>
    <Text style={styles.usernameTxt}>Hao Huynh</Text>
  </View>
);

export default function Header() {
  return (
    <View style={styles.container}>
      <ProfileImage />
    </View>
  );
}
