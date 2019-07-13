// @flow strict

import * as R from 'ramda';
import React, { type Element, Fragment } from 'react';
import classNames from 'classnames';
import type { Day } from '../../helpers';
import { getAmPmHours, isToday } from '../../helpers';
import styles from './OpeningHoursDay.module.scss';

type Props = {
  day: Day,
  dailyOpenings: {|
    open: number,
    close: number
  |}[]
};

export const OpeningHoursDay = ({
  day,
  dailyOpenings
}: Props): Element<typeof Fragment> => (
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
                `${getAmPmHours(open)}\u00A0-\u00A0${getAmPmHours(close)}`
            )
          )(dailyOpenings)}
    </span>
  </>
);

export default OpeningHoursDay;
