import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAccessToken = createAsyncThunk(
  "auth/getAccessToken",
  async (data, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem("access_token");
      if (accessToken !== null) {
        const response = await fetch(
          "http://192.168.1.15:5000/api/v1/auth/private",
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
  async (data, { rejectWithValue }) => {
    const url = data.paths.join("/");
    const { props } = data;
    try {
      const response = await fetch(
        "http://192.168.1.15:5000/api/v1/auth/login",
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
        return rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e);
      return rejectWithValue(e);
    }
  }
);

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
      state.login = false;
      state.currUser = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAccessToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAccessToken.fulfilled, (state, action) => {
      console.log('PAYLOAD', action.payload);
      state.loading = false;
      state.login = true;
    });
    builder.addCase(getAccessToken.rejected, (state) => {
      state.loading = false;
      state.login = false;
    });
    builder.addCase(loginRequest.pending, (state) => {
      state.loginRequest = true;
    });
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      state.loginRequest = false;
      state.login = true;
      console.log(action.payload);
      state.currUser = action.payload;
    });
    builder.addCase(loginRequest.rejected, (state) => {
      state.login = false;
      state.loginRequest = false;
    });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
