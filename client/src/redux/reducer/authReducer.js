import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {notiActions} from './notiReducer';

export const getAccessToken = createAsyncThunk(
  "auth/getAccessToken",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const accessToken = await AsyncStorage.getItem("access_token");
      if (accessToken !== null) {
        const response = await fetch(
          "http://localhost:3000/api/v1/auth/private",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        let jsonData = await response.json();
        if(jsonData.code === 2002) {
          console.log('HEHE',jsonData);
          return jsonData;
        } else {
          return rejectWithValue(jsonData);
        }
      } else {
        return rejectWithValue({ msg: "access-token is invalid!" });
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const loginRequest = createAsyncThunk(
  "auth/loginRequest",
  async (data, { rejectWithValue, dispatch }) => {
    const { props } = data;
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(props),
        }
      );
      let jsonData = await response.json();
      if (jsonData.code === 2001) {
        await AsyncStorage.setItem("access_token", jsonData.data.ACCESS_TOKEN);
        return data;
      } else {
        dispatch(notiActions.displayLoginErrMsg());
        return rejectWithValue(data);
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const registerRequest = createAsyncThunk(
  "auth/registerRequest",
  async (data, { rejectWithValue, dispatch }) => {
    const { props } = data;
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(props),
        }
      );
      let jsonData = await response.json();
      if (jsonData.code === 201) {
        dispatch(notiActions.displayRegisterSucceedMsg());
        return data;
      } else {
        dispatch(notiActions.displayRegisterErrMsg());
        return rejectWithValue(data);
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const clearAccessToken = async () => {
  await AsyncStorage.setItem("access_token", '');
}

const initialState = {
  loading: true,
  login: false,
  loginRequest: false, 
  currUser: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      clearAccessToken();
      state.login = false;
      state.currUser = {};
    },
  },
  extraReducers: {
    [getAccessToken.pending]: (state) => {
      state.loading = true;
    },
    [getAccessToken.fulfilled]: (state, action) => {
      console.log('HEHE', action.payload);
      state.loading = false;
      state.login = true;
      state.currUser = {
        props:action.payload
      } ;
    },
    [getAccessToken.rejected]: (state, action) => {
      state.loading = false;
      state.login = false;
    },
    [loginRequest.pending]: (state) => {
      state.loginRequest = true;
    },
    [loginRequest.fulfilled]: (state, action) => {
      state.loginRequest = false;
      state.login = true;
      state.currUser = action.payload;
    },
    [loginRequest.rejected]: (state) => {
      state.login = false;
      state.loginRequest = false;
    },
  },
});

export const actions = authSlice.actions;
export default authSlice.reducer;
