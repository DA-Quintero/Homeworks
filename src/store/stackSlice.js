import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: []
}

export const stackSlice = createSlice({
  name: 'stack',
  initialState,
  reducers: {
    push: (state, action) => {
      state.items.push(action.payload)
    },
    pop: (state) => {
      state.items.pop()
    },
    peek: (state) => {
      return state
    },
    clear: (state) => {
      state.items = []
    }
  }
})

export const { push, pop, peek, clear } = stackSlice.actions

export default stackSlice.reducer