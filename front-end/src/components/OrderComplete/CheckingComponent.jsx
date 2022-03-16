import React from 'react';
import LottieView from "lottie-react-native";

export default function CheckingComponent({styles, speed}) {
  return (
    <LottieView
      autoPlay
      loop = {false}
      speed={speed}
      style={styles.lottieViewContainer}
      source={require("../../assets/animation/checkIconAnimation.json")}
    />
  )
}