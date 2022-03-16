import { View, Text } from "react-native";
import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import EditForm from '../../components/EditInformation/EditForm';

export default function EditInformation({navigation, route}) {
  const dispatch = useDispatch();
  return (
    <View>
      <Text>index</Text>
    </View>
  );
}
