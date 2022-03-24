import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 20,
    height: 100,
    marginVertical: 20,
    marginRight: 19,
  },
  itemInforWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '58%',
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemDescription: {
    fontSize: 13,
  },
  itemImage: {
    height: '100%',
    width: '40%', 
    borderRadius: 20
  }
});

export default styles;