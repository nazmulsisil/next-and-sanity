import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'Store'

// Define a type for the slice state
type UserState = {
  initialized: boolean
}

// Define the initial state using that type
const initialState: UserState = Object.freeze({
  initialized: false,
})

const appSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAppInitialized: (state) => ({
      ...state,
      initialized: true,
    }),
  },
})

export const { setAppInitialized } = appSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectApp = (state: RootState) => state.app

export default appSlice
