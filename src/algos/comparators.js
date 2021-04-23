const fifoComparator = (a, b) => {
  if (a.arrivalTime > b.arrivalTime) return 1;
  else return -1;
};

export { fifoComparator };
