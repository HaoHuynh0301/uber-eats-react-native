import { View, Text, Image } from "react-native";
import React, {memo} from "react";
import styles from "./styles/about.style";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const RestaurantImage = (props) => (
  <Image
    source={props.source}
    placeholder={props.placeholder}
    style={styles.restaurantImage}
  />
);

const RestaurantTitle = (props) => (
  <Text style={styles.RestaurantTitle}>{props.name}</Text>
);

const RestaurantDescription = (props) => (
  <Text style={styles.RestaurantDescrip}>{props.description}</Text>
);

const RestaurantRating = (props) => (
  <Text style={styles.RestaurantRating}>
    {props.rate} <FontAwesome5 name="star" size={15} />
  </Text>
);

export default memo(function About({ route }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <RestaurantImage source={item.image} placeholder={item.placeholder} />

      <View style={styles.inforContainer}>
        <RestaurantTitle name={item.name} />
        <View style={styles.restaurantInforContainer}>
          <RestaurantDescription description={item.description} />
          <RestaurantRating rate={item.rate} />
        </View>
      </View>
    </View>
  );
});
