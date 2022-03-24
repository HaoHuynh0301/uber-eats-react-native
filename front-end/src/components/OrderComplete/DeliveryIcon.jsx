import { Image } from "react-native";
import React from "react";

export default function DeliveryIcon() {
  return (
    <Image
      source={require("../../assets/animation/99271-food-out-for-delivery.gif")}
      style={{
        height: 200,
        width: 200,
        alignSelf: "center",
        margin: 20,
      }}
    />
  );
}
