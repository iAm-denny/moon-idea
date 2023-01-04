/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import api from '../../../config/api';
import { add } from '../../../utils/IndexDB/features';

const initialState = {
  shapesItem: [],
  selectShapeValue: {},
  makeChangesLoader: false,
  fetchingShapesLoader: false,
  isOnline: true,
  project_detail: {},
};

export const makeChangesShape = createAsyncThunk(
  'makeChangesShape',
  (data, { getState }) => {
    const state = getState();
    const { accessToken } = state.user.user;
    const { selectShapeValue, isOnline } = state.shape;
    let sendData = {};
    if (data.isNew) {
      sendData = data.data;
    } else {
      sendData = selectShapeValue;
    }
    if (isOnline) {
      return api
        .post('/client/project-shape', JSON.stringify(sendData), {
          accessToken,
          rftoken_id: localStorage.getItem('rftoken_id'),
        })
        .then((result) => result)
        .catch((err) => {
          console.log('err => ', err);
        });
    }
    return add({ isNew: data.isNew, ...sendData });
  }
);

export const fetchProjectDetail = createAsyncThunk(
  'fetchProjectDetail',
  (project_id) =>
    api
      .get(
        '/client/project-shape',
        { project_id },
        { rftoken_id: localStorage.getItem('rftoken_id') }
      )
      .then((result) => result)
      .catch((err) => {
        console.error('err => ', err);
      })
);

export const shapeSlice = createSlice({
  name: 'shapes',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(makeChangesShape.pending, (state) => {
      state.makeChangesLoader = true;
    });
    builder.addCase(makeChangesShape.fulfilled, (state) => {
      state.makeChangesLoader = false;
    });
    builder.addCase(makeChangesShape.rejected, (state) => {
      state.makeChangesLoader = false;
    });
    // ------- Fetch the project shapes
    builder.addCase(fetchProjectDetail.pending, (state) => {
      state.fetchingShapesLoader = true;
    });
    builder.addCase(fetchProjectDetail.fulfilled, (state, action) => {
      state.fetchingShapesLoader = false;
      if (action.payload.success) {
        state.shapesItem = action.payload.data;
        state.project_detail = action.payload.project;
      }
    });
    builder.addCase(fetchProjectDetail.rejected, (state) => {
      state.fetchingShapesLoader = false;
    });
  },
  reducers: {
    addShape: (state, action) => {
      state.shapesItem = [...state.shapesItem, action.payload];
    },
    selectShape: (state, action) => {
      if (action.payload?.data) {
        state.selectShapeValue = action.payload?.data;
      }
    },
    updateSelectShapeValue: (state, action) => {
      const data = action.payload;
      const { shapesItem } = state;
      const { selectShapeValue } = current(state);
      const newData = {
        ...selectShapeValue,
        data: {
          ...selectShapeValue.data,
          ...data,
        },
      };
      state.selectShapeValue = newData;
      shapesItem[shapesItem.findIndex((el) => el.id === newData.id)] = newData;
    },
    updateNetWorkStatus: (state, action) => {
      state.isOnline = action.payload;
    },
    asynFunction: () => {
      createAsyncThunk();
    },
  },
});

export const {
  addShape,
  selectShape,
  changeFillShape,
  changeStrokeShape,
  updateSelectShapeValue,
  updateNetWorkStatus,
} = shapeSlice.actions;

export default shapeSlice.reducer;
