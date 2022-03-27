import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    marginVertical: 15,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  itemImage: {
    height: 120,
    width: 120,
    borderRadius: 20,
  },
  itemInforContainer: {
    maxWidth: '50%',
    justifyContent: 'center',
    marginRight: 10
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 18
  },
  itemDescription: {
    fontSize: 12,
  },
  itemPrice: {
    fontWeight: "bold",
  }
});

export default styles;