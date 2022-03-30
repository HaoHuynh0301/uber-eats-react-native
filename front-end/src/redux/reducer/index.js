import { combineReducers } from "redux";
import notiReducer from "./notiReducer"; 
import {cartReducer} from "./cartReducer";
import authReducer from './authReducer';
import {userReducer} from './userReducer';

let rootReducer = combineReducers({
  cartReducer: cartReducer,
  authReducer: authReducer,
  userReducer: userReducer,
  notiReducer: notiReducer
});

export default rootReducer;
