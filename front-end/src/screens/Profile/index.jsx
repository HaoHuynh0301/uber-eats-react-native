import { View } from "react-native";
import React, { useState } from "react";
import Header from "../../components/Profile/Header";
import PersonalInfor from "../../components/Profile/PersonalInfor";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/reducer/authReducer";

export default function Profile({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { currUser } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.userInfor);

  const handleLogout = () => {
    dispatch(actions.logout());
  };

  return (
    <View>
      <Header username={currUser.props.username} />
      <PersonalInfor
        handleLogout={handleLogout}
        user={user}
        username={currUser.props.username}
      />
    </View>
  );
}
