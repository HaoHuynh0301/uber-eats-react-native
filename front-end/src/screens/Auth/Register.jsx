import { KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
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

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [validInfor, setValidInfor] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setpasswordValid] = useState(false);
  const [conPasswordValid, setConPasswordValid] = useState(false);

  useEffect(() => {
    if(usernameValid && passwordValid &&  conPasswordValid) setValidInfor(true);
  }, [usernameValid, passwordValid, conPasswordValid]);

  const INPUT_FIELDS = [
    {
      icon: "user",
      label: "Username",
      placeholder: "Username",
      onChange: (value) => setUsername(value),
      value: username,
      validate: ['required', value => value.length >= 6],
      errorMessage: ["This field is required", "The length of the username must be more than 6 characters"],
      onChangeValidity: (isValid) => {
        setUsernameValid(isValid);
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
      ,onChangeValidity: (isValid) => {
        setpasswordValid(isValid);
      }
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
      ,onChangeValidity: (isValid) => {
        setConPasswordValid(isValid);
      }
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
    navigation.navigate("Login", {});
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <AuthForm
        logo={true}
        textInputs={INPUT_FIELDS}
        subFooter={SUBFOOTER}
        footer={FOOTER}
        handleLogin={handleRegister}
        submitButton={{
          label: "Register",
        }}
        setValidInfor={setValidInfor}
        validInfor={validInfor}
      />
    </KeyboardAvoidingView>
  );
}
