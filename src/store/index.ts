import { configureStore } from "@reduxjs/toolkit"
import { imageSlice } from "../reducer/reducer"
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AppDispatch = typeof store.dispatch;

const imagePersistConfig = {
  key: 'image',
  storage: AsyncStorage,
  whitelist: ['items', 'page', 'hasMore'],
};

const persistedImageReducer = persistReducer(imagePersistConfig, imageSlice.reducer);

export const store = configureStore({
  reducer: {
    images : persistedImageReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});


export const persistor = persistStore(store);

// Subscribe to the store
store.subscribe(() => console.log(store.getState()))