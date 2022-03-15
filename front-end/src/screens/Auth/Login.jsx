import {
  SafeAreaView,
  KeyboardAvoidingView
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AuthForm from '../../components/Auth/AuthForm';

const INPUT_FIELDS = [
  {
    icon: 'user',
    label: 'Username',
    placeholder: 'Username'
  },
  {
    icon: 'link',
    label: 'Password',
    placeholder: 'Password',
    isSecure: true
  }
]

const SUBFOOTER = [
  {
    type: 'link',
    label: 'Register',
  },
  {
    type: 'link',
    label: 'Register by SMS',
  }
]

const FOOTER = [
  {
    icon: 'google',
    label: 'Continue with Google'
  },
  {
    icon: 'facebook',
    label: 'Continue with Facebook'
  },
  {
    icon: 'github',
    label: 'Continue with Github'
  }
]

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
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      behavior = "padding"
    >
      <AuthForm 
        logo = {true}
        textInputs = {INPUT_FIELDS}
        loginButton = {{
          label: 'Login'
        }}
        handleLogin = {handleSubmit}
        subFooter = {SUBFOOTER}
        footer = {FOOTER}
      />
    </KeyboardAvoidingView>
  );
}
