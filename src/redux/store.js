import { configureStore } from '@reduxjs/toolkit';
import shapeReducer from './features/shapes/shapeSlice';

const store = configureStore({
  reducer: {
    shape: shapeReducer,
  },
});

export default store;
