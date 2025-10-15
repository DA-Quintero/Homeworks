import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    
    pushNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now().toString(),
        message: action.payload.message,
        type: action.payload.type || "info",
        timestamp: new Date().toISOString(),
        read: false,
      });
    },
    
    popNotification: (state) => {
      state.notifications.shift();
    },
    
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    },
    
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { 
  pushNotification, 
  popNotification, 
  markAsRead, 
  markAllAsRead,
  setNotifications, 
  clearNotifications, 
  setLoading, 
  setError 
} = notificationsSlice.actions;
