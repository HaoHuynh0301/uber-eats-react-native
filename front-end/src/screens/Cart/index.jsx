import { Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import {ORDER_TITLE} from '../OrderComplete/constants/order.constants';
import styles from '../OrderComplete/styles/order.style';
import {useDispatch, useSelector} from 'react-redux';
import OrderItems from '../../components/OrderComplete/OrderItems';
import EmptyCart from '../../components/OrderComplete/EmptyCart';
import {EMPTY_CART_LABELS} from './constants/cart.constants';

export default function Cart() {
  const dispatch = useDispatch();
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const {isCheckedOut} = useSelector(state => state.cartReducer);
  const totalCost = items.reduce(
    (cost, item, index, items) => (cost += item.price),
    0
  )

  const cartItems = () => (
    <>
      <Text style={styles.orderTitle}>
        {ORDER_TITLE(restaurantName, totalCost)}
      </Text>
      <ScrollView showVerticalScrollbar={false}>
        <OrderItems items={items} />
      </ScrollView>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {items.length !== 0 ? (cartItems) : <EmptyCart labels = {EMPTY_CART_LABELS} />}
    </SafeAreaView>
  );
}
