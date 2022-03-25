import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style/resItem.style";
import React, { useState } from "react";
import CommunityMaterialIcons from "react-native-vector-icons/Ionicons";
import { Divider } from "react-native-elements";
import LottieView from "lottie-react-native";
import RestaurantItemDetail from "./RestaurantItem";

export default function RestaurantItem({ navigation, ...props }) {
  const RestaurantItemInfor = (items, favoriteItems, navigation) =>
    items.map((item, index) => {
      const isFavorite = favoriteItems.find(
        (_item) => _item.restaurantName === item.name
      )
        ? true
        : false;

      return (
        <React.Fragment>
          <RestaurantItemDetail isFavorite ={isFavorite} item={item} navigation={navigation} />
        </React.Fragment>
      );
    });
  return (
    <View>
      {RestaurantItemInfor(props.data, props.favoriteItems, navigation)}
    </View>
  );
}
