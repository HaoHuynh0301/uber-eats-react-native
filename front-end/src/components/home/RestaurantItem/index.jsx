import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style/resItem.style";
import React from "react";
import CommunityMaterialIcons from "react-native-vector-icons/Ionicons";
import { Divider } from "react-native-elements";

const RestaurantItemInfor = (items, favoriteItems, navigation) =>
  items.map((item, index) => {
    const favoriteIcon = favoriteItems.find(
      (_item) => _item.restaurantName === item.name
    )
      ? "red"
      : "white";
    return (
      <React.Fragment key={index}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate("About", {
              item: item,
              restaurantName: item.name,
            });
          }}
        >
          <View style={styles.resItemWrapper}>
            <Image source={item.image} style={styles.itemImg} />
            <CommunityMaterialIcons
              name={favoriteItems.find(
                (_item) => _item.restaurantName === item.name
              )
                ? "heart"
                : "heart-outline"}
              size={25}
              style={styles.heartIcon}
              color={favoriteIcon}
            />
            <View style={styles.resItemInforWrapper}>
              <View style={styles.basicInfWrapper}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemTime}>{item.duration} - mins</Text>
              </View>
              <View style={styles.itemRateWrapper}>
                <Text style={styles.itemRate}>{item.rate}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <Divider width={1} />
      </React.Fragment>
    );
  });

export default function RestaurantItem({ navigation, ...props }) {
  return (
    <View>
      {RestaurantItemInfor(props.data, props.favoriteItems, navigation)}
    </View>
  );
}
