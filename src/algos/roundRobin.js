import { startFrame, finishFrame } from "./helpers/index";

export default function roundRobin(processes, comparator, timeQuantum) {
  let uncompleted = processes.length;
  let mainQueue = processes.map((e) => ({ ...e })).sort(comparator);
  let readyQueue = [];
  let previous = null;
  let current = null;
  let currentCounter = 0;
  let finishedLog = [];
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
        frames.push(finishFrame(frame, `Preempted by ${current.value}`, clock));
      }
    }

    if (current.cpuBurst === current.cpuBurstLeft) {
      current.responseTime = clock - current.arrivalTime;
    }

    if (currentCounter === timeQuantum || !current.cpuBurstLeft) {
      if (current.cpuBurstLeft) {
        readyQueue.push(current);
        previous = { ...current };
      } else {
        // metrics
        current.turnaroundTime = clock - current.arrivalTime;
        current.waitingTime = current.turnaroundTime - current.cpuBurst;
        current.exitTime = clock;
        // return values
        finishedLog.push({ ...current });
        frames.push(finishFrame(frame, "Finished", clock));

        uncompleted -= 1;
      }

      current = null;
      currentCounter = 0;
      continue;
    }

    current.cpuBurstLeft -= 1;
    currentCounter += 1;
    clock += 1;
    previous = null;
  }

  console.log("frames", frames);
  return finishedLog;
}
