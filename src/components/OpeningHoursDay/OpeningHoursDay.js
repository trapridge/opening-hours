// @flow strict

import * as R from 'ramda';
import React from 'react';
import classNames from 'classnames';
import { DAYS } from '../OpeningHours/OpeningHours';
import type { Day } from '../OpeningHours/OpeningHours';
import styles from './OpeningHoursDay.module.scss';

type Props = {
  day: Day,
  dailyOpenings: {
    open: number,
    close: number
  }[]
};

const getHours = (unixTime: number) => {
  let hours = unixTime / 3600;
  hours = hours > 12 ? `${hours - 12}\u00A0PM` : `${hours}\u00A0AM`;
  if (hours === '12\u00A0AM') return '12\u00A0PM';
  if (hours === '12\u00A0PM') return '12\u00A0AM';
  return hours;
};

const isToday = (day: Day): boolean => {
  const today = new Date().getDay();
  return today === 0 ? DAYS[6] === day : DAYS[today - 1] === day;
};

export const OpeningHoursDay = ({ day, dailyOpenings }: Props) => (
  <>
    <span className={styles.day}>
      {day}
      {isToday(day) && <em>today</em>}
    </span>
    <span
      className={classNames({
        [styles.openings]: true,
        [styles.closed]: dailyOpenings.length === 0
      })}
    >
      {dailyOpenings.length === 0
        ? 'Closed'
        : R.compose(
            R.join(', '),
            R.map(
              ({ open, close }) =>
                `${getHours(open)}\u00A0-\u00A0${getHours(close)}`
            )
          )(dailyOpenings)}
    </span>
  </>
);

export default OpeningHoursDay;
