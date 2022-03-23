import RootNavigation from './src/navigation/navigation';
import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./src/redux/store";
import {Toast} from 'react-native-ui-lib';

const store = configureStore();

export default function App() {

  return (
    <ReduxProvider store={store}>
      <RootNavigation />
    </ReduxProvider>
  );
}

