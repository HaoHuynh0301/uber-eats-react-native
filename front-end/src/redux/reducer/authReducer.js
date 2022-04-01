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
  async (data) => {
    const url = data.paths.join("/");
    axios
    .post(`http://192.168.1.15:5000/api/v1/auth/login/`, data.props)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('ERR', err);
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
      state.login = false;
      state.loading = false;
      
    });
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
