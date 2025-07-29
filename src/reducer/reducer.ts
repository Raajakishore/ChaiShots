import { createSlice, configureStore } from '@reduxjs/toolkit'
import { ImageData } from '../types';

export const imageSlice = createSlice({
  name: 'image',
  initialState: {
    imageUrls: Array.from<ImageData>({ length: 0 }),
    page: 0,
    hasMore: false,
    isLoading: false
  },
  reducers: {
   setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetPage: (state) => {
      state.page = 0;
      state.imageUrls = [];
    } 
  },
  extraReducers: (builder) => {
    builder.addCase('feed/fetchNextPage/fulfilled', (state, action: any) => {
      const { items, hasMore, page } = action.payload;
      state.imageUrls = [...state.imageUrls, ...items];
      state.hasMore = hasMore;
      state.isLoading = false;
      state.page = page+1;
    });
    builder.addCase('feed/fetchNextPage/rejected', (state, action: any) => {
      console.error('Failed to fetch next page:', action.error.message);
      state.isLoading = false;
      state.hasMore = false; 
    });
  }
})

export const { setLoading, resetPage } = imageSlice.actions;
