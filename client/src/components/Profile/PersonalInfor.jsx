import { View, Text } from "react-native";
import React, {memo} from "react";
import styles from "./style/personalInfor.style";
import { Avatar, Button } from "react-native-ui-lib"; //eslint-disable-line

export default memo(function PersonalInfor({ user, handleLogout, username }) {
  
  const LogoutButton = () => (
    <Button
      onPress={handleLogout}
      backgroundColor="black"
      style={styles.logoutBtn}
      label="Log out"
    />
  );

  const basicInfors = (user) => {
    const items = user.map((prop, index) => {
      const val = prop.value || "Set now";
      return (
        <View key={index} style={styles.profileItemWrapper}>
          <Text style={styles.itemLabel}>{prop.label}</Text>
          {linkEditInformation(`${val}`)}
        </View>
      );
    });
    return <View style={styles.basicInforContainer}>{items}</View>;
  };

  const imgProfile = () => (
    <View style={styles.profileItemWrapper}>
      <Avatar backgroundColor="#bfbfbf" name={username.slice(0,1)} />
      {linkEditInformation("Change profile pictor")}
    </View>
  );

  const linkEditInformation = (text) => (
    <View style={styles.linklinkContainer} >
      <Text style={{ marginRight: 10 }}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {imgProfile()}
      {basicInfors(user)}
      {LogoutButton()}
    </View>
  );
});
