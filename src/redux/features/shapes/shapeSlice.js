/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shapesItem: [],
  selectShapeValue: {},
};

export const shapeSlice = createSlice({
  name: 'shapes',
  initialState,
  reducers: {
    addShape: (state, action) => {
      state.shapesItem = [...state.shapesItem, action.payload];
    },
    selectShape: (state, action) => {
      state.selectShapeValue = action.payload;
    },
    changeFillShape: (state, action) => {
      if (action.payload) {
        const { shapesItem } = state;
        const updatedVal = { ...state.selectShapeValue, fill: action.payload };
        state.selectShapeValue = updatedVal;
        shapesItem[shapesItem.findIndex((el) => el.id === updatedVal.id)] = updatedVal;
      }
    },
    changeStrokeShape: (state, action) => {
      if (action.payload) {
        const { shapesItem } = state;
        const updatedVal = { ...state.selectShapeValue, stroke: action.payload };
        state.selectShapeValue = updatedVal;
        shapesItem[shapesItem.findIndex((el) => el.id === updatedVal.id)] = updatedVal;
      }
    },
  },
});

export const {
  addShape, selectShape, changeFillShape, changeStrokeShape,
} = shapeSlice.actions;

export default shapeSlice.reducer;
