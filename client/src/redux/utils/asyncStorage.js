import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('access_token');
    return accessToken != null ? JSON.parse(accessToken) : null;
  } catch(e) {
    //pass
  }
}