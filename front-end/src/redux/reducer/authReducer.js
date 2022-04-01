import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAccessToken = createAsyncThunk(
  "auth/getAccessToken",
  async () => {
    const accessToken = await AsyncStorage.getItem("access_token");
    return accessToken;
  }
);

export const loginRequest = createAsyncThunk(
  "auth/loginRequest",
  async (paths, props) => {
    const url = paths.join("/");
    console.log('PATH', `${process.env.REACT_APP_BASE_URL}/${url}`);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/${url}`, {
        ...props,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(res);
      });
  }
);

const initialState = {
  loading: true,
  login: false,
  currUser: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.login = false;
      state.currUser = {};
    },
    login(state, action) {
      state.login = true;
      state.currUser = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAccessToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAccessToken.fulfilled, (state) => {
      state.loading = false;
      state.login = true;
    });
    builder.addCase(getAccessToken.rejected, (state) => {
      state.loading = false;
      state.login = false;
    });
    builder.addCase(loginRequest.pending, (state, action) => {
      console.log("Sending");
    });
    builder.addCase(loginRequest.fulfilled, (state) => {
      console.log("OK");
    });
    builder.addCase(loginRequest.rejected, (state) => {
      console.log("ERR");
    });
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
