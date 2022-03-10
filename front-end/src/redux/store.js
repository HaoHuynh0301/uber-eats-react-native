import { createStore } from "redux";
import reducers from './reducer';

export default function configureStore(initialState) {
  return createStore(reducers, initialState)
}