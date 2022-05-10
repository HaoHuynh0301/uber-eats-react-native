import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import HeaderButton from "./HeaderButton";
import styles from "./style/homePage.style";

export default function HeaderTab() {
  const [activeTab, setActiveTab] = useState("Delivery");
  return (
    <View style={styles.container}>
      <HeaderButton
        text="Delivery"
        btnColor="black"
        txtColor="white"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HeaderButton
        text="Pickup"
        btnColor="white"
        txtColor="black"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
}
