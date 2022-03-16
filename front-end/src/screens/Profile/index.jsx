import { View } from "react-native";
import React from "react";
import Header from "../../components/Profile/Header";
import PersonalInfor from "../../components/Profile/PersonalInfor";
import { useDispatch, useSelector } from "react-redux";

export default function Profile({ navigation, route }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.userInfor);

  const handleOpenEditScreen = () => {
    navigation.navigate("EditInformation", {});
  };

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT_REQUEST",
      payload: {},
    });
  };

  return (
    <View>
      <Header />
      <PersonalInfor
        handleLogout={handleLogout}
        handleClick={handleOpenEditScreen}
        user={user}
      />
    </View>
  );
}
