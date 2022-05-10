import {
  View,
  Button,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import About from "../../components/restaurantDetail/About";
import MenuItems from "../../components/restaurantDetail/MenuItems";
import ViewCart from "../../components/restaurantDetail/ViewCart";
import { MENU_ITEMS } from "./constants/restaurants.constant";
import { Divider } from "react-native-elements";
import { Incubator } from "react-native-ui-lib";
import { useSelector, useDispatch } from "react-redux";
const { Toast } = Incubator;
import {
  displayMsgRequest,
  hideMsgRequest,
} from "../../redux/reducer/notiReducer";
const backIcon = require("../../assets/image/back-icon.png");

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
    dispatch(displayMsgRequest({}));
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
      dispatch(displayMsgRequest({}));
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

  const renderheader = () => {
    return (
      <TouchableOpacity
        title=""
        style={styles.iconBackWrapper}
        onPress={() => navigation.goBack()}
      >
        <Image source={backIcon} resizeMode="contain" style={styles.backIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ height: "100%" }}>
      {renderheader()}
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
        totalCost={totalCost}
        restaurantName={selectedRestaurantName}
        selectedItems={selectedItems}
        onChangeQuantity={onChangeQuantity}
        navigation={navigation}
        route={route}
      />
      <Toast
        visible={visible}
        message={msg}
        autoDismiss={hideTime}
        onDismiss={() => dispatch(dispatch(hideMsgRequest()))}
      ></Toast>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBackWrapper: {
    position: "absolute",
    top: 20,
    zIndex: 1,
    // height: 10,
    // width: 20,
  },
  backIcon: {
    height: 50,
    width: 50,
  }
});
