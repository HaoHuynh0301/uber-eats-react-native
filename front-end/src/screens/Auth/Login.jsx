import {
  KeyboardAvoidingView
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from '../../components/Auth/AuthForm';

export default function Login({navigation, route}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [smsLogin, setSmsLogin] = useState(false);
  const [setPhonenumber, setSetPhonenumber] = useState('');
  const dispatch = useDispatch();

  const smsSent = useSelector(state => state.userReducer.sentSms);
  const sentPhonenumer = useSelector(state => state.userReducer.sentPhonenumer)

  const handleRegister = () => {
    navigation.navigate('Register', {});
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

  const handleSendSMS = () => {
    dispatch({
      type: 'SMS_SEND',
      payload: {
        phonenumer: setPhonenumber
      }
    })
  }

  const SMS_INPUT = [
    {
      icon: 'phone',
      label: 'Phone number',
      placeholder: 'Phone number',
      onChange: (value) => setSetPhonenumber(value),
      value: setPhonenumber
    }
  ]

  const INPUT_FIELDS = [
    {
      icon: 'user',
      label: 'Username',
      placeholder: 'Username',
      onChange: (value) => setUsername(value),
      value: username
    },
    {
      icon: 'link',
      label: 'Password',
      placeholder: 'Password',
      isSecure: true,
      onChange: (value) => setPassword(value),
      value: password
    }
  ]

  const SMS_SUBFOOTER = [
    {
      type: 'link',
      label: 'Login with password',
      onClick: () => setSmsLogin(false)
    }
  ]

  const SUBFOOTER = [
    {
      type: 'link',
      label: 'Register',
      onClick: () => handleRegister()
    },
    {
      type: 'link',
      label: 'Register by SMS', 
      onClick: () => setSmsLogin(true)
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

  const SEND_SMS_BUTTON = {
    label: 'Send SMS',
    onPress: () => handleSendSMS()
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      behavior = "padding"
    >
      {!smsLogin ? (
        <AuthForm 
          logo = {true}
          textInputs = {INPUT_FIELDS}
          loginButton = {{
            label: 'Login'
          }}
          handleLogin = {handleSubmit}
          subFooter = {SUBFOOTER}
          footer = {FOOTER}
          handleSendSms = {() => setSmsLogin}
        />
      ): smsSent ? (
        <AuthForm 
          logo = {true}
          sentSms = {true}
          subFooter = {SMS_SUBFOOTER}
          footer = {FOOTER}
        />
      ) : (
        <AuthForm 
          logo = {true}
          textInputs = {SMS_INPUT}
          sendSmsButton = {SEND_SMS_BUTTON}
          handleLogin = {handleSubmit}
          subFooter = {SMS_SUBFOOTER}
          footer = {FOOTER}
          handleSendSms = {() => setSmsLogin}
        />
      )}
    </KeyboardAvoidingView>
  );
}
