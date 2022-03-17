import {ERR_MSG} from '../constants/msg.constant';

let defaultState = {
  hideTime: 3500,
  visible: false,
  msg: 'hidden'
};

let notiReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'SELECT_ITEM_ERR_MSG_REQUEST': {
      const newState = {...state};
      const msg = ERR_MSG.find(msg => msg.type === action.type);
      newState.visible = true;
      newState.msg = msg.content;
      console.log(newState);
      return newState;
    }
    case 'HIDE_SELECT_ITEM_ERR_MSG_REQUEST': {
      const newState = {...state};
      newState.visible = false;
      newState.msg = "";
      return newState;
    }
  default:
    return state;
  }
};

export {
  notiReducer
}