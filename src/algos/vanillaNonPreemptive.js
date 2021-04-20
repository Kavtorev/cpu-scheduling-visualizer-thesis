import { startFrame, finishFrame } from "./helpers/index";

export default function vanillaNonpreemptive({ processes, comparator }) {
  // debugger;
  let uncompleted = processes.length;
  let prcs = processes.map((e) => ({ ...e })).sort(comparator);
  let finishedSum = [];
  let clock = 0;
  let frames = [];
  let frame = startFrame(clock);

  while (uncompleted) {
    let current = prcs.shift();

    current.responseTime = clock - current.arrivalTime;

    clock += current.cpuTime;
    current.cpuTimeLeft = 0;

    current.turnaroundTime = clock - current.arrivalTime;
    current.waitingTime = current.turnaroundTime - current.cpuTime;
    current.exitTime = clock;
    finishedSum.push(current);
    frames.push(finishFrame(frame, "Finished", clock));
    uncompleted -= 1;
  }

  return { finishedSum, frames };
}
