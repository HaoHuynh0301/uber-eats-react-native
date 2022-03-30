import { ERR_MSG } from "../constants/msg.constant";
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  hideTime: 1000,
  visible: false,
  msg: "hidden",
};

const notiSlice = createSlice({
  name: "noti",
  initialState,
  reducers: {
    displayMsgRequest(state, action) {
      const msg = ERR_MSG.find((msg) => msg.type === action.type);
      state.visible = true;
      state.msg = msg.content;
    },
    hideMsgRequest(state) {
      state.visible = false;
      state.msg = "";
    },
  },
});

export const { displayMsgRequest, hideMsgRequest } = notiSlice.actions;
export default notiSlice.reducer;
