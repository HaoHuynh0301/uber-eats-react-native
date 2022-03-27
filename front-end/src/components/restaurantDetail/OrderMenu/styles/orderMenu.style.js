import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemsContainer: {
    marginVertical: 10,
    width: '100%',
  },
  itemWrapper: {
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  itemInforWrapper: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  subTotalContainer: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10
  },
  checkoutBtn: {
    width: '80%',
    backgroundColor: 'black',
    height: 40,
    marginTop: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bigWhiteTxt: {
    color: 'white',
    fontSize: 16
  },
  smallWhiteTxt: {
    color: 'white',
  }
});

export default styles;