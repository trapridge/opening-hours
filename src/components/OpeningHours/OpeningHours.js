// @flow strict

import * as R from 'ramda';
import React, { Component, type Element } from 'react';
import Box from '../Box/Box';
import List from '../List/List';
import clockIcon from './clock.png';
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

export const DAYS: Day[] = [
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
    this.getDailyOpenings = this.getDailyOpenings.bind(this);
    this.state = {
      openingsAndClosings: this.parseOpeningsAndClosings()
    };
  }

  parseOpeningsAndClosings(): [
    {| ...OpeningHoursRecord, day: Day |},
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

  itemsByDay: Day => {| ...OpeningHoursRecord, day?: Day |}[];
  itemsByDay(day: Day): {| ...OpeningHoursRecord, day?: Day |}[] {
    const { openingHours } = this.props;

    return R.map(
      entry => (entry.type === 'open' ? { ...entry, day } : entry),
      openingHours[day]
    );
  }

  getDailyOpenings: Day => { open: number, close: number }[];
  getDailyOpenings(day: Day): { open: number, close: number }[] {
    const { openingsAndClosings } = this.state;

    return R.reduce(
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
    );
  }

  render(): Element<typeof Box> {
    return (
      <Box header="Opening hours" icon={clockIcon}>
        <List>
          {DAYS.map(day => (
            <li key={day}>
              <OpeningHoursDay
                day={day}
                dailyOpenings={this.getDailyOpenings(day)}
              />
            </li>
          ))}
        </List>
      </Box>
    );
  }
}

export default OpeningHours;
