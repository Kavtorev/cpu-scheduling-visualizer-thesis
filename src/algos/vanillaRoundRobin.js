import { startFrame, finishFrame } from "./helpers/index";

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
  let frame = startFrame(clock);

  function findCurrent() {
    if (mainQueue.length) {
      if (mainQueue[0].arrivalTime === clock) {
        readyQueue.push(mainQueue.shift());
      }
    }

    if (current !== null) {
      return current;
    }

    if (current === null) {
      if (readyQueue.length) {
        current = readyQueue.shift();
        return current;
      }
      clock += 1;
      return null;
    }
  }
  while (uncompleted) {
    current = findCurrent();

    if (current === null) {
      continue;
    }

    if (previous !== null) {
      if (previous.id !== current.id) {
        frames.push(finishFrame(frame, `Preempted by ${current.name}`, clock));
      }
    }

    if (current.cpuTime === current.cpuTimeLeft) {
      current.responseTime = clock - current.arrivalTime;
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
        frames.push(finishFrame(frame, "Finished", clock));

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
