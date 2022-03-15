import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./style/auth.style";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Button, TextField } from "react-native-ui-lib";

export default function AuthForm(props) {
  const { logo, textInputs, loginButton, handleLogin, subFooter, footer } = props;

  const inputFields = (textInputs) =>
    textInputs.map((input, index) => (
      <View key={index} style={styles.inputContainer}>
        <FontAwesome5
          name={input.icon}
          size={22}
          style={{ alignSelf: "center" }}
        />
        <TextField
          secureTextEntry={input.isSecure}
          placeholder={input.placeholder}
          floatingPlaceholder
          enableErrors
          floatingPlaceholderStyle = {{color: 'black'}}
          containerStyle = {{marginLeft: 10, width: '90%', borderColor: 'grey'}}
        />
      </View>
    ));

  const subFooters = (subFooters) => (
    subFooters.map((subFooter, index) => (
      <TouchableOpacity>
        <Text style = {styles.linkLabel} key = {index}>{subFooter.label}</Text>
      </TouchableOpacity>
    ))
  );

  const footerItems = (items) => (
    items.map((item, index) => (
      <TouchableOpacity style = {styles.footerItemsContainer}>
        <FontAwesome5 name = {item.icon} size = {20}/>
        <Text style = {styles.footIconLabel}>{item.label}</Text>
      </TouchableOpacity>
    ))
  )

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
        />
      )}
      {subFooter && (
        <View style = {styles.subFooterContainer}>
          {subFooters(subFooter)}
        </View>
      )}
      {footer && (
        <View style = {styles.footerContainer}>
          {footerItems(footer)}
        </View>
      )}
    </SafeAreaView>
  );
}
