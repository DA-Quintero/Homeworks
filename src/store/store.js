import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import stackReducer from './stackSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    stack: stackReducer
  }
})

export default store