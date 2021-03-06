import { Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { ORDER_TITLE } from "../OrderComplete/constants/order.constants";
import styles from "../OrderComplete/styles/order.style";
import { useDispatch, useSelector } from "react-redux";
import OrderItems from "../../components/OrderComplete/OrderItems";
import EmptyCart from "../../components/OrderComplete/EmptyCart";
import { EMPTY_CART_LABELS } from "./constants/cart.constants";
import FloatingButton from "../../components/FloatingButton";
import ShoppingCartIcon from '../../components/Cart/ShoppingCartIcon';

export default function Cart() {
  const dispatch = useDispatch();
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const totalCost = items.reduce(
    (cost, item, index, items) => (cost += item.price * item.quantity),
    0
  );

  const cartItems = () => (
    <>
      <Text style={styles.orderTitle}>
        {ORDER_TITLE(restaurantName, totalCost)}
      </Text>
      
      <ScrollView showVerticalScrollbar={false}>
        <OrderItems items={items} />
      </ScrollView>
      <FloatingButton onPress = {() => {
        dispatch({
          type: 'CHECKED_OUT_REQUEST',
          payload: {
            items: items,
            restaurantName: restaurantName
          }
        });
      }} />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {items.length !== 0 ? (
        <>
          <ShoppingCartIcon />
          {cartItems()}
        </>
        
      ) : (
        <EmptyCart labels={EMPTY_CART_LABELS} />
      )}
    </SafeAreaView>
  );
}
