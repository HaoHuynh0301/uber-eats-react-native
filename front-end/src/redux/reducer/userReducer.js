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
  ]
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