import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles/orderMenu.style";
import { Divider } from "react-native-elements";
import NumericInput from "react-native-numeric-input";

export default function OrderMenu({ title, items, totalCost, handleCheckout, onChangeQuantity }) {
  const listItems = () =>
    items.map((item, index) => (
      <View key={index} style={styles.itemWrapper}>
        <View style={styles.itemInforWrapper}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text>{item.price} VNĐ</Text>
        </View>
        <View style={{ marginLeft: 30, marginTop: -20, marginBottom: 20 }}>
          <NumericInput
            value={item.quantity}
            minValue={0}
            // defaultValue={1}
            totalHeight={25}
            totalWidth={80}
            onChange={(value) => {
              onChangeQuantity(Object.assign(item, {quantity: value}))
            }}
          />
        </View>
        <Divider width={1} />
      </View>
    ));

  return (
    <View style={styles.container}>
      <Text style={styles.modalTitle}>{title}</Text>
      <View style={styles.itemsContainer}>{listItems()}</View>
      <View style={styles.subTotalContainer}>
        <Text style={styles.itemTitle}>Subtotal</Text>
        <Text>{totalCost} VNĐ</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleCheckout();
        }}
        style={styles.checkoutBtn}
      >
        <Text style={styles.bigWhiteTxt}>Checkout </Text>
      </TouchableOpacity>
    </View>
  );
}
