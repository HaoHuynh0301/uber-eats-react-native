import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import HomePage from "./src/screens/Home";
import RestaurantDetail from './src/screens/RestaurantDetail';
import RootNavigation from './src/navigation/navigation';

export default function App() {
  return (
    <RootNavigation />
  );
}

