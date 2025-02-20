import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    userInfo: null,
    subscription: "free",
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.subscription = "free";
    },
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },
  },
});

export const { setUserInfo, logoutUser, setSubscription } = userSlice.actions;
export default userSlice.reducer;
