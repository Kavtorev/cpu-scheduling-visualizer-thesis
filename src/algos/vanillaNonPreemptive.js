import { f, s } from "./helpers/index";

export default function vanillaNonpreemptive({
  processes,
  comparator,
  criteria,
}) {
  let uncompleted = processes.length;
  let readyQueue = processes.map((e) => ({ ...e })).sort(comparator);
  let finishedLog = [];
  let clock = 0;
  let frames = [];
  let frame = null;

  let findCurrent = () => {
    let tPrIndex = readyQueue.findIndex((e) => {
      return e.arrivalTime <= clock;
    });

    if (tPrIndex < 0) {
      clock += 1;
      return null;
    }

    for (let pId = 0; pId < readyQueue.length; pId++) {
      if (readyQueue[pId].arrivalTime <= clock) {
        if (readyQueue[pId][criteria] < readyQueue[tPrIndex][criteria]) {
          tPrIndex = pId;
        }
      } else {
        break;
      }
    }

    return tPrIndex;
  };

  while (uncompleted) {
    const curIndex = findCurrent();

    if (curIndex === null) {
      continue;
    }

    readyQueue[curIndex].responseTime = clock;
    frame = s(clock, readyQueue[curIndex]);

    clock += readyQueue[curIndex].cpuTime;
    readyQueue[curIndex].cpuTimeLeft = 0;

    // turnarounTime
    readyQueue[curIndex].turnaroundTime =
      clock - readyQueue[curIndex].arrivalTime;
    // waitingTime
    readyQueue[curIndex].waitingTime =
      readyQueue[curIndex].turnaroundTime - readyQueue[curIndex].cpuTime;
    // exitTime
    readyQueue[curIndex].exitTime = clock;

    finishedLog.push(readyQueue[curIndex]);
    frames.push(f(frame, clock, "Finished", readyQueue[curIndex]));

    readyQueue = readyQueue.filter((e, i) => {
      return i !== curIndex;
    });

    uncompleted -= 1;
  }

  return { finishedLog, frames };
}
