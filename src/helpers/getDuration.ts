import { differenceInMinutes, parse } from 'date-fns';

export const getDuration = (start: string, end: string) => {
  const startDate = parse(start, 'HH:mm', new Date());
  const endDate = parse(end, 'HH:mm', new Date());

  let diff = differenceInMinutes(endDate, startDate);
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  if (hours && minutes) return `${hours} год ${minutes} хв`;
  if (hours) return `${hours} год`;
  return `${minutes} хв`;
};
