// @flow strict

import * as R from 'ramda';
import React, { Component, type Element } from 'react';
import OpeningHoursDay from '../OpeningHoursDay/OpeningHoursDay';

export type Day =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

type OpeningHoursRecord = {|
  type: 'open' | 'close',
  value: number
|};

type OpeningHoursRecords = { [Day]: OpeningHoursRecord[] };

type Props = {
  openingHours: OpeningHoursRecords
};

type State = {
  openingsAndClosings: [
    { ...OpeningHoursRecord, day: Day },
    OpeningHoursRecord
  ][]
};

const DAYS: Day[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

export class OpeningHours extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.itemsByDay = this.itemsByDay.bind(this);
    this.state = {
      openingsAndClosings: this.parseOpeningsAndClosings()
    };
  }

  itemsByDay: Day => *;
  itemsByDay(day: Day): { ...OpeningHoursRecord, day?: Day }[] {
    const { openingHours } = this.props;

    return R.map(
      entry => (entry.type === 'open' ? { ...entry, day } : entry),
      openingHours[day]
    );
  }

  parseOpeningsAndClosings(): [
    { ...OpeningHoursRecord, day: Day },
    OpeningHoursRecord
  ][] {
    const items = R.compose(
      R.flatten,
      R.map(this.itemsByDay)
    )(DAYS);
    return R.zip(
      R.filter(R.propEq('type', 'open'), items),
      R.filter(R.propEq('type', 'close'), items)
    );
  }

  render(): Element<'div'> {
    const { openingsAndClosings } = this.state;

    return (
      <div>
        <h3>Opening hours</h3>
        <ul>
          {DAYS.map(day => (
            <li key={day}>
              <OpeningHoursDay
                day={day}
                dailyOpenings={R.reduce(
                  (items, [open, close]) => {
                    if (open.day === day) {
                      return [
                        ...items,
                        {
                          open: open.value,
                          close: close.value
                        }
                      ];
                    }
                    return items;
                  },
                  [],
                  openingsAndClosings
                )}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default OpeningHours;
