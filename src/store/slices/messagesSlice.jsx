import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queue: [],
  loading: false,
  error: null,
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    
    enqueueMessage: (state, action) => {
      state.queue.push({
        id: Date.now().toString(),
        to: action.payload.to,
        content: action.payload.content,
        from: action.payload.from,
        timestamp: new Date().toISOString(),
        status: "pending",
      });
    },
    
    dequeueMessage: (state) => {
      if (state.queue.length > 0) {
        state.queue[0].status = "sent";
        state.queue.shift();
      }
    },
    
    removeMessage: (state, action) => {
      state.queue = state.queue.filter(msg => msg.id !== action.payload);
    },
    
    setMessages: (state, action) => {
      state.queue = action.payload;
    },
    
    clearMessages: (state) => {
      state.queue = [];
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
  enqueueMessage, 
  dequeueMessage, 
  removeMessage, 
  setMessages, 
  clearMessages, 
  setLoading, 
  setError 
} = messagesSlice.actions;
