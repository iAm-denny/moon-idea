/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    changeAccessToken: (state, action) => {
      state.user.accessToken = action.payload.accessToken;
    },
  },
});
export const { addUser, changeAccessToken } = userSlice.actions;

export default userSlice.reducer;
