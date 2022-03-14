import React from 'react';
import LottieView from "lottie-react-native";

export default function CheckingComponent({styles}) {
  return (
    <LottieView
      autoPlay
      loop = {false}
      speed={0.5}
      style={styles.lottieViewContainer}
      source={require("../../assets/animation/checkIconAnimation.json")}
    />
  )
}