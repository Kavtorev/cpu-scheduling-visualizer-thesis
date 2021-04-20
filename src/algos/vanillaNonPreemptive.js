import { startFrame, finishFrame } from "./helpers/index";

export default function vanillaNonPreemptive(processes, comparator) {
  let uncompleted = processes.length;
  let prcs = processes.map((e) => ({ ...e })).sort(comparator);
  let finishedLog = [];
  let clock = 0;
  let frames = [];
  let frame = startFrame(clock);

  while (uncompleted) {
    let current = prcs.shift();

    current.responseTime = clock - current.arrivalTime;

    clock += current.cpuBurst;
    current.cpuBurstLeft = 0;

    current.turnaroundTime = clock - current.arrivalTime;
    current.waitingTime = current.turnaroundTime - current.cpuBurst;
    current.exitTime = clock;
    finishedLog.push(current);
    frames.push(finishFrame(frame, "Finished", clock));
    uncompleted -= 1;
  }

  console.log("frames:", frames);
  return finishedLog;
}
