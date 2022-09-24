import { configureStore } from '@reduxjs/toolkit';
import shapeReducer from './features/shapes/shapeSlice';
import clientReducer from './features/user/clientSlice';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    shape: shapeReducer,
    client: clientReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
