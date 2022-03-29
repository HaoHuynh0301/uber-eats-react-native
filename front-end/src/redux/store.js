import reducers from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import { compose, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

const loggerMiddleware = createLogger();
const store = createStore(
  reducers,
  compose(
    process.env.NODE_ENV === "development"
      ? applyMiddleware(thunkMiddleware, loggerMiddleware)
      : applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);

export default store;
