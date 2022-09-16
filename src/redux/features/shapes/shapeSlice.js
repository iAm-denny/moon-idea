/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shapesItem: [],
};

export const shapeSlice = createSlice({
  name: 'shapes',
  initialState,
  reducers: {
    addShape: (state, action) => {
      state.shapesItem = [...state.shapesItem, action.payload];
    },
  },
});

export const { addShape } = shapeSlice.actions;

export default shapeSlice.reducer;
