import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles/restaurantItems.style";
import { ITEMS } from "../home/RestaurantItem/item.constants";
import CheckingComponent from "./CheckingComponent";

export default function RestaurantItems({ items, navigation }) {
  const handleOpenOrderDetail = (item, totalCost, restaurantDescription) => {
    navigation.navigate("OrderDetail", {
      ...item,
      totalCost: totalCost,
      restaurantDescription: restaurantDescription,
    });
  };
  const renderItem = () =>
    items.map((item, index) => {
      const totalCost = item.items.reduce(
        (cost, item, index, items) => (cost += item.price),
        0
      );
      let restaurantDescription = ITEMS.find(
        (restaurant) => restaurant.name === item.restaurantName
      );
      return (
        <TouchableOpacity
          onPress={() =>
            handleOpenOrderDetail(item, totalCost, restaurantDescription)
          }
          activeOpacity={0.5}
          style={styles.resItemContainer}
          key={index}
        >
          <Image
            style={styles.itemImage}
            source={restaurantDescription.image}
          />
          <View style={styles.resInforContainer}>
            <Text style={styles.restaurantName}>{item.restaurantName}</Text>
            <Text style={{ flexShrink: 1 }}>
              {restaurantDescription.description}
            </Text>
            <Text style={styles.totalCostTxt}>{totalCost} VNĐ</Text>
          </View>
        </TouchableOpacity>
      );
    });
  return (
    <View style={styles.container}>
      <CheckingComponent styles={styles} speed={0.5} />
      {renderItem()}
    </View>
  );
}
