import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerDefault: {
    position: 'absolute',
    backgroundColor: 'black',
    width: 220,
    height: 50,
    borderRadius: 50,
    bottom: -100,
    left: '25%',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
    shadowOpacity: 0.2
  },
  containerCostValue: {
    position: 'absolute',
    backgroundColor: 'black',
    width: 220,
    height: 50,
    borderRadius: 50,
    bottom: 40,
    left: '25%',
    margin: 'auto',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    shadowOpacity: 0.2, 
    shadowOffset: {
      width: 5,
      height: 5
    }
  },
  viewCartTxt: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  viewCartPrice: {
    color: 'white'
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  overDiv: {
    flex: 0.4,
  },
  modalDisplayContainer: {
    flex: 0.6,
    backgroundColor: 'white'
  }
});

export default styles;