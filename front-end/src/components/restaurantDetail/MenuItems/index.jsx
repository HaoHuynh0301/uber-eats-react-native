import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import styles from "./styles/menuItems.style";
import { Divider } from "react-native-elements";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";

export default function MenuItems({ route }) {
  const { foodItem } = route.params.item;
  const { restaurantName } = route.params.restaurantName;

  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );

  console.log(route.params.restaurantName);

  //Check is the item was checked
  const isSelectedItem = (item) => {
    const isChecked = selectedItems.find(({title}) => title === item.title);
    return isChecked;
  };

  const selectedItem = (item, checkboxValue) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });

  return (
    <ScrollView showVerticalScrollbar={false}>
      {foodItem.map((item, key) => (
        <>
          <View style={styles.itemContainer} key={key}>
            <BouncyCheckbox
              iconStyle={{
                borderColor: "#d9d9d9",
                borderRadius: 5,
              }}
              fillColor= 'green'
              isChecked = {isSelectedItem(item)}
              onPress={(checkboxValue) => selectedItem(item, checkboxValue)}
            />
            <View style={styles.itemInforContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text
                numberOfLines={4}
                ellipsizeMode={"head"}
                style={styles.itemDescription}
              >
                {item.description}
              </Text>
              <Text style={styles.itemPrice}>{item.price} VNĐ</Text>
            </View>
            <Image
              style={styles.itemImage}
              source={item.image}
              placeholder={item.placeholder}
            />
          </View>
          <Divider width={0.3} />
        </>
      ))}
    </ScrollView>
  );
}
