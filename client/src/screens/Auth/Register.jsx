import { KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import AuthForm from "../../components/Auth/AuthForm";
import styles from "./style /register.style";
import {FOOTER} from './auth.constants';
import {useSelector, useDispatch} from 'react-redux';
import {registerRequest} from '../../redux/reducer/authReducer';
import { Incubator } from "react-native-ui-lib";
import {notiActions} from '../../redux/reducer/notiReducer';
const { Toast } = Incubator;

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [validInfor, setValidInfor] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setpasswordValid] = useState(false);
  const [conPasswordValid, setConPasswordValid] = useState(false);
  const { hideTime, visible, msg } = useSelector((state) => state.notiReducer);
  const dispatch = useDispatch();

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
    dispatch(
      registerRequest({
        paths: ["auth", "login"],
        props: { username: username, password: password },
      })
    );
    setTimeout(() => {navigation.navigate('Login', {})}, 1500);
  };

  return (
    <>
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
      <Toast
        visible={visible}
        message={msg}
        autoDismiss={hideTime}
        onDismiss={() => dispatch(notiActions.hideMsgRequest())}
      ></Toast>
    </>
  );
}
