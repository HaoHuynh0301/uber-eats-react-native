import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  SCREEN_OPTIONS,
  TAB_OPTIONS,
  HIDDEN_TAB_OPTIONS,
} from "./screen.option";
import { STACK_SCREENS } from "./stackNavigation.constants";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "../redux/store";
import { BOTTOM_ICONS } from "../components/home/BottomTabs/constants/bottomIcons.constants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RestaurantDetail from "../screens/RestaurantDetail";

const Stack = createBottomTabNavigator();

const store = configureStore();

const stackScreens = (screens) =>
  screens.map((screen, index) => (
    <Stack.Screen
      key={index}
      name={screen.name}
      component={screen.component}
      options={screen.name !== "About" ? SCREEN_OPTIONS : HIDDEN_TAB_OPTIONS}
    />
  ));

export default function RootNavigation() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let screen = BOTTOM_ICONS.find(
                (screen) => screen.name === route.name
              );
              if (screen && screen.name !== "About") {
                return (
                  <FontAwesome5
                    name={screen.icon}
                    size={20}
                    style={{ marginTop: 5, alignSelf: "center" }}
                  />
                );
              }
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          {stackScreens(STACK_SCREENS)}
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
