import RootNavigation from './src/navigation/navigation';
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./src/redux/store";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  return (
    <ReduxProvider store={configureStore}>
      <RootNavigation />
    </ReduxProvider>
  );
}

