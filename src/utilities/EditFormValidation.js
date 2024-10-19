const checkMeets = (meetString) => {
  if (meetString.trim() === '') {
    return '';
  }
  const daysRule = /^(M|Tu|W|Th|F|Sa|Su)+$/;
  const timesRule = /^([0-9]|[01]\d|2[0-3]):[0-5]\d-([0-9]|[01]\d|2[0-3]):[0-5]\d$/;
  const daysTimes = meetString.split(' ');
  const [days, times] = daysTimes;
  if (daysTimes.length !== 2 || !timesRule.test(times)) {
    return 'Meeting time must contain days and start-end, e.g., MWF 12:00-13:20';
  }

  if (!daysRule.test(days)) {
    return 'Invalid days format. Allowed days are M/Tu/W/Th/F/Sa/Su.';
  }

  const repeatDayCheck = new Set();
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    if (repeatDayCheck.has(day)) {
      return `Invalid days format. Can't repeat a day (${day}).`;
    }
    repeatDayCheck.add(day);
  }

  const [start, end] = times.split('-');
  const convertToMins = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  const startMins = convertToMins(start);
  const endMins = convertToMins(end);
  if (startMins >= endMins) {
    return 'Start time must be before end time.';
  }

  return '';
};

export const formValidation = (courses) => {
  let errors = {};
  if (courses.title.length < 2) {
    errors.title = 'Course title must be at least 2 letters.';
  }
  if (checkMeets(courses.meets) !== "") {
    errors.meets = checkMeets(courses.meets);
  }
  return errors;
};
