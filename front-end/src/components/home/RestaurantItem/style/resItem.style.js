import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  resItemWrapper: {
    flexDirection: "column",
    padding: 10,
    marginTop: 20
  },
  itemImg: {
    height: 180,
    width: '100%',
    borderRadius: 20
  },
  heartIcon: {
    position: "absolute",
    top: 25,
    right: 20
  },
  resItemInforWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  basicInfWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemTime: {
    fontSize: 13,
    color: 'grey'
  },
  itemRateWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    width: 50,
    alignItems: 'center',
    borderRadius: 20
  },
  itemRate: {
    fontWeight: 'bold'
  }
});

export default styles;
