import { Image } from "react-native";
import React from "react";

export default function DeliveryIcon() {
  return (
    <Image
      // source={require("../../assets/animation/delivery.gif")}
      style={{
        height: 100,
        width: 100,
        alignSelf: "center",
        margin: 20,
      }}
    />
  );
}
