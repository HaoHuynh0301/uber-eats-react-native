import { View } from "react-native";
import React, { useState } from "react";
import Header from "../../components/Profile/Header";
import PersonalInfor from "../../components/Profile/PersonalInfor";
import { useDispatch, useSelector } from "react-redux";
import EditDialog from "../../components/Profile/Dialog";
import {logout} from '../../redux/reducer/authReducer';

export default function Profile({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.userInfor);
  
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View>
      <Header />
      <PersonalInfor
        handleLogout={handleLogout}
        user={user}
      />
      <EditDialog visible = {modalVisible} onDismiss = {() => setModalVisible(false)}/>
    </View>
  );
}
