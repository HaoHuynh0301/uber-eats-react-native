import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import styles from "./style/category.style";
import { CATEGORIES } from "./categories.constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Divider } from "react-native-elements";

let categoriesList = () =>
  CATEGORIES.map((item, index) => (
    <React.Fragment key = {index}>
      <TouchableOpacity>
        <View style={styles.cateWrapper} key={index}>
          <Image source={item.image} style={styles.cateImage} />
          <Text style={styles.cateText}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    </React.Fragment>
  ));

export default function Categories(props) {
  return (
    <ScrollView horizontal showHorizontalScrollBar={false}>
      <View style={styles.container}>{categoriesList()}</View>
    </ScrollView>
  );
}
