import HomePage from "../screens/Home";
import RestaurantDetail from "../screens/RestaurantDetail";
import OrderComplete from "../screens/OrderComplete";
import Profile from "../screens/Profile";
import Cart from "../screens/Cart";
import Login from '../screens/Auth/Login';
import OrderDetail from '../screens/OrderDetail';
import Register from "../screens/Auth/Register";

export const TAB_SCREENS = [
  {
    name: "Home",
    component: HomePage
  },
  {
    name: "Orders",
    component: OrderComplete,
  },
  {
    name: 'Cart',
    component: Cart
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
  },
  {
    name: 'OrderDetail',
    component: OrderDetail
  }
]

export const LOGIN_STACK_SCREENS = [
  {
    name: "Login",
    component: Login
  },
  {
    name: "Register",
    component: Register
  }
]


