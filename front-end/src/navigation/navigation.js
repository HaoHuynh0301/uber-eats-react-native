import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { TAB_OPTIONS } from "./screen.option";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { STACK_SCREENS, HOME_STACK } from "./stackNavigation.constants";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "../redux/store";
import { BOTTOM_ICONS } from "../components/home/BottomTabs/constants/bottomIcons.constants";
import HomePage from "../screens/Home";
import About from "../components/restaurantDetail/About";
import RestaurantDetail from "../screens/RestaurantDetail";
import OrderComplete from "../screens/OrderComplete";
import {TabNavigatorContainer, StackScreens} from './Navigators';

const ScreenNavigator = createNativeStackNavigator();

const ScreenStackNavigator = () => (
  <ScreenNavigator.Navigator>
    <ScreenNavigator.Screen name = "Home" component = {TabNavigatorContainer} options = {TAB_OPTIONS}/>
    {StackScreens(ScreenNavigator)}
  </ScreenNavigator.Navigator>
);

const store = configureStore();

export default function RootNavigation() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>{ScreenStackNavigator()}</NavigationContainer>
    </ReduxProvider>
  );
}
