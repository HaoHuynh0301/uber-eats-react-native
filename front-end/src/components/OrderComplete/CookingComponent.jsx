import React from 'react';
import LottieView from "lottie-react-native";

export default function CookingComponent({styles}) {
  return (
    <LottieView 
      autoPlay = {true}
      loop = {true}
      speed = {1}
      style={styles.cookingIcon}
      source={require("../../assets/animation/cooking-animation.json")}
    />
  )
}