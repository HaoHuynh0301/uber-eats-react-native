import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAccessToken = createAsyncThunk(
  'auth/getAccessToken',
  async () => {
    const accessToken = await AsyncStorage.getItem('access_token');
    return accessToken;
  }
);

export const loginRequest = createAsyncThunk(
  'auth/loginRequest',
  async () => {
    await AsyncStorage.setItem('access_token', 'DSK#321njNdwgewbhad');
    return;
  }
)

const initialState = {
  loading: true,
  login: false,
  currUser: {}
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.login = false;
      state.currUser = {}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAccessToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAccessToken.fulfilled, (state, action) => {
      state.loading = false;
      state.login = true;
    });
    builder.addCase(getAccessToken.rejected, (state, action) => {
      state.loading = false;
      state.login = false
    });
    builder.addCase(loginRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginRequest.fulfilled, (state) => {
      console.log("LOADINGDONE")
      state.login = true;
      state.loading = false;
    });
    builder.addCase(loginRequest.rejected, (state) => {
      console.log('FALLURE')
      state.login = false;
    });
  }
});
export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
