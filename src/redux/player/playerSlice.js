import { SatelliteTwoTone } from "@material-ui/icons";
import { createSlice, current } from "@reduxjs/toolkit";

let initialState = {
  index: 0,
  isStarted: false,
  isStopped: false,
  isFinished: false,
  speed: null,
  animFrames: [],
  currentFrames: [],
};

let playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    start: (state, action) => {
      state.isStarted = true;
      state.isStopped = false;
      state.speed = 1000;
    },
    stop: (state, action) => {
      state.isStarted = false;
      state.isStopped = true;
      state.speed = null;
    },
    finish: (state, action) => {
      state.isStarted = false;
      state.isStopped = false;
      state.isFinished = true;
      state.speed = null;
    },
    setFrames: (state, action) => {
      state.animFrames = action.payload;
    },
    animate: (state, action) => {
      let index = action.payload;
      state.currentFrames = state.currentFrames.concat(state.animFrames[index]);
      state.index += 1;
    },
    stepBack: (state, action) => {},
    stepForward: (state, action) => {},
    reset: (state, action) => {
      state.isStarted = false;
      state.isStopped = false;
      state.isFinished = false;
      state.speed = null;
      state.currentFrames = [];
      state.index = 0;
    },
    increaseSpeed: (state, action) => {
      if (state.speed > 200) state.speed = state.speed - 300;
    },
    descreaseSpeed: (state, action) => {
      if (state.speed < 1000) state.speed = state.speed + 300;
    },
  },
});

export let {
  start,
  stop,
  finish,
  stepBack,
  stepForward,
  reset,
  increaseSpeed,
  descreaseSpeed,
  setFrames,
  animate,
} = playerSlice.actions;

export const getIsPlayable = (state) =>
  !state.player.isStarted || state.player.isFinished;

export const getIsStoppableOrAccDec = (state) =>
  state.player.isStarted && !state.player.isFinished;

export const getIsCapableBackForward = (state) => state.player.isFinished;

export const getIsStartedStoppedFinished = (state) => {
  let { isStarted, isFinished, isStopped } = state.player;
  return { isStarted, isFinished, isStopped };
};

export const getNumberOfFrames = (state) => state.player.animFrames.length;

export const getSpeed = (state) =>
  state.player.isStarted ? state.player.speed : null;

export const getFrames = (state) => state.player.animFrames;

export const getCurrentFrames = (state) => state.player.currentFrames;
export const getIndex = (state) => state.player.index;
export default playerSlice.reducer;
