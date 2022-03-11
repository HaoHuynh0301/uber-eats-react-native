import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, {useRef, useEffect} from "react";
import { useSelector } from "react-redux";
import styles from "./styles/order.style";
import LottieViewComponent from "./LottieView";
import { ORDER_TITLE } from "./constants/order.constants";
import OrderItems from "./OrderItems";
import CookingComponent from './CookingComponent';
import LottieView from "lottie-react-native";

export default function OrderComplete() {
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const totalCost = items.reduce(
    (cost, item, index, items) => (cost += item.price),
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <LottieViewComponent styles={styles} />
      <Text style={styles.orderTitle}>
        {ORDER_TITLE(restaurantName, totalCost)}
      </Text>

      <ScrollView showVerticalScrollbar={false}>
        <OrderItems items = {items}/>
      </ScrollView>

      <LottieView 
        autoPlay
        loop = {true}
        speed = {1}
        style={styles.cookingIcon}
        source={require("../../assets/animation/cooking-animation.json")}
      />
    </SafeAreaView>
  );
}
