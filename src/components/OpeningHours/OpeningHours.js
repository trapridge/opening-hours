// @flow strict

import * as R from 'ramda';
import React, { Component, type Element } from 'react';
import type { Day } from '../../helpers';
import { DAYS } from '../../helpers';
import Box from '../ui/Box/Box';
import List from '../ui/List/List';
import ListItem from '../ui/ListItem/ListItem';
import clockIcon from './clock.png';
import OpeningHoursDay from '../OpeningHoursDay/OpeningHoursDay';

type OpeningHoursRecord = {|
  type: 'open' | 'close',
  value: number
|};

export type OpeningHoursRecords = { [Day]: OpeningHoursRecord[] };

type Props = {
  data: OpeningHoursRecords
};

type OpeningAndClosing = [
  {| ...OpeningHoursRecord, day: Day |},
  OpeningHoursRecord
];

type State = {
  openingsAndClosings: OpeningAndClosing[]
};

export class OpeningHours extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.itemsByDay = this.itemsByDay.bind(this);
    this.getDailyOpenings = this.getDailyOpenings.bind(this);
    this.state = {
      openingsAndClosings: []
    };
  }

  componentDidMount() {
    this.setState({ openingsAndClosings: this.parseOpeningsAndClosings() });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.data !== this.props.data) {
      this.setState({ openingsAndClosings: this.parseOpeningsAndClosings() });
    }
  }

  parseOpeningsAndClosings(): $PropertyType<State, 'openingsAndClosings'> {
    // $FlowFixMe: nested array type bug
    const items: {| ...OpeningHoursRecord, day?: Day |}[] = R.compose(
      R.unnest,
      R.map(this.itemsByDay)
    )(DAYS);

    const openings = R.filter(R.propEq('type', 'open'), items);
    const closings = R.filter(R.propEq('type', 'close'), items);

    if (openings.length !== closings.length) {
      throw new Error();
    }

    return R.zip(openings, closings);
  }

  itemsByDay: Day => {| ...OpeningHoursRecord, day?: Day |}[];
  itemsByDay(day: Day): {| ...OpeningHoursRecord, day?: Day |}[] {
    const { data } = this.props;

    return R.map(
      record => ({
        ...record,
        ...(record.type === 'open' ? { day } : {})
      }),
      data[day]
    );
  }

  getDailyOpenings: Day => {| open: number, close: number |}[];
  getDailyOpenings(day: Day): {| open: number, close: number |}[] {
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
            <ListItem key={day}>
              <OpeningHoursDay
                day={day}
                dailyOpenings={this.getDailyOpenings(day)}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }
}

export default OpeningHours;
