import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style/resItem.style";
import React, {useState, useEffect} from "react";
import CommunityMaterialIcons from "react-native-vector-icons/Ionicons";
import { Divider } from "react-native-elements";
import LottieView from "lottie-react-native";

export default function RestaurantItemDetail({isFavorite, item, navigation, updateFavRestaurant}) {
  const [longPress, setLongPress] = useState(false);

  useEffect(() => {
    setTimeout(() => {setLongPress(false)}, 2500);
  }, [longPress]);
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
        onLongPress={() => {
          setLongPress(true);
          updateFavRestaurant(item.name);
        }}
      >
        <View style={styles.resItemWrapper}>
          <LottieView
            style={{
              width: 200,
              height: 200,
              position: "absolute",
              zIndex: 1000,
              top: 0,
              right: 25,
              shadowOpacity: 0.2,
              display: longPress ? 'flex' : 'none'
            }}
            speed={1.5}
            source={require("../../../assets/animation/99228-heart2heart.json")}
          />
          <Image source={item.image} style={styles.itemImg} />
          <CommunityMaterialIcons
            name={
              isFavorite
                ? "heart"
                : "heart-outline"
            }
            size={25}f
            style={styles.heartIcon}
            color={isFavorite ? 'red' : 'white'}
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
  )
}