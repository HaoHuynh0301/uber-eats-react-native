import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./style /login.style";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleUsernameChanged = (text) => {
    setUsername(text);
  }

  const handlePasswordChanged = (text) => {
    setPassword(text);
  }

  const clearInput = () => {
    setUsername("");
    setPassword("");
  }

  const handleSubmit = () => {
    dispatch({
      type: 'LOGIN_REQUEST',
      payload: {
        username: 'username',
        password: 'password'
      }
    });
    // clearInput();
  }

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <TextInput
        onChangeText = {text => setUsername(text)}
        style={styles.inputField}
        value={username}
        placeholder="Username"
      />
      <TextInput
        onChangeText = {text => handlePasswordChanged(text)}
        secureTextEntry={true}
        value={password}
        style={styles.inputField}
        placeholder="Password"
      />
      <TouchableOpacity onPress = {handleSubmit} style={styles.btnSubmit}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
