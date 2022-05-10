import { View, Text } from "react-native";
import React from "react";
import styles from "./style/header.style";
import { Avatar } from "react-native-ui-lib"; //eslint-disable-line

export default function Header({username}) {
  const ProfileImage = () => (
    <View style={styles.profileInforWrapper}>
      <View style={styles.profileImgWrapper}>
        <Avatar backgroundColor="#FFFFFF" name={username.slice(0,1)} />
      </View>
      <Text style={styles.usernameTxt}>{username}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ProfileImage />
    </View>
  );
}
