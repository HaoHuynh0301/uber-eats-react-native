import { View, Text, Image, ScrollView } from "react-native";
import React, {memo} from "react";
import styles from "./styles/menuItems.style";
import { Divider } from "react-native-elements";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";

export default memo(function MenuItems({
  route,
  handleSelectedItem,
  selectedItems,
  selectedRestaurantName,
}) {
  const { foodItem } = route.params.item;
  const { restaurantName } = route.params;

  //Check is the item was checked
  const isSelectedItem = (item) => {
    const isChecked = selectedItems.find(({ title }) => title === item.title);
    return isChecked;
  };

  return (
    <ScrollView showVerticalScrollbar={false}>
      {foodItem.map((item, key) => (
        <React.Fragment key={key}>
          <View style={styles.itemContainer} key={key}>
            <BouncyCheckbox
              iconStyle={{
                borderColor: "#d9d9d9",
                borderRadius: 5,
                visible: false,
              }}
              fillColor="green"
              isChecked={isSelectedItem(item)}
              onPress={(checkboxValue) =>
                handleSelectedItem(
                  item,
                  checkboxValue,
                  selectedRestaurantName,
                  restaurantName
                )
              }
              disableBuiltInState={
                selectedRestaurantName !== "" &&
                restaurantName !== selectedRestaurantName
              }
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
              <Text style={styles.itemPrice}>
                {item.price * item.quantity} VNĐ
              </Text>
            </View>
            <Image
              style={styles.itemImage}
              source={item.image}
              placeholder={item.placeholder}
            />
          </View>
          <Divider width={0.3} />
        </React.Fragment>
      ))}
    </ScrollView>
  );
});
