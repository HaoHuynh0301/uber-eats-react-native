import React, {memo} from 'react';
import LottieView from "lottie-react-native";

export default memo(function CheckingComponent({styles, speed}) {
  return (
    <LottieView
      autoPlay = {false}
      loop = {false}
      style={styles.lottieViewContainer}
      source={require("../../assets/animation/checkIconAnimation.json")}
    />
  )
});