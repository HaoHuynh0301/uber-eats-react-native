import { View, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/home/SearchBar";
import Categories from "../../components/home/Categories";
import RestaurantItem from "../../components/home/RestaurantItem";
import { ITEMS } from "../../components/home/RestaurantItem/item.constants";
import { CATEGORIES } from "../../components/home/Categories/categories.constants";
import styles from "./style";

export default function HomePage({ navigation }) {
  const [restaurantItems, setRestaurantItems] = useState(ITEMS);
  const [category, setCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");

  //Find restaurant's name whenever search value changed
  useEffect(() => {
    if (searchValue !== "") {
      let res = [...ITEMS];
      restaurantItems.map((item) => {
        if (item.name.includes(searchValue)) {
          res = [...res.filter((res) => res === item)];
        }
      });
      setRestaurantItems([...res]);
    } else setRestaurantItems([...ITEMS]);
  }, [searchValue]);

  useEffect(() => {
    if (category !== "") {
      let res = [...ITEMS];
      res.map((item) => {
        if (item.categories.find((item) => item === category)) {
          res = [...res.filter((res) => res === item)];
        }
      });
      setRestaurantItems([...res]);
    } else setRestaurantItems([...ITEMS]);
  }, [category]);

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleCategorySelected = (prevValue, insValue) => {
    if(prevValue === insValue) {
      setCategory('');
    } else setCategory(insValue);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <HeaderTab /> */}
        <SearchBar
          clearData={handleClearSearch}
          onChange={setSearchValue}
          value={searchValue}
        />
      </View>
      <ScrollView showVerticalScrollbar={false}>
        <Categories
          selectedValue={category}
          data={CATEGORIES}
          onSelected={handleCategorySelected}
        />
        <RestaurantItem data={restaurantItems} navigation={navigation} />
      </ScrollView>
      {/* <Divider width={1} /> */}
    </SafeAreaView>
  );
}
