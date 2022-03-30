import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import React, {memo} from "react";
import styles from "./style/auth.style";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Button, TextField } from "react-native-ui-lib";
import ConfirmSMS from './ConfirmSMS';

export default memo(function AuthForm(props) {
  const {
    logo,
    textInputs,
    loginButton,
    handleLogin,
    subFooter,
    footer,
    sendSmsButton,
    sentSms,
    validInfor,
  } = props;

  const inputFields = (textInputs) =>
    textInputs.map((input, index) => (
      <View key={index} style={styles.inputContainer}>
        <FontAwesome5
          name={input.icon}
          size={22}
          style={{ alignSelf: "center" }}
        />
        <TextField
          value={input.value}
          enableErrors
          onError={input.handleError}
          validate={input.validate}
          onChangeValidity={isValid => {input.onChangeValidity(isValid)}}
          onChangeText={(value) => input.onChange(value)}
          errorMessage= {input.errorMessage}
          secureTextEntry={input.isSecure}
          validateOnChange={true}
          placeholder={input.placeholder}
          floatingPlaceholder
          floatingPlaceholderStyle={{ color: "black" }}
          containerStyle={styles.textFieldContainer}
          fieldStyle={'withUnderline'}
        />
      </View>
    ));

  const subFooters = (subFooters) =>
    subFooters.map((subFooter, index) => {
      return (
        <TouchableOpacity key = {index} onPress={subFooter.onClick}>
          <Text style={styles.linkLabel} key={index}>
            {subFooter.label}
          </Text>
        </TouchableOpacity>
      );
    });

  const footerItems = (items) =>
    items.map((item, index) => (
      <TouchableOpacity key = {index} style={styles.footerItemsContainer}>
        <FontAwesome5 name={item.icon} size={20} />
        <Text style={styles.footIconLabel}>{item.label}</Text>
      </TouchableOpacity>
    ));

  return (
    <SafeAreaView style={styles.container}>
      {logo && (
        <View style={styles.logoContainer}>
          <FontAwesome5
            name={"shopping-bag"}
            size={80}
            style={{ alignSelf: "center" }}
          />
        </View>
      )}
      {textInputs && inputFields(textInputs)}
      {loginButton && (
        <Button
          backgroundColor="black"
          labelStyle={styles.loginBtnLabel}
          style={styles.loginBtn}
          label={loginButton.label}
          onPress={handleLogin}
          disabled={loginButton.label !== "Login" && !validInfor}
        />
      )}
      {sendSmsButton && (
        <Button
          backgroundColor="black"
          labelStyle={styles.loginBtnLabel}
          style={styles.loginBtn}
          label={sendSmsButton.label}
          onPress={sendSmsButton.onPress}
        />
      )}
      {sentSms && (
        <ConfirmSMS phonenumber = '0932843656' />
      )}
      {subFooter && (
        <View style={styles.subFooterContainer}>{subFooters(subFooter)}</View>
      )}
      {footer && (
        <View style={styles.footerContainer}>{footerItems(footer)}</View>
      )}
    </SafeAreaView>
  );
});
