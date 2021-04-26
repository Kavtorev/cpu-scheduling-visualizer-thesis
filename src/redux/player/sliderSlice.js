import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    sliderCurrentValue: 0,
    sliderPreviousValue: 0,
  },
  reducers: {
    setSliderCurrentValue: (state, action) => {
      state.sliderCurrentValue = action.payload;
    },
    setSliderPreviousValue: (state, action) => {
      state.sliderPreviousValue = action.payload;
    },
    moveSliderBack: (state, action) => {
      if (state.sliderCurrentValue > 1) {
        state.sliderCurrentValue = state.sliderCurrentValue - 1;
        state.sliderPreviousValue = state.sliderCurrentValue;
      }
    },
    moveSliderForward: (state, action) => {
      let framesLength = action.payload;
      if (state.sliderCurrentValue < framesLength) {
        state.sliderCurrentValue = state.sliderCurrentValue + 1;
        state.sliderPreviousValue = state.sliderCurrentValue;
      }
    },
  },
});

export const getSliderCurrentValue = (state) => {
  return state.slider.sliderCurrentValue;
};

export const getSliderPreviousValue = (state) => {
  return state.slider.sliderPreviousValue;
};

export const {
  setSliderCurrentValue,
  setSliderPreviousValue,
  moveSliderBack,
  moveSliderForward,
} = sliderSlice.actions;
export default sliderSlice.reducer;
