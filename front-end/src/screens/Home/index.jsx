import { View, SafeAreaView, ScrollView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/home/SearchBar";
import Categories from "../../components/home/Categories";
import RestaurantItem from "../../components/home/RestaurantItem";
import { ITEMS } from "../../components/home/RestaurantItem/item.constants";
import { CATEGORIES } from "../../components/home/Categories/categories.constants";
import styles from "./style";
import { useSelector, useDispatch } from "react-redux";

export default function HomePage({ navigation }) {
  const [restaurantItems, setRestaurantItems] = useState(ITEMS);
  const [category, setCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [favoriteList, setFavoriteList] = useState(false);
  const { favoriteItems } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
      let res = searchValue !== "" ? [...restaurantItems] : [...ITEMS];
      let f = false;
      res.map((item) => {
        if (item.categories.find((item) => item === category)) {
          res = [...res.filter((res) => res === item)];
          setRestaurantItems([...res]);
          f = true;
        }
      });
      if (!f) setRestaurantItems([]);
    } else setRestaurantItems(ITEMS);
  }, [category]);

  useEffect(() => {
    if (favoriteList)
      setRestaurantItems([
        ...restaurantItems.filter((_res) =>
          favoriteItems.find((item) => item.restaurantName === _res.name)
        ),
      ]);
  }, [favoriteList]);

  const handleChooseFavoriteList = () => {
    setFavoriteList(!favoriteList);
  }

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleCategorySelected = (prevValue, insValue) => {
    if (prevValue === insValue) {
      setCategory("");
    } else setCategory(insValue);
  };

  const handleUpdateFavRes = (_restaurantName) => {
    dispatch({
      type: "UPDATE_FAVORITE",
      payload: {
        restaurantName: _restaurantName,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <SearchBar
          clearData={handleClearSearch}
          onChange={setSearchValue}
          value={searchValue}
          setFavoriteList = {handleChooseFavoriteList}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showVerticalScrollbar={false}
      >
        <Categories
          selectedValue={category}
          data={CATEGORIES}
          onSelected={handleCategorySelected}
        />
        <RestaurantItem 
          updateFavRestaurant={handleUpdateFavRes}
          favoriteItems={favoriteItems}
          data={restaurantItems}
          navigation={navigation}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
