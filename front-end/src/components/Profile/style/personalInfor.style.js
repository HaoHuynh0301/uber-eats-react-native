import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#e6e6e6",
    height: "100%",
  },
  basicInforContainer: {
    width: "100%",
    marginTop: 20,
  },
  profileItemWrapper: {
    flexDirection: 'row',
    width: "100%",
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    justifyContent: 'space-between',
    minHeight: 60,
    alignItems: 'center',
    marginTop: -10
  },
  linklinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 155,
  },
  itemLabel: {
    fontSize: 16
  },
  logoutBtn: {
    marginTop: 10,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 5,
      height: 7
    }
  }
});

export default styles;
