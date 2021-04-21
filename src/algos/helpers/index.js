export const getAverageTimes = (finishedPr) => {
  let sumTurnaroundTimes = 0;
  let sumWaitingTimes = 0;
  let sumResponseTime = 0;
  let length = finishedPr.length;

  for (let p of finishedPr) {
    sumTurnaroundTimes += p.turnaroundTime;
    sumWaitingTimes += p.waitingTime;
    sumResponseTime += p.responseTime;
  }

  return {
    avgTurnaroundTime: sumTurnaroundTimes / length,
    avgWaitingTime: sumWaitingTimes / length,
    avgResponseTime: sumResponseTime / length,
  };
};

// let frame = {
//   start: 0,
//   finish: 0,
//   startState: "Running",
//   finishState: "",
//   process: null,
// };

let frame = {
  start: {
    time: 0,
    state: "running",
    process: null,
  },
  finish: {
    time: 0,
    state: "",
    process: null,
  },
};

export const startFrame = (clock, process) => {
  return { ...frame, start: { ...frame.start, time: clock, process } };
};

export let s = (clock, process) => {
  return {
    start: {
      time: clock,
      state: "Running",
      process: {
        ...process,
        // clock - time it has already worked
        waitingTime:
          clock - (process.cpuTime - process.cpuTimeLeft) - process.arrivalTime,
      },
    },
    finish: {
      time: 0,
      state: "",
      process: null,
    },
  };
};

export let f = (frame, clock, state, process) => {
  return {
    start: { ...frame.start },
    finish: {
      time: clock,
      state,
      process: {
        ...process,
        waitingTime: frame.start.process.waitingTime,
      },
    },
  };
};

export const finishFrame = (frame, state, clock, current, previous = null) => {
  // let res = {
  //   ...frame,
  //   finishState: state,
  //   finish: clock,
  //   process: { ...process },
  // };
  let res = {
    ...frame,
    finish: {
      time: clock,
      state,
      process: { ...previous },
    },
  };
  // starts again
  frame.start.time = clock;

  return res;
};
