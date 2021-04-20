import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isStarted: false,
  isStopped: false,
  isFinished: false,
};

let playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    start: (state, action) => {
      state.isStarted = true;
      state.isStopped = false;
    },
    stop: (state, action) => {
      state.isStarted = false;
      state.isStopped = true;
    },
    stepBack: (state, action) => {},
    stepForward: (state, action) => {},
    reset: (state, action) => {},
    increaseSpeed: (state, action) => {},
    descreaseSpeed: (state, action) => {},
  },
});

export let {
  start,
  stop,
  stepBack,
  stepForward,
  reset,
  increaseSpeed,
  descreaseSpeed,
} = playerSlice.actions;

export default playerSlice.reducer;
