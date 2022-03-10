import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles/orderMenu.style";
import {Divider} from 'react-native-elements';

export default function OrderMenu({title, items, totalCost }) {
  const listItems = () => (
    items.map((item, index) => (
      <View key = {index} style = {styles.itemWrapper}>
        <View style = {styles.itemInforWrapper}>
          <Text style = {styles.itemTitle}>{item.title}</Text> 
          <Text>{item.price} VNĐ</Text>
        </View> 
        <Divider width = {1} />
      </View>
    ))
  );

  return (
    <View style = {styles.container}>
      <Text style = {styles.modalTitle}>{title}</Text>
      <View style = {styles.itemsContainer}> 
        {listItems()}
      </View>
      <View style = {styles.subTotalContainer}>
        <Text style = {styles.itemTitle}>Subtotal</Text>
        <Text>{totalCost} VNĐ</Text>
      </View>
      <TouchableOpacity onPress = {() => {
        
      }} style = {styles.checkoutBtn}>
        <Text style = {styles.bigWhiteTxt}>Checkout </Text>
      </TouchableOpacity>
    </View>
  );
}
