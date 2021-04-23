import { s, f } from "./helpers/index";

export default function vanillaRoundRobin({
  processes,
  comparator,
  timeQuantum,
}) {
  let uncompleted = processes.length;
  let mainQueue = processes.map((e) => ({ ...e })).sort(comparator);
  let readyQueue = [];
  let previous = null;
  let current = null;
  let currentCounter = 0;
  let finishedSum = [];
  let clock = 0;
  let frames = [];
  let frame = null;

  function findCurrent() {
    if (mainQueue.length) {
      if (
        mainQueue[0].arrivalTime === clock ||
        mainQueue[0].arrivalTime < clock
      ) {
        readyQueue.push(mainQueue.shift());
      }
    }

    // hasn't exceeded the time quantum yet
    if (current !== null) {
      return current;
    }

    // exceeded the time quantum
    if (current === null) {
      // any ready processes
      if (readyQueue.length) {
        current = readyQueue.shift();
        return current;
      }
      // moving in time
      clock += 1;
      return null;
    }
  }
  while (uncompleted) {
    debugger;
    current = findCurrent();

    if (current === null) {
      continue;
    }

    if (previous !== null) {
      if (previous.id !== current.id) {
        // frames.push(f(frame, clock, `Preempted by ${current.name}`, previous));
        frames.push(f(frame, clock, `Preempted`, previous));
        frame = s(clock, current);
      }
    }

    if (current.cpuTime === current.cpuTimeLeft) {
      current.responseTime = clock - current.arrivalTime;
      frame = s(clock, current);
    }

    if (frame === null) {
      frame = s(clock, current);
    }

    if (currentCounter === timeQuantum || !current.cpuTimeLeft) {
      if (current.cpuTimeLeft) {
        readyQueue.push(current);
        previous = { ...current };
      } else {
        // metrics
        current.turnaroundTime = clock - current.arrivalTime;
        current.waitingTime = current.turnaroundTime - current.cpuTime;
        current.exitTime = clock;
        // return values
        finishedSum.push({ ...current });
        frames.push(f(frame, clock, "Finished", current));
        frame = null;
        uncompleted -= 1;
      }

      current = null;
      currentCounter = 0;
      continue;
    }

    current.cpuTimeLeft -= 1;
    currentCounter += 1;
    clock += 1;
    previous = null;
  }

  return { finishedSum, frames };
}
