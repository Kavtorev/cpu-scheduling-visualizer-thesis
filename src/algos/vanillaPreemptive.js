import { startFrame, finishFrame } from "./helpers/index";

export default function vanillaPreemptive({ processes, comparator, criteria }) {
  let uncompleted = processes.length;
  let readyQueue = processes.map((e) => ({ ...e })).sort(comparator);
  let previous = null;
  let finishedSum = [];
  let clock = 0;
  let frames = [];
  let frame = startFrame(clock);

  function findCurrent() {
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
  }

  while (uncompleted) {
    let curIndex = findCurrent();

    if (curIndex === null) {
      continue;
    }

    if (previous != null) {
      if (readyQueue[previous].id !== readyQueue[curIndex].id) {
        frames.push(
          finishFrame(frame, `Preempted by ${readyQueue[curIndex].name}`, clock)
        );
      }
    }

    if (readyQueue[curIndex].cpuTime === readyQueue[curIndex].cpuTimeLeft) {
      readyQueue[curIndex].responseTime =
        clock - readyQueue[curIndex].arrivalTime;
    }

    readyQueue[curIndex].cpuTimeLeft -= 1;
    clock += 1;

    if (!readyQueue[curIndex].cpuTimeLeft) {
      readyQueue[curIndex].turnaroundTime =
        clock - readyQueue[curIndex].arrivalTime;
      readyQueue[curIndex].waitingTime =
        readyQueue[curIndex].turnaroundTime - readyQueue[curIndex].cpuTime;
      readyQueue[curIndex].exitTime = clock;

      finishedSum.push(readyQueue[curIndex]);
      frames.push(finishFrame(frame, "Finished", clock));

      readyQueue = readyQueue.filter((e, i) => {
        return i !== curIndex;
      });

      uncompleted -= 1;
      previous = null;
      continue;
    }

    previous = curIndex;
  }

  return { finishedSum, frames };
}
