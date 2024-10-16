const parse = (time) => {
  if (time) {
  const [days, times] = time.split(" ");
  const [start, end] = times.split("-");
  return {days: days.split(""), start: start, end: end};
  }
  return null
};

const compareTimes = (start, end) => {
  const [startHr, startMin] = start.split(":").map(Number);
  const [endHr, endMin] = end.split(":").map(Number);
  if (startHr !== endHr) {
    return startHr < endHr;
  } else {
    return startMin < endMin;
  }
};

const checkOverlap = (start1, end1, start2, end2) => {
  return !compareTimes(end1, start2) && !compareTimes(end2, start1);
};

const conflict = (class1, class2) => {
  if (class1.term === class2.term && class1.meets && class2.meets) {
    const time1 = parse(class1.meets);
    const time2 = parse(class2.meets);
    const day = time1.days.some(day => time2.days.includes(day));
    const time = checkOverlap(time1.start, time1.end, time2.start, time2.end);
    return time && day;
  }
  return false;
};

export const checkConflicts = (course, selected, all) => {
  return selected.some(id => {const selected = all[id];
    return conflict(course, selected);
  });
};
