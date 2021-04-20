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

let frame = {
  start: 0,
  finish: 0,
  startState: "running",
  finishState: "",
};

export const startFrame = (clock) => {
  return { ...frame, start: clock };
};

export const finishFrame = (frame, state, clock) => {
  let res = { ...frame, finishState: state, finish: clock };
  frame.start = clock;
  return res;
};
