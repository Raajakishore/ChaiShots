import { configureStore } from "@reduxjs/toolkit"
import { imageSlice } from "../reducer"

export const store = configureStore({
  reducer: imageSlice.reducer
})

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()))
