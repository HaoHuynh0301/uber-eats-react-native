import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./style/category.style";

export default function Categories(props) {
  const {data, selectedValue, onSelected} = props;

  const categoriesList = () =>
    data.map((item, index) => (
      <React.Fragment key = {index}>
        <TouchableOpacity style = {{
          backgroundColor: item.label === selectedValue ? '#ffd4cc' : 'white',
          height: '95%',
          width: 90,
          margin: 5,
          borderRadius: 10, 
          padding: 5,
          shadowOpacity: 0.1,
          shadowOffset: {
            width: 2,
            height: -5
          }
        }} onPress={() => onSelected(selectedValue, item.label)}>
          <View style={styles.cateWrapper} key={index}>
            <Image source={item.image} style={styles.cateImage} />
            <Text style={styles.cateText}>{item.text}</Text>
          </View>
        </TouchableOpacity>
      </React.Fragment>
    ));

  return (
    <ScrollView horizontal showHorizontalScrollBar={false}>
      <View style={styles.container}>{categoriesList()}</View>
    </ScrollView>
  );
}
