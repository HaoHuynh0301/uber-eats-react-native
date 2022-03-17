import { combineReducers } from "redux";
import { notiReducer } from "./notiReducer"; 
import {cartReducer} from "./cartReducer";
import {authReducer} from './authReducer';
import {userReducer} from './userReducer';

let reducers = combineReducers({
  cartReducer: cartReducer,
  authReducer: authReducer,
  userReducer: userReducer,
  notiReducer: notiReducer
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
