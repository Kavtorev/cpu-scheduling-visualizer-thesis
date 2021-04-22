import { createSlice, createAction, isAnyOf } from "@reduxjs/toolkit";

export const startAction = createAction("start");
export const animateAction = createAction("animate");

let initialState = {
  index: 0,
  isStarted: false,
  isStopped: false,
  isFinished: false,
  speed: null,
  animFrames: [],
  currentFrames: [],
  individualMetrics: {},
  aResponseTime: 0,
  aWaitingTime: 0,
  aTurnaroundTime: 0,
};

let playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
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
    stepBack: (state, action) => {},
    stepForward: (state, action) => {},
    reset: (state, action) => {
      state.isStarted = false;
      state.isStopped = false;
      state.isFinished = false;
      state.speed = null;
      state.currentFrames = [];
      state.index = 0;
      state.aResponseTime = 0;
      state.aWaitingTime = 0;
      state.aTurnaroundTime = 0;
      state.individualMetrics = {};
    },
    increaseSpeed: (state, action) => {
      if (state.speed > 200) state.speed = state.speed - 300;
    },
    descreaseSpeed: (state, action) => {
      if (state.speed < 1000) state.speed = state.speed + 300;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startAction, (state, action) => {
      state.speed = 1000;
      state.isStarted = true;
      state.isStopped = false;
    });
    builder.addMatcher(isAnyOf(animateAction, startAction), (state, action) => {
      // default value on the initial frame.
      let index = action.payload || 0;
      let frame = state.animFrames[index];
      let processStart = frame.start.process;
      let processIdStart = processStart.id;
      let processEnd = frame.finish.process;

      state.currentFrames = state.currentFrames.concat(frame);
      state.index += 1;

      if (!state.isFinished) {
        if (state.individualMetrics[processIdStart] === undefined)
          state.individualMetrics[processIdStart] = {};

        let metricMap = state.individualMetrics[processIdStart];

        if (metricMap.responseTime === undefined) {
          metricMap.responseTime = processStart.responseTime;
        }

        if (frame.finish.state === "Finished") {
          metricMap.turnaroundTime = processEnd.turnaroundTime;
        }

        metricMap.waitingTime = processStart.waitingTime;
      }
      let sumT, sumW, sumR;
      sumT = sumW = sumR = 0;
      for (let key in state.individualMetrics) {
        sumR += state.individualMetrics[key].responseTime;
        sumT += state.individualMetrics[key].turnaroundTime || 0;
        sumW += state.individualMetrics[key].waitingTime;
      }

      let len = Object.keys(state.individualMetrics).length;
      // console.log(
      //   "responseA",
      //   sumR / len,
      //   "waitingA",
      //   sumW / len,
      //   "turnaroundA",
      //   sumT / len
      // );

      state.aResponseTime = sumR / len;
      state.aWaitingTime = sumW / len;
      state.aTurnaroundTime = sumT / len;
    });
  },
});

export let {
  stop,
  finish,
  stepBack,
  stepForward,
  reset,
  increaseSpeed,
  descreaseSpeed,
  setFrames,
} = playerSlice.actions;

export const getMetrics = (state) => [
  state.player.aTurnaroundTime,
  state.player.aWaitingTime,
  state.player.aResponseTime,
];

export const getIsInitial = (state) => state.player.isInitial;

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
