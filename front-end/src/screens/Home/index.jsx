import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import HeaderTab from "../../components/home/HeaderTab";
import SearchBar from "../../components/home/SearchBar";
import Categories from "../../components/home/Categories";
import RestaurantItem from "../../components/home/RestaurantItem";
import { ITEMS } from "../../components/home/RestaurantItem/item.constants";
import { Divider, useTheme } from "react-native-elements";
import BottomTabs from "../../components/home/BottomTabs";
import styles from "./style";

export default function HomePage({ navigation }) {
  const [restaurantItems, setRestaurantItems] = useState(ITEMS);
  const [city, setCity] = useState("Cần Thơ"); //Use for change location to get a list of available restaurants

  //Use for fetching data from server. The callback function will be called whenever the city changed
  useEffect(() => {}, [city]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderTab />
        <SearchBar />
      </View>

      <ScrollView showVerticalScrollbar={false}>
        <Categories />
        <RestaurantItem data={restaurantItems} navigation={navigation} />
      </ScrollView>

      <Divider width={1} />
      <BottomTabs navigation = {navigation} />
    </SafeAreaView>
  );
}
