import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  resItemContainer: {
    width: "100%",
    borderWidth: 0.5,
    height: 150,
    flexDirection: "row",
  },
  itemImage: {
    height: "85%",
    width: "40%",
    alignSelf: "center",
    marginRight: 15,
    borderRadius: 20,
  },
  totalCostTxt: {
    fontWeight: "bold",
    fontSize: 16,
  },
  restaurantName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  resInforContainer: {
    width: "60%",
    justifyContent: "space-around",
  },
});

export default styles;
