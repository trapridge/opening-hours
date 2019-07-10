// @flow strict

import * as R from 'ramda';
import React from 'react';
import type { Day } from '../OpeningHours/OpeningHours';

type Props = {
  day: Day,
  dailyOpenings: {
    open: number,
    close: number
  }[]
};

const getHours = (unixTime: number) => {
  let hours = unixTime / 3600;
  return hours > 12 ? `${hours - 12} PM` : `${hours} AM`;
};

export const OpeningHoursDay = ({ day, dailyOpenings }: Props) => (
  <>
    <span>{day}</span>
    <span>
      {dailyOpenings.length === 0
        ? 'Closed'
        : R.compose(
            R.join(', '),
            R.map(({ open, close }) => `${getHours(open)} - ${getHours(close)}`)
          )(dailyOpenings)}
    </span>
  </>
);

export default OpeningHoursDay;
