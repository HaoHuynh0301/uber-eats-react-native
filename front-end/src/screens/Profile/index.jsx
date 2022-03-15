import { View, Text } from "react-native";
import React from "react";
import Header from "../../components/Profile/Header";
import PersonalInfor from "../../components/Profile/PersonalInfor";

export default function Profile() {
  return (
    <View>
      <Header />
      <PersonalInfor />
    </View>
  );
}
