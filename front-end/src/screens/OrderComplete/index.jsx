import { Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles/order.style";
import { ORDER_TITLE } from "./constants/order.constants";
import OrderItems from "./OrderItems";
import CheckingComponent from "../../components/OrderComplete/CheckingComponent";
import CookingComponent from "../../components/OrderComplete/CookingComponent";
import EmptyCart from '../../components/OrderComplete/EmptyCart';
import {EMPTY_ORDER_LABEL} from '../../components/OrderComplete/constants/emptyOrder.constants';

export default function OrderComplete() {
  const dispatch = useDispatch();
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const {isCheckedOut} = useSelector(state => state.cartReducer);
  const totalCost = items.reduce(
    (cost, item, index, items) => (cost += item.price),
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      {isCheckedOut ? (
        <>
          <CheckingComponent styles={styles} speed = {0.5} />
          <Text style={styles.orderTitle}>
            {ORDER_TITLE(restaurantName, totalCost)}
          </Text>
    
          <ScrollView showVerticalScrollbar={false}>
            <OrderItems items={items} />
          </ScrollView>
        </> 
      ) : <>
        <EmptyCart labels = {EMPTY_ORDER_LABEL} />
      </>}
    </SafeAreaView>
  );
}
