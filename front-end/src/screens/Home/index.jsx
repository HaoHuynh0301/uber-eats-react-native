import { View, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import SearchBar from "../../components/home/SearchBar";
import Categories from "../../components/home/Categories";
import RestaurantItem from "../../components/home/RestaurantItem";
import { ITEMS } from "../../components/home/RestaurantItem/item.constants";
import styles from "./style";

export default function HomePage({ navigation }) {
  const [restaurantItems, setRestaurantItems] = useState(ITEMS);
  const [searchValue, setSearchValue] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <HeaderTab /> */}
        <SearchBar onChange={setSearchValue} value={searchValue} />
      </View>

      <ScrollView showVerticalScrollbar={false}>
        <Categories />
        <RestaurantItem data={restaurantItems} navigation={navigation} />
      </ScrollView>

      {/* <Divider width={1} /> */}
    </SafeAreaView>
  );
}
