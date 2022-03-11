import { Text, TouchableOpacity, Modal, View } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles/viewCart.style";
import { useSelector } from "react-redux";
import OrderMenu from "../OrderMenu";

export default function ViewCart({ route }) {
  const [displayedModal, setDisplayedModal] = useState(false);

  const selectedItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );
  const totalCost = selectedItems.reduce(
    (cost, item, index, selectedItems) => (cost += item.price),
    0
  );

  const modalView = () => (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        onPress={() => setDisplayedModal(false)}
        style={styles.overDiv}
      ></TouchableOpacity>
      <View style={styles.modalDisplayContainer}>
        <OrderMenu
          totalCost={totalCost}
          items={selectedItems}
          title={route.params.restaurantName}
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
