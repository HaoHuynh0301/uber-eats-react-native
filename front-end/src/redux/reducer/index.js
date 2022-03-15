import { combineReducers } from "redux";

import {cartReducer} from "./cartReducer";
import {authReducer} from './authReducer';
import {userReducer} from './userReducer';

let reducers = combineReducers({
  cartReducer: cartReducer,
  authReducer: authReducer,
  userReducer: userReducer
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
