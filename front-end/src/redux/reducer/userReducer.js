let defaultState = {
  userInfor: {
    username: '',
    phoneNumber: '',
    name: '',
    gender: '',
    dataOfBirth: '',
    password: ''
  }
}

let userReducer = (state = defaultState, action) => {
  switch(action.type) {
    default: 
      return state;
  }
}

export {
  userReducer
}