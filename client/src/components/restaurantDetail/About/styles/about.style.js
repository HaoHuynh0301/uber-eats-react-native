import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  restaurantImage: {
    width: '100%',
    height: 220
  },
  RestaurantTitle: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold'
  },
  inforContainer: {
    paddingHorizontal: 20,
  },
  container: {
    marginBottom: 10
  },
  restaurantInforContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  RestaurantDescrip: {
    maxWidth: '80%',
  },
  RestaurantRating: {
    fontWeight: 'bold'
  }
});
export default styles;