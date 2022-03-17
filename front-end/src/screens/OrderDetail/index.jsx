import { Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import styles from "./styles/orderDetail.style";
import CookingComponent from "../../components/OrderComplete/CookingComponent";
import { ORDER_TITLE } from "../OrderComplete/constants/order.constants";
import OrderItems from "../OrderComplete/OrderItems";

export default function OrderDetail({ navigation, route }) {
  const { items, totalCost } = route.params;
  const restaurantName = route.params.restaurantDescription.name;

  return (
    <SafeAreaView style={styles.container}>
      <CookingComponent styles = {styles} />
      <Text style = {styles.statusTxt}>{ORDER_TITLE(restaurantName, totalCost)}</Text>
      <ScrollView showVerticalScrollbar={false}>
        <OrderItems items={items} />
      </ScrollView>
    </SafeAreaView>
  );
}
