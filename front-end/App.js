import RootNavigation from './src/navigation/navigation';
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./src/redux/store";

export default function App() {

  return (
    <ReduxProvider store={configureStore}>
      <RootNavigation />
    </ReduxProvider>
  );
}

