import { KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import AuthForm from "../../components/Auth/AuthForm";
import styles from "./style /register.style";

const FOOTER = [
  {
    icon: "google",
    label: "Continue with Google",
  },
  {
    icon: "facebook",
    label: "Continue with Facebook",
  },
  {
    icon: "github",
    label: "Continue with Github",
  },
];

export default function Register({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [propsCheck, setPropsCheck] = useState(false);
  const [validInfot, setValidInfor] = useState(false);
  
  const INPUT_FIELDS = [
    {
      icon: "user",
      label: "Username",
      placeholder: "Username",
      onChange: (value) => setUsername(value),
      value: username,
      validate: ['required', value => value.length >= 6],
      errorMessage: ["This field is required", "The length of the username must be more than 6 characters"],
      handleError: () => {

      }
    },
    {
      icon: "link",
      label: "Password",
      placeholder: "Password",
      isSecure: true,
      onChange: (value) => setPassword(value),
      value: password,
      validate: ['required', value => !value.includes(username), value => value.length > 6],
      errorMessage: ["This field is required", "Password should not contain username", "The length of the username must be more than 6 characters"]
    },
    {
      icon: "link",
      label: "Confirm Password",
      placeholder: "Confirm password",
      isSecure: true,
      onChange: (value) => setConPassword(value),
      value: conPassword,
      validate: ['required', value => value === password],
      errorMessage: ["This field is required", "Password does not match"]
    },
  ];

  const handleLogin = () => {
    navigation.navigate("Login", {});
  };

  const SUBFOOTER = [
    {
      type: "link",
      label: "Login with password",
      onClick: () => handleLogin(),
    },
  ];

  const handleRegister = () => {
    if (username.length >= 6 && password.length >= 6 && conPassword >= 6) {
      navigation.navigate("Login", {});
    };
    
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <AuthForm
        logo={true}
        textInputs={INPUT_FIELDS}
        subFooter={SUBFOOTER}
        footer={FOOTER}
        handleLogin={handleRegister}
        propsCheck={propsCheck}
        loginButton={{
          label: "Register",
        }}

      />
    </KeyboardAvoidingView>
  );
}
