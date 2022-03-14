const defaultState = {
  loggedIn: false
};

let authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST': {
      let newState = {...state};
      let {username, password} = action.payload;
      if(username && password) {
        newState.loggedIn = true;
      }
      return newState;
    }
    default:
      return state;
  }
}

export {authReducer}