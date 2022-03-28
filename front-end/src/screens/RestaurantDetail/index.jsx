import { View } from "react-native";
import React from "react";
import About from "../../components/restaurantDetail/About";
import MenuItems from "../../components/restaurantDetail/MenuItems";
import ViewCart from "../../components/restaurantDetail/ViewCart";
import { MENU_ITEMS } from "./constants/restaurants.constant";
import { Divider } from "react-native-elements";
import { Incubator } from "react-native-ui-lib";
import { useSelector, useDispatch } from "react-redux";
const { Toast } = Incubator;

export default function RestaurantDetail({ route, navigation }) {
  const { hideTime, visible, msg } = useSelector((state) => state.notiReducer);
  const dispatch = useDispatch();

  const selectedItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );

  const selectedRestaurantName = useSelector(
    (state) => state.cartReducer.selectedItems.restaurantName
  );

  const setVisibleMsg = () => {
    dispatch({
      type: "SELECT_ITEM_ERR_MSG_REQUEST",
      payload: {},
    });
  };

  const handleSelectedItem = (
    item,
    checkboxValue,
    selectedRestaurantName,
    restaurantName
  ) => {
    if (
      selectedRestaurantName !== "" &&
      restaurantName !== selectedRestaurantName
    ) {
      dispatch({
        type: "SELECT_ITEM_ERR_MSG_REQUEST",
        payload: {},
      });
    } else {
      Object.assign(item, { quantity: 1 });
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          ...item,
          restaurantName: restaurantName,
          checkboxValue: checkboxValue,
        },
      });
      return true;
    }
  };

  const onChangeQuantity = (item) => {
    dispatch({
      type: "UPDATE_SELECTED_ITEM",
      payload: {
        item: item,
      },
    });
  };

  //Count total cost of selected items
  const totalCost = selectedItems.reduce(
    (cost, item, index, selectedItems) => (cost += item.price * item.quantity),
    0
  );

  return (
    <View style={{ height: "100%" }}>
      <About data={MENU_ITEMS} route={route} />
      <Divider width={1.8} />
      <MenuItems
        handleSelectedItem={handleSelectedItem}
        route={route}
        setVisible={setVisibleMsg}
        selectedItems={selectedItems}
        selectedRestaurantName={selectedRestaurantName}
      />
      <ViewCart
        totalCost = {totalCost}
        restaurantName = {selectedRestaurantName}
        selectedItems = {selectedItems}
        onChangeQuantity={onChangeQuantity}
        navigation={navigation}
        route={route}
      />
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
