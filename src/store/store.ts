import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { firebaseSlice } from "./slices/firebaseSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    firebaseData: firebaseSlice.reducer,
  },
});
