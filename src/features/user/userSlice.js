import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    userInfo: null,
    subscription: "free",
  },
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload; // Store user data (token or user info)
      state.isAuthenticated = true;
    },

    setUserInfo: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.subscription = "free";
      localStorage.removeItem("token");
    },
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },
  },
});

export const { login, setUserInfo, logoutUser, setSubscription } =
  userSlice.actions;
export default userSlice.reducer;
