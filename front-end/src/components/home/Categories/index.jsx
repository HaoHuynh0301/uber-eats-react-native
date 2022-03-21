import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./style/category.style";

export default function Categories(props) {
  const {data, onSelected} = props;

  const categoriesList = () =>
    data.map((item, index) => (
      <React.Fragment key = {index}>
        <TouchableOpacity onPress={() => onSelected(item.label)}>
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
