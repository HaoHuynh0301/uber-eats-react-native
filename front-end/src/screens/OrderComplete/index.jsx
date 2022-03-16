import { Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles/order.style";
import { ORDER_TITLE } from "./constants/order.constants";
import OrderItems from "./OrderItems";
import CheckingComponent from "../../components/OrderComplete/CheckingComponent";
import CookingComponent from "../../components/OrderComplete/CookingComponent";
import EmptyCart from '../../components/OrderComplete/EmptyCart';

export default function OrderComplete() {
  const dispatch = useDispatch();
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const totalCost = items.reduce(
    (cost, item, index, items) => (cost += item.price),
    0
  );

  console.log(items.length);

  return (
    <SafeAreaView style={styles.container}>
      {items.length !== 0 ? (
        <>
          <CheckingComponent styles={styles} />
          <Text style={styles.orderTitle}>
            {ORDER_TITLE(restaurantName, totalCost)}
          </Text>
    
          <ScrollView showVerticalScrollbar={false}>
            <OrderItems items={items} />
          </ScrollView>
    
          <CookingComponent styles={styles} />
          </> 
      ) : <>
        <EmptyCart />
      </>}
    </SafeAreaView>
  );
}
