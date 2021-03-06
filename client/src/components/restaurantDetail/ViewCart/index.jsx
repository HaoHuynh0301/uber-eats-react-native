import { Text, TouchableOpacity, Modal, View } from "react-native";
import React, { useState } from "react";
import styles from "./styles/viewCart.style";
import { useDispatch } from "react-redux";
import OrderMenu from "../OrderMenu";

export default function ViewCart({
  route,
  navigation,
  onChangeQuantity,
  selectedItems,
  restaurantName,
  totalCost,
}) {
  const [displayedModal, setDisplayedModal] = useState(false);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    setDisplayedModal(false);
    dispatch({
      type: "CHECKED_OUT_REQUEST",
      payload: {
        items: selectedItems,
        restaurantName: restaurantName,
      },
    });
    navigation.navigate("Orders", {});
  };

  const modalView = () => (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        onPress={() => setDisplayedModal(false)}
        style={styles.overDiv}
      ></TouchableOpacity>
      <View style={styles.modalDisplayContainer}>
        <OrderMenu
          onChangeQuantity={onChangeQuantity}
          totalCost={totalCost}
          items={selectedItems}
          title={route.params.restaurantName}
          handleCheckout={handleCheckout}
        />
      </View>
    </View>
  );

  //Change class style of container rely on total cost
  let itemContainerStyle =
    totalCost === 0 ? styles.containerDefault : styles.containerCostValue;

  return (
    <>
      <Modal
        animationType="slide"
        visible={displayedModal}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        dismiss={() => setDisplayedModal(false)}
      >
        {modalView()}
      </Modal>

      <TouchableOpacity
        style={itemContainerStyle}
        activeOpacity={0.5}
        onPress={() => {
          setDisplayedModal(!displayedModal);
        }}
      >
        <Text style={styles.viewCartTxt}>View Cart</Text>
        {totalCost !== 0 && (
          <Text style={styles.viewCartPrice}>{totalCost} VNĐ</Text>
        )}
      </TouchableOpacity>
    </>
  );
}
