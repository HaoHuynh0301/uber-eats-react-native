import { combineReducers } from "redux";

import {cartReducer} from "./cartReducer";
import {authReducer} from './authReducer';

let reducers = combineReducers({
  cartReducer: cartReducer,
  authReducer: authReducer
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
