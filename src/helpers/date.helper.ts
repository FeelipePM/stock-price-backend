export const validateRangeDate = (days) => {
  switch (true) {
    case days <= 5:
      return '5d';
    case days <= 30:
      return '1mo';
    case days <= 90:
      return '3mo';
    case days <= 180:
      return '6mo';
    default:
      return '1y';
  }
};

export const getAllDaysBetween = (initialDate, finalDate) => {
  const daysArray = [];

  initialDate.setUTCHours(0, 0, 0, 0);
  finalDate.setUTCHours(0, 0, 0, 0);

  for (
    let date = new Date(initialDate);
    date <= finalDate;
    date.setUTCDate(date.getUTCDate() + 1)
  ) {
    daysArray.push(new Date(date));
  }

  return daysArray;
};
