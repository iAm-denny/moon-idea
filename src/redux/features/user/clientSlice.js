/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import api from '../../../config/api';

const initialState = {
  projects: {
    data: [],
  },
  loading: false,
};

export const fetchProjectList = createAsyncThunk('fetchProjectList', (accessToken) => api.get('/client/fetch-project', {}, { accessToken, rftoken_id: localStorage.getItem('rftoken_id') }).then((result) => result).catch((err) => {
  console.log('err => ', err);
}));

export const clientSlice = createSlice({
  name: 'projects',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProjectList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProjectList.fulfilled, (state, action) => {
      if (action.payload === 'Session timeout' && !action.payload.success) {
        localStorage.removeItem('rftoken_id');
        state.projects = {};
      } else {
        state.projects = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(fetchProjectList.rejected, (state) => {
      state.loading = false;
    });
  },
  reducers: {
    addNewProject: (state, action) => {
      state.projects = { data: [action.payload, ...state.projects.data] };
    },
    asynFunction: () => {
      createAsyncThunk();
    },
  },
});
export const {
  addNewProject,
} = clientSlice.actions;

export default clientSlice.reducer;
