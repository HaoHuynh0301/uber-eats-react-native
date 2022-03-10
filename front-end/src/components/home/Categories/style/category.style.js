import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  cateWrapper: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  cateImage: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  cateText: {
    fontWeight: "bold",
  },
});

export default styles;
