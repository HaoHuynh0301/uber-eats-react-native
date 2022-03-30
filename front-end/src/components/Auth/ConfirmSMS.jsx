import { View, Text } from "react-native";
import React, {memo} from "react";
import styles from "./style/confirmSms.style";
import { TextField, Button } from "react-native-ui-lib";
import {CONFIRM_CODE} from './constants/confirm.code';

export default memo(function ConfirmSMS({ phonenumber }) {
  const confirmCode = () =>
    CONFIRM_CODE.map((item, index) => (
      <TextField
        key={index}
        labelStyle={{
          fontSize: 30
        }}
        containerStyle={styles.textFieldContainer}
      />
    ));

  return (
    <View style={styles.container}>
      <Text>Verification code sent to phone number</Text>
      <Text style={styles.sentPhonenumber}>{phonenumber}</Text>
      <View style = {styles.confirmCodeContainer}>{confirmCode()}</View>
      <Button backgroundColor = 'black' label = 'Continue' style = {styles.continueBtn}/>
    </View>
  );
});
