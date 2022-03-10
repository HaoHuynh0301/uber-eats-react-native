import { View } from "react-native";
import React from "react";
import About from "../../components/restaurantDetail/About";
import MenuItems from "../../components/restaurantDetail/MenuItems";
import ViewCart from "../../components/restaurantDetail/ViewCart";
import { MENU_ITEMS } from "./constants/restaurants.constant";
import { Divider } from "react-native-elements";

export default function RestaurantDetail({ route, navigation }) {
  return (
    <View style={{ height: "100%" }}>
      <About data={MENU_ITEMS} route={route} />
      <Divider width={1.8} />
      <MenuItems route={route} />
      <ViewCart navigation={navigation} route={route} />
    </View>
  );
}
