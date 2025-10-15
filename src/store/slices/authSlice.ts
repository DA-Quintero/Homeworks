import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking",
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  },
  reducers: {
    register: (state, action) => {
      state.status = "authenticated";
      state.uid = action.payload.uid || null;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName || "Usuario";
      state.photoURL = action.payload.photoURL || "";
      state.errorMessage = null;
    },
    logout: (state) => {
      state.status = "not-authenticated";
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = null;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});

export const { register, logout, checkingCredentials } = authSlice.actions;