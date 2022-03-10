import { View, Text } from "react-native";
import React from "react";
import styles from "./styles/bottomsTabs.style";
import Icon from "./Icon";
import {BOTTOM_ICONS} from './constants/bottomIcons.constants';

export default function BottomTabs() {
  const bottomIcons = () => (
    BOTTOM_ICONS.map((icon, key) => (
      <Icon icon = {icon.icon} text = {icon.text} key = {key}/>
    ))
  );
  
  return (
    <View style={styles.container}>
      {bottomIcons()}
    </View>
  );
}
