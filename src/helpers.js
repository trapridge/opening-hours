// @flow

import type { Day } from './components/OpeningHours/OpeningHours';

export const DAYS: Day[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

export const getAmPmHours = (unixTime: number): string => {
  let hours = unixTime / 3600;
  hours = hours > 12 ? `${hours - 12}\u00A0PM` : `${hours}\u00A0AM`;
  if (hours === '12\u00A0AM') return '12\u00A0PM';
  if (hours === '12\u00A0PM') return '12\u00A0AM';
  return hours;
};

export const isToday = (day: Day): boolean => {
  const today = new Date().getDay();
  return today === 0 ? DAYS[6] === day : DAYS[today - 1] === day;
};
