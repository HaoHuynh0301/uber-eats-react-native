import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  resItemContainer: {
    width: "100%",
    borderWidth: 0,
    height: 150,
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    borderWidth: 0.2, 
    borderColor: 'silver',
    borderRadius: 20,
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 5,
      height: 5
    }
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
