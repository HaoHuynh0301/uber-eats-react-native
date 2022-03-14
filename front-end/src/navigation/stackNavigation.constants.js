import HomePage from "../screens/Home";
import RestaurantDetail from "../screens/RestaurantDetail";
import OrderComplete from "../screens/OrderComplete";
import Search from '../screens/Search';
import Profile from "../screens/Profile";
import Grocery from "../screens/Grocery";
import About from "../components/restaurantDetail/About";
import Auth from '../screens/Auth';


export const TAB_SCREENS = [
  {
    name: "Home",
    component: HomePage
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

export const AUTH_STACK_SCREENS = [
  {
    name: "About",
    component: RestaurantDetail
  }
]

export const LOGIN_STACK_SCREENS = [
  {
    name: "Login",
    component: Auth
  },
  {
    name: "Register",
    component: Auth
  }
]

