import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultState = {
  loggedIn: false,
  loading: true
};

let authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST": {
      let newState = { ...state };
      let { username, password } = action.payload;
      if (username && password) {
        newState.loggedIn = true;
      }
      return newState;
    }
    case "LOGOUT_REQUEST": {
      let newState = { ...state };
      newState.loggedIn = false;
      return newState;
    }
    default:
      return state;
  }
};

export { authReducer };
