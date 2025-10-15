import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { postsSlice } from "./slices/postsSlice";
import { notificationsSlice } from "./slices/notificationsSlice";
import { messagesSlice } from "./slices/messagesSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    posts: postsSlice.reducer,
    notifications: notificationsSlice.reducer,
    messages: messagesSlice.reducer,
  },
});