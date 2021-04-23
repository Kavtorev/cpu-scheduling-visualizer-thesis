import vanillaRoundRobin from "./vanillaRoundRobin";
import vanillaNonpreemptive from "./vanillaNonpreemptive";
import vanillaPreemptive from "./vanillaPreemptive";
import { fifoComparator } from "./comparators";

let mappedAlgos = {
  _FIFO: {
    sol: vanillaNonpreemptive,
    comparator: fifoComparator,
    criteria: "",
  },
  _SJF: {
    sol: vanillaNonpreemptive,
    comparator: fifoComparator,
    criteria: "cpuTimeLeft",
  },
  _SRTF: {
    sol: vanillaPreemptive,
    comparator: fifoComparator,
    criteria: "cpuTimeLeft",
  },
  _PRIOR_PRE: {
    sol: vanillaPreemptive,
    comparator: fifoComparator,
    criteria: "priority",
  },
  _PRIOR_NONPRE: {
    sol: vanillaNonpreemptive,
    comparator: fifoComparator,
    criteria: "priority",
  },
  _RR: {
    sol: vanillaRoundRobin,
    comparator: fifoComparator,
    criteria: "",
  },
};

export default function executeAlgo(algo, processes) {
  let { sol, criteria, comparator } = mappedAlgos[algo.name];
  return sol({ ...algo, comparator, criteria, processes });
}
