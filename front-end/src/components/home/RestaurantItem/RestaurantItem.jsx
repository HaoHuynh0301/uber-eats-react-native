import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style/resItem.style";
import React, {} from "react";
import CommunityMaterialIcons from "react-native-vector-icons/Ionicons";
import { Divider } from "react-native-elements";

export default function RestaurantItemDetail({isFavorite, item, navigation, updateFavRestaurant}) {
  return (
    <React.Fragment>
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
          <React.Fragment>
            <TouchableOpacity style = {styles.heartIcon} onPress={() => {
              updateFavRestaurant(item.name);
            }}>
              <CommunityMaterialIcons
                name={
                  isFavorite
                    ? "heart"
                    : "heart-outline"
                }
                size={27}
                color={isFavorite ? 'red' : 'white'}
              />
            </TouchableOpacity>
          </React.Fragment>
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
  )
}