import { configureStore } from '@reduxjs/toolkit';
import shapeReducer from './features/shapes/shapeSlice';

const store = configureStore({
  reducer: {
    shape: shapeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
