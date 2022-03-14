import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TAB_OPTIONS } from "./screen.option";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "../redux/store";
import { TabNavigatorContainer, StackScreens } from "./Navigators";
import { LOGIN_STACK_SCREENS } from "./stackNavigation.constants";

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

const store = configureStore();

export default function RootNavigation({ auth }) {
  return(
    <ReduxProvider store={store}>
      <NavigationContainer>
        {auth ? ScreenStackNavigator() : LoginStackNavigator()}
      </NavigationContainer>
    </ReduxProvider>
  );
}
