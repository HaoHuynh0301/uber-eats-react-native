import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TAB_OPTIONS } from "./screen.option";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigatorContainer, StackScreens } from "./Navigators";
import { LOGIN_STACK_SCREENS } from "./stackNavigation.constants";
import {useDispatch, useSelector} from 'react-redux';

const ScreenNavigator = createNativeStackNavigator();
const LoginNavigator = createNativeStackNavigator();

const LoginStackNavigator = () => (
  <LoginNavigator.Navigator>
    {LOGIN_STACK_SCREENS.map((screen, index) => (
      <LoginNavigator.Screen
        key={index}
        name={screen.name}
        component={screen.component}
        options = {TAB_OPTIONS}
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

export default function RootNavigation({ auth }) {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.authReducer.loggedIn);
    
  return(
    <NavigationContainer>
      {loggedIn ? ScreenStackNavigator() : LoginStackNavigator()}
    </NavigationContainer>
  );
}
