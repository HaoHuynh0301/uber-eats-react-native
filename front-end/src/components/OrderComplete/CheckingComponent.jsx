import React from 'react';
import LottieView from "lottie-react-native";

export default function CheckingComponent({styles, speed}) {
  return (
    <LottieView
      autoPlay = {false}
      loop = {false}
      // speed={0.5}
      style={styles.lottieViewContainer}
      source={require("../../assets/animation/checkIconAnimation.json")}
    />
  )
}