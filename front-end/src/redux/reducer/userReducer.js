let defaultState = {
  userInfor: [
    {
      label: 'Username',
      value: 'hao152903',
    },
    {
      label: 'Phonenumber',
      value: '0932843656'
    },
    {
      label: 'Name',
      value: 'Hao Huynh'
    },
    {
      label: 'Gender',
      value: 'male'
    },
    {
      label: 'Date of birth',
      value: ''
    },
  ],
  sentSms: false
}

let userReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'SMS_SEND':
      let newState = {...state};
      newState.sentSms = true;
      console.log(newState);
      return newState;
    default: 
      return state;
  }
}

export {
  userReducer
}