import { View } from "react-native";
import React from "react";
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
          <RestaurantItemDetail updateFavRestaurant = {props.updateFavRestaurant} isFavorite ={isFavorite} item={item} navigation={navigation} />
        </React.Fragment>
      );
    });
  return (
    <View>
      {RestaurantItemInfor(props.data, props.favoriteItems, navigation)}
    </View>
  );
}
