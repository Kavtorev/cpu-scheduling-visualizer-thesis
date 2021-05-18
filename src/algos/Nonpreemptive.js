import { f, s } from "./helpers/index";

export default function Nonpreemptive({ processes, comparator, criteria }) {
  let uncompleted = processes.length;
  let readyQueue = processes.map((e) => ({ ...e })).sort(comparator);
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

    let running = readyQueue[curIndex];

    // responseTime
    running.responseTime = clock - running.arrivalTime;
    frame = s(clock, running);

    clock += running.cpuTime;
    running.cpuTimeLeft = 0;

    // turnaroundTime
    running.turnaroundTime = clock - running.arrivalTime;
    // waitingTime
    running.waitingTime = running.turnaroundTime - running.cpuTime;
    // exitTime
    running.exitTime = clock;

    frames.push(f(frame, clock, "Finished", running));

    readyQueue = readyQueue.filter((e, i) => {
      return i !== curIndex;
    });

    uncompleted -= 1;
  }

  return { frames };
}
