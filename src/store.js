import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import channelsReducer from "./features/channels/channelsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    channels: channelsReducer,
  },
});
