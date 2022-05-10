import { View, Text, Image } from "react-native";
import React, {memo} from "react";

export default memo(function ShoppingCartIcon() {
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
});
