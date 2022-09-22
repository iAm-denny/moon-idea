import { configureStore } from '@reduxjs/toolkit';
import shapeReducer from './features/shapes/shapeSlice';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    shape: shapeReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
