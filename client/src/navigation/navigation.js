import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TAB_OPTIONS } from "./screen.option";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigatorContainer, StackScreens } from "./Navigators";
import { LOGIN_STACK_SCREENS } from "./stackNavigation.constants";
import { useDispatch, useSelector } from "react-redux";
import { Image, View } from "react-native";
import { getAccessToken } from "../redux/reducer/authReducer";

const ScreenNavigator = createNativeStackNavigator();
const LoginNavigator = createNativeStackNavigator();

const LoginStackNavigator = () => (
  <LoginNavigator.Navigator>
    {LOGIN_STACK_SCREENS.map((screen, index) => (
      <LoginNavigator.Screen
        key={index}
        name={screen.name}
        component={screen.component}
        options={TAB_OPTIONS}
      />
    ))}
  </LoginNavigator.Navigator>
);

const ScreenStackNavigator = () => (
  <ScreenNavigator.Navigator>
    <ScreenNavigator.Screen
      name="Home"
      component={TabNavigatorContainer}
      options={TAB_OPTIONS}
    />
    {StackScreens(ScreenNavigator)}
  </ScreenNavigator.Navigator>
);

export default function RootNavigation() {
  const {login, loading} = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAccessToken());
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../assets/animation/99778-my-store-animated.gif")}
        />
      </View>
    );
  return (
    <NavigationContainer>
      {login ? ScreenStackNavigator() : LoginStackNavigator()}
    </NavigationContainer>
  );
}
