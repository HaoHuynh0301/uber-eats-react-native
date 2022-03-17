import { View } from "react-native";
import React, { useState } from "react";
import About from "../../components/restaurantDetail/About";
import MenuItems from "../../components/restaurantDetail/MenuItems";
import ViewCart from "../../components/restaurantDetail/ViewCart";
import { MENU_ITEMS } from "./constants/restaurants.constant";
import { Divider } from "react-native-elements";
import { Incubator } from "react-native-ui-lib";
import { useSelector, useDispatch } from "react-redux";
import { MSG } from "./constants/restaurants.constant";

const { Toast } = Incubator;

export default function RestaurantDetail({ route, navigation }) {
  const { hideTime, visible, msg } = useSelector((state) => state.notiReducer);
  const dispatch = useDispatch();

  const setVisibleMsg = () => {
    dispatch({
      type: "SELECT_ITEM_ERR_MSG_REQUEST",
      payload: {},
    });
  };

  return (
    <View style={{ height: "100%" }}>
      <About data={MENU_ITEMS} route={route} />
      <Divider width={1.8} />
      <MenuItems route={route} setVisible={setVisibleMsg} />
      <ViewCart navigation={navigation} route={route} />
      <Toast
        visible={visible}
        message={msg}
        autoDismiss={hideTime}
        onDismiss={() =>
          dispatch({
            type: "HIDE_SELECT_ITEM_ERR_MSG_REQUEST",
            payload: {},
          })
        }
      ></Toast>
    </View>
  );
}
