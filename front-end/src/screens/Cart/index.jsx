import { Text, SafeAreaView, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { ORDER_TITLE } from "../OrderComplete/constants/order.constants";
import styles from "../OrderComplete/styles/order.style";
import { useDispatch, useSelector } from "react-redux";
import OrderItems from "../../components/OrderComplete/OrderItems";
import EmptyCart from "../../components/OrderComplete/EmptyCart";
import { EMPTY_CART_LABELS } from "./constants/cart.constants";
import FloatingButton from "../../components/FloatingButton";

export default function Cart({ route, navigation }) {
  const [scroll, setScroll] = useState(false);
  const dispatch = useDispatch();
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const totalCost = items.reduce(
    (cost, item, index, items) => (cost += item.price),
    0
  );
  
  const handleCheckout = () => {
    dispatch({
      type: 'CHECKED_OUT_REQUEST',
      payload: {}
    });
    navigation.navigate('Orders', {})
  }

  const handleOnScroll = (e) => {
    console.log(e.nativeEvent.contentOffset);
  };

  const cartItems = () => (
    <>
      <Text style={styles.orderTitle}>
        {ORDER_TITLE(restaurantName, totalCost)}
      </Text>
      <ScrollView onScroll={handleOnScroll} showVerticalScrollbar={false}>
        <OrderItems items={items} />
      </ScrollView>
      <FloatingButton onPress = {handleCheckout} />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {items.length !== 0 ? (
        cartItems()
      ) : (
        <EmptyCart labels={EMPTY_CART_LABELS} />
      )}
    </SafeAreaView>
  );
}
