import RoundRobin from "./RoundRobin";
import Nonpreemptive from "./Nonpreemptive";
import Preemptive from "./Preemptive";

const comparator = (a, b) => {
  if (a.arrivalTime > b.arrivalTime) return 1;
  else return -1;
};

let mappedAlgos = {
  _FIFO: {
    sol: Nonpreemptive,
    criteria: "",
  },
  _SJF: {
    sol: Nonpreemptive,
    criteria: "cpuTimeLeft",
  },
  _SRTF: {
    sol: Preemptive,
    criteria: "cpuTimeLeft",
  },
  _PRIOR_PRE: {
    sol: Preemptive,
    criteria: "priority",
  },
  _PRIOR_NONPRE: {
    sol: Nonpreemptive,
    criteria: "priority",
  },
  _RR: {
    sol: RoundRobin,
    criteria: "",
  },
};

export default function executeAlgo(algo, processes) {
  let { sol, criteria } = mappedAlgos[algo.name];
  return sol({ ...algo, comparator, criteria, processes });
}
