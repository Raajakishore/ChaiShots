import { createSlice, configureStore } from '@reduxjs/toolkit'

export const imageSlice = createSlice({
  name: 'image',
  initialState: {
    imageUrls: []
  },
  reducers: {
    setImageUrls: (state,action) => {
      state.imageUrls = [ ...state.imageUrls, action.payload ];
    }
  }
})

export const { setImageUrls } = imageSlice.actions
