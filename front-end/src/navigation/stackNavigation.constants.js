import HomePage from "../screens/Home";
import RestaurantDetail from "../screens/RestaurantDetail";
import OrderComplete from "../screens/OrderComplete";
import Search from '../screens/Search';
import Profile from "../screens/Profile";
import Grocery from "../screens/Grocery";

export const STACK_SCREENS = [
  {
    name: "Home",
    component: HomePage,
  },
  {
    name: "About",
    component: RestaurantDetail,
  },
  {
    name: 'Search',
    component: Search
  },
  {
    name: "Orders",
    component: OrderComplete,
  },
  {
    name: 'Grocery',
    component: Grocery
  },
  {
    name: 'Profile',
    component: Profile
  },
];

