import { KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/Auth/AuthForm";
import { FOOTER, SUBTITLE } from "./auth.constants";
import {login, loginRequest} from '../../redux/reducer/authReducer';

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [smsLogin, setSmsLogin] = useState(false);
  const [setPhonenumber, setSetPhonenumber] = useState("");
  const smsSent = useSelector((state) => state.userReducer.sentSms);
  const dispatch = useDispatch();

  const handleRegister = () => {
    navigation.navigate("Register", {});
  };

  const handleSubmit = () => {
    dispatch(loginRequest({}));
  };

  const handleSendSMS = () => {

  };

  const SMS_INPUT = [
    {
      icon: "phone",
      label: "Phone number",
      placeholder: "Phone number",
      onChange: (value) => setSetPhonenumber(value),
      value: setPhonenumber,
    },
  ];

  const INPUT_FIELDS = [
    {
      icon: "user",
      label: "Username",
      placeholder: "Username",
      onChange: (value) => setUsername(value),
      value: username,
    },
    {
      icon: "link",
      label: "Password",
      placeholder: "Password",
      isSecure: true,
      onChange: (value) => setPassword(value),
      value: password,
    },
  ];

  const SMS_SUBFOOTER = [
    {
      type: "link",
      label: "Login with password",
      onClick: () => setSmsLogin(false),
    },
  ];

  const SUBFOOTER = [
    {
      type: "link",
      label: "Register",
      onClick: () => handleRegister(),
    },
    {
      type: "link",
      label: "Register by SMS",
      onClick: () => setSmsLogin(true),
    },
  ];

  const SEND_SMS_BUTTON = {
    label: "Send SMS",
    onPress: () => handleSendSMS(),
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      behavior="padding"
    >
      {!smsLogin ? (
        <AuthForm
          logo={true}
          textInputs={INPUT_FIELDS}
          loginButton={{
            label: "Login",
          }}
          subTitle={SUBTITLE}
          handleLogin={handleSubmit}
          subFooter={SUBFOOTER}
          footer={FOOTER}
          handleSendSms={() => setSmsLogin}
        />
      ) : smsSent ? (
        <AuthForm
          logo={true}
          sentSms={true}
          subFooter={SMS_SUBFOOTER}
          footer={FOOTER}
        />
      ) : (
        <AuthForm
          logo={true}
          textInputs={SMS_INPUT}
          sendSmsButton={SEND_SMS_BUTTON}
          handleLogin={handleSubmit}
          subFooter={SMS_SUBFOOTER}
          footer={FOOTER}
          handleSendSms={() => setSmsLogin}
        />
      )}
    </KeyboardAvoidingView>
  );
}
