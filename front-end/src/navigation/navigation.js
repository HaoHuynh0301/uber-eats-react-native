import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SCREEN_OPTIONS, TAB_OPTIONS } from "./screen.option";
import {STACK_SCREENS} from './stackNavigation.constants';
import { Provider as ReduxProvider } from "react-redux";
import configureStore from '../redux/store';

const Stack = createNativeStackNavigator();

const store = configureStore();

const stackScreens = (screens) => (
  screens.map((screen, index) => (
    <Stack.Screen key = {index} name = {screen.name} component = {screen.component} options = {TAB_OPTIONS}/>
  ))
);

export default function RootNavigation() {
  return (
    <ReduxProvider store = {store} >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={SCREEN_OPTIONS}>
          {stackScreens(STACK_SCREENS)}
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
