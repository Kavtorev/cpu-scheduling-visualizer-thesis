import { startFrame, finishFrame, f, s } from "./helpers/index";

export default function vanillaNonpreemptive({ processes, comparator }) {
  // debugger;
  let uncompleted = processes.length;
  let prcs = processes.map((e) => ({ ...e })).sort(comparator);
  let finishedSum = [];
  let clock = 0;
  let frames = [];
  let frame = null;

  while (uncompleted) {
    let current = prcs.shift();

    if (current.arrivalTime > clock) {
      clock = clock + (clock - current.arrivalTime);
    }

    current.responseTime = clock - current.arrivalTime;

    frame = s(clock, current);

    clock += current.cpuTime;
    current.cpuTimeLeft = 0;

    current.turnaroundTime = clock - current.arrivalTime;
    current.waitingTime = current.turnaroundTime - current.cpuTime;
    current.exitTime = clock;

    finishedSum.push(current);
    frames.push(f(frame, clock, "Finished", current));

    uncompleted -= 1;
  }

  return { finishedSum, frames };
}
