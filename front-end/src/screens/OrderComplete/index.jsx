import { SafeAreaView, ScrollView, View } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles/order.style";
import EmptyCart from "../../components/OrderComplete/EmptyCart";
import { EMPTY_ORDER_LABEL } from "../../components/OrderComplete/constants/emptyOrder.constants";
import RestaurantItems from "../../components/OrderComplete/RestaurantItems";
import DeliveryIcon from "../../components/OrderComplete/DeliveryIcon";

export default function OrderComplete({navigation}) {
  const dispatch = useDispatch();

  const checkedoutItems = useSelector(
    (state) => state.cartReducer.checkedoutItems
  );

  return (
    <>
      {checkedoutItems.length === 0 ? (
      <SafeAreaView style={styles.container}>
        <EmptyCart labels={EMPTY_ORDER_LABEL} />
      </SafeAreaView>
    ) : (
      <View style = {{flex: 1, backgroundColor: '#f2f2f2', paddingTop: 50}}>
        <DeliveryIcon />
        <ScrollView>
          <RestaurantItems navigation = {navigation} items = {checkedoutItems} />
        </ScrollView>
      </View>
    )}
    </>
  );
}
