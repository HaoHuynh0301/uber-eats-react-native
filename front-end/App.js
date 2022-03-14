import RootNavigation from './src/navigation/navigation';
import {useState} from 'react';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <RootNavigation auth = {loggedIn}/>
  );
}

