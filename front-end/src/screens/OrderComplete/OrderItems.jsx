import { View, Text, Image } from "react-native";
import React from "react";
import styles from './styles/items.style';
import {Divider} from 'react-native-elements';

const itemImage = (source) => (
  <Image 
    source = {source}
    style = {styles.itemImage}
  />
);  

export default function OrderItems({items}) {
  const itemsView = items.map((item, index) => (
    <>
      <View style = {styles.container}>
        <View style = {styles.itemInforWrapper}> 
          <Text style = {styles.itemTitle}>{item.title}</Text>
          <Text style = {styles.itemDescription}>{item.description}</Text>
          <Text style = {styles.itemDescription}>{item.price} VNĐ</Text>
        </View>
        {itemImage(item.image)}
      </View>
      <Divider width = {1}/>
    </>
  ));
  
  return(
    <View>
      {itemsView}
    </View>
  );
}
