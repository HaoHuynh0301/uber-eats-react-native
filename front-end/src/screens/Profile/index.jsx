import { View } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/Profile/Header";
import PersonalInfor from "../../components/Profile/PersonalInfor";
import { useDispatch, useSelector } from "react-redux";
import EditDialog from "../../components/Profile/Dialog";

export default function Profile({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.userInfor);

  const handleOpenEditScreen = () => {
    setModalVisible(true);
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
        // handleClick={setModalVisible(true)}
        user={user}
      />
      <EditDialog visible = {modalVisible} onDismiss = {() => setModalVisible(false)}/>
    </View>
  );
}
