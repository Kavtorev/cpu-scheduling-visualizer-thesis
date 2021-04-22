import {
  arrivalTimeSchema,
  cpuTimeSchema,
  prioritySchema,
} from "../../validation";

let arrivalTime = {
  name: "arrivalTime",
  id: "standard-required-arrivalTime",
  label: "Arrival Time",
  schema: arrivalTimeSchema,
};

let cpuTime = {
  name: "cpuTime",
  id: "standard-required-cpuTime",
  label: "CPU Time",
  schema: cpuTimeSchema,
};

let priority = {
  name: "priority",
  id: "standard-required-priority",
  label: "Priority",
  schema: prioritySchema,
};

let timeQuantum = {
  name: "timeQuantum",
  id: "standard-required-timeQuantum",
  label: "Time Quantum",
  schema: prioritySchema,
};

let defaultFields = [arrivalTime, cpuTime];

export let algorithms = {
  // _NONE: {},
  _FIFO: {
    label: "FIFO",
    fields: [...defaultFields],
  },
  _SJF: {
    label: "SJF",
    fields: [...defaultFields],
  },
  _SRTF: {
    label: "SRTF",
    fields: [...defaultFields],
  },
  _RR: {
    label: "RR",
    fields: [...defaultFields],
  },
  _PRIOR_NONPRE: {
    label: "Priority (nonpreemptive)",
    fields: [...defaultFields, priority],
  },
  _PRIOR_PRE: {
    label: "Priority (preemptive)",
    fields: [...defaultFields, priority],
  },
};
