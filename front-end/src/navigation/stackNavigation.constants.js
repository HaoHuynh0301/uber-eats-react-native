import HomePage from '../screens/Home';
import RestaurantDetail from '../screens/RestaurantDetail';
import OrderComplete from '../screens/OrderComplete';

export const STACK_SCREENS = [
  {
    name: 'Home',
    component: HomePage
  },
  {
    name: 'About',
    component: RestaurantDetail
  },
  {
    name: 'Orders',
    component: OrderComplete
  }
];