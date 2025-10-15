import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {

    addPost: (state, action) => {
      state.posts.push({
        id: Date.now().toString(),
        content: action.payload.content,
        author: action.payload.author,
        timestamp: new Date().toISOString(),
      });
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    
    clearPosts: (state) => {
      state.posts = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addPost, deletePost, setPosts, clearPosts, setLoading, setError } = postsSlice.actions;
