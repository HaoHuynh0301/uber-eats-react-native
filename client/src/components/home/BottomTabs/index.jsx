import { View } from "react-native";
import React, {memo}  from "react";
import styles from "./styles/bottomsTabs.style";
import Icon from "./Icon";
import { BOTTOM_ICONS } from "./constants/bottomIcons.constants";

export default memo(function BottomTabs({ navigation }) {

  const bottomIcons = () =>
    BOTTOM_ICONS.map((icon, key) => (
      <Icon
        icon={icon.icon}
        text={icon.text}
        key={key}
        handleNavigate = {() => {navigation.navigate(icon.text, {});}}
      />
    ));

  return <View style={styles.container}>{bottomIcons()}</View>;
});
