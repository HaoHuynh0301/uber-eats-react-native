import { KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/Auth/AuthForm";
import { FOOTER, SUBTITLE } from "./auth.constants";
import { loginRequest } from "../../redux/reducer/authReducer";
import { notiActions } from "../../redux/reducer/notiReducer";
import { Incubator } from "react-native-ui-lib";
const { Toast } = Incubator;

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [smsLogin, setSmsLogin] = useState(false);
  const [setPhonenumber, setSetPhonenumber] = useState("");
  const smsSent = useSelector((state) => state.userReducer.sentSms);
  const loginRequestStatus = useSelector((state) => state.authReducer.loginRequest);
  const { hideTime, visible, msg } = useSelector((state) => state.notiReducer);
  const dispatch = useDispatch();

  const handleRegister = () => {
    navigation.navigate("Register", {});
  };

  const handleSubmit = () => {
    dispatch(
      loginRequest({
        paths: ["auth", "login"],
        props: { username: username, password: password },
      })
    );
  };

  const handleSendSMS = () => {};

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
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        behavior="padding"
      >
        {!smsLogin ? (
          <AuthForm
            logo={true}
            textInputs={INPUT_FIELDS}
            submitButton={{
              label: "Login",
            }}
            subTitle={SUBTITLE}
            handleLogin={handleSubmit}
            subFooter={SUBFOOTER}
            footer={FOOTER}
            handleSendSms={() => setSmsLogin}
            loading = {loginRequestStatus}
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
      <Toast
        visible={visible}
        message={msg}
        autoDismiss={hideTime}
        onDismiss={() => dispatch(notiActions.hideMsgRequest())}
      ></Toast>
    </>
  );
}
