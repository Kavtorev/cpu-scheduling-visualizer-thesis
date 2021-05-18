import { s, f } from "./helpers/index";

export default function Preemptive({ processes, comparator, criteria }) {
  let uncompleted = processes.length;
  let readyQueue = processes.map((e) => ({ ...e })).sort(comparator);
  let previous = null;
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
    let curIndex = findCurrent();

    if (curIndex === null) {
      continue;
    }

    let running = readyQueue[curIndex];

    if (previous !== null && readyQueue[previous].id !== running.id) {
      frames.push(f(frame, clock, `Preempted`, readyQueue[previous]));
      frame = s(clock, running);
    }

    if (frame === null) {
      frame = s(clock, running);
    }

    if (running.cpuTime === running.cpuTimeLeft) {
      running.responseTime = clock - running.arrivalTime;
      frame = s(clock, running);
    }

    running.cpuTimeLeft -= 1;
    clock += 1;

    if (!running.cpuTimeLeft) {
      running.turnaroundTime = clock - running.arrivalTime;
      running.waitingTime = running.turnaroundTime - running.cpuTime;
      running.exitTime = clock;

      frames.push(f(frame, clock, "Finished", running));

      frame = null;

      readyQueue = readyQueue.filter((e, i) => {
        return i !== curIndex;
      });

      uncompleted -= 1;
      previous = null;
      continue;
    }

    previous = curIndex;
  }

  return { frames };
}
