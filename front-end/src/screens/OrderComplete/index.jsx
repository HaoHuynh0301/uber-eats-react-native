import { SafeAreaView, ScrollView, View, Text } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles/order.style";
import EmptyCart from "../../components/OrderComplete/EmptyCart";
import { EMPTY_ORDER_LABEL } from "../../components/OrderComplete/constants/emptyOrder.constants";
import RestaurantItems from "../../components/OrderComplete/RestaurantItems";
import DeliveryIcon from "../../components/OrderComplete/DeliveryIcon";

export default function OrderComplete({ navigation }) {
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
        <View style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: 50 }}>
          <DeliveryIcon />
          <Text style = {{alignSelf: "center", fontSize: 18, marginTop: -35, marginBottom: 20, fontWeight: "bold"}}>Your orders are on delivering</Text>
          <ScrollView>
            <RestaurantItems navigation={navigation} items={checkedoutItems} />
          </ScrollView>
        </View>
      )}
    </>
  );
}
