/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import api from '../../../config/api';

const initialState = {
  user: {},
  loading: false,
};

export const fetchUserInfo = createAsyncThunk('/user/fetchInfo', () => api.get('/user/get_user/', {}, { rftoken_id: localStorage.getItem('rftoken_id') }).then((result) => result).catch((err) => {
  console.log('err => ', err);
}));

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      console.log('FulFilled ', action.payload);
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUserInfo.rejected, (state) => {
      state.loading = false;
    });
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    changeAccessToken: (state, action) => {
      state.user.accessToken = action.payload.accessToken;
    },
    getInfo: () => {
      createAsyncThunk();
    },
    logout: (state) => {
      localStorage.removeItem('rftoken_id');
      window.location.href = '/';
      state.user = {};
    },
  },
});
export const { addUser, changeAccessToken, logout } = userSlice.actions;

export default userSlice.reducer;
