import { View, Text, Image } from "react-native";
import React from "react";

export default function ShoppingCartIcon() {
  return (
    <Image 
      source = {require('../../assets/animation/shopping-cart-icon.gif')}
      style = {{
        height: 100,
        width: 100,
        alignSelf: 'center',
        margin: 20
      }}
    />
  );
}
