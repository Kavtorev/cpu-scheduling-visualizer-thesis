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
