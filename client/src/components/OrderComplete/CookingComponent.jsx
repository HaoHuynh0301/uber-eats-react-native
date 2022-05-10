import React from 'react';
import LottieView from "lottie-react-native";
import {Image} from 'react-native';

export default function CookingComponent({styles}) {
  return (
    <Image style = {styles.cookingIcon} source = {require('../../assets/animation/cooking-your-food.gif')} /> 
  )
}