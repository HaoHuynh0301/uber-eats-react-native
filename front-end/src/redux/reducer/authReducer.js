import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAccessToken = createAsyncThunk(
  "auth/getAccessToken",
  async () => {
    const accessToken = await AsyncStorage.getItem("access_token");
    return accessToken;
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
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
