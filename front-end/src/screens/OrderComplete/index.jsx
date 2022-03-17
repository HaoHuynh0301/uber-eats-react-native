import { SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles/order.style";
import EmptyCart from "../../components/OrderComplete/EmptyCart";
import { EMPTY_ORDER_LABEL } from "../../components/OrderComplete/constants/emptyOrder.constants";
import RestaurantItems from "../../components/OrderComplete/RestaurantItems";

export default function OrderComplete() {
  const dispatch = useDispatch();

  const checkedoutItems = useSelector(
    (state) => state.cartReducer.checkedoutItems
  );
  // const { isCheckedOut } = useSelector((state) => state.cartReducer);
  // const totalCost = items.reduce(
  //   (cost, item, index, items) => (cost += item.price),
  //   0
  // );

  return (
    <SafeAreaView style={styles.container}>
      {checkedoutItems.length === 0 ? (
        <EmptyCart labels={EMPTY_ORDER_LABEL} />
      ) : (
        <ScrollView>
          <RestaurantItems items = {checkedoutItems} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

// isCheckedOut ? (
//   <>
//     <CheckingComponent styles={styles} speed={0.5} />
//     <Text style={styles.orderTitle}>
//       {ORDER_TITLE(restaurantName, totalCost)}
//     </Text>

//     <ScrollView showVerticalScrollbar={false}>
//       <OrderItems items={items} />
//     </ScrollView>
//   </>
// ) : (
//   <EmptyCart labels={EMPTY_ORDER_LABEL} />
// )
