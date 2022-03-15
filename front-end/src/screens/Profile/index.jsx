import { View, Text } from "react-native";
import React from "react";
import Header from "../../components/Profile/Header";
import PersonalInfor from "../../components/Profile/PersonalInfor";
import {useDispatch, useSelector} from 'react-redux';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.userInfor);
  
  return (
    <View>
      <Header />
      <PersonalInfor user = {user} />
    </View>
  );
}
