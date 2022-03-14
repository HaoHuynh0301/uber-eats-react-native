import { TAB_SCREENS, AUTH_STACK_SCREENS } from "./stackNavigation.constants";
import { TAB_OPTIONS } from "./screen.option";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BOTTOM_ICONS } from "../components/home/BottomTabs/constants/bottomIcons.constants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const TabNavigator = createBottomTabNavigator();

export const TabNavigatorContainer = () => (
  <TabNavigator.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let screen = BOTTOM_ICONS.find((screen) => screen.name === route.name);
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
    {TAB_SCREENS.map((screen, index) => (
      <TabNavigator.Screen
        name={screen.name}
        component={screen.component}
        options={TAB_OPTIONS}
      />
    ))}
  </TabNavigator.Navigator>
);

export const StackScreens = (StackNavigator) =>
  AUTH_STACK_SCREENS.map((screen, index) => (
    <StackNavigator.Screen
      key={index}
      name={screen.name}
      component={screen.component}
      options={TAB_OPTIONS}
    />
  ));
