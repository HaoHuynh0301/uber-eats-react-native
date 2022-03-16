import { View, Text } from "react-native";
import React from "react";
import styles from "./styles/emptyOrder.style";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { EMPTY_ORDER_LABEL } from "./constants/emptyOrder.constants";

const content = () =>
  EMPTY_ORDER_LABEL.map((label, index) => (
    <Text style={label.type === "sub-title" ? styles.subTitle : styles.content}>
      {label.content}
    </Text>
  ));

export default function EmptyCart() {
  return (
    <View style={styles.container}>
      <FontAwesome5 size={80} name={"receipt"} />
      <View style = {styles.contentWrapper}>
        {content()}
      </View>
    </View>
  );
}
