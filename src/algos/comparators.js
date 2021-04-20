function fifoComparator(a, b) {
  if (a.arrivalTime > b.arrivalTime) return 1;
  else return -1;
}

function sjfComparator(a, b) {
  if (b.arrivalTime === 0) return 1;
  if (a.cpuBurst > b.cpuBurst) return 1;
  if (a.cpuBurst === b.cpuBurst) {
    if (a.arrivalTime > b.arrivalTime) return 1;
    else return -1;
  } else return -1;
}

function priorityComparator(a, b) {
  if (b.arrivalTime === 0) return 1;
  if (a.priority > b.priority) return 1;
  if (a.priority === b.priority) {
    if (a.arrivalTime > b.arrivalTime) return 1;
    else return -1;
  } else return -1;
}
