// @flow strict

import { Circular } from 'singlie';
import * as R from 'ramda';
import React, { Component, type Element } from 'react';
import type { Day } from '../../helpers';
import { DAYS } from '../../helpers';
import Box from '../ui/Box/Box';
import List from '../ui/List/List';
import ListItem from '../ui/ListItem/ListItem';
import clockIcon from './clock.png';
import OpeningHoursDay from '../OpeningHoursDay/OpeningHoursDay';

type OpeningHoursRecord = {
  type: 'open' | 'close',
  value: number
};

export type OpeningHoursRecords = { [string]: OpeningHoursRecord[] };

type Props = {
  data: OpeningHoursRecords
};

type State = {
  openingsAndClosings: typeof Circular
};

export class OpeningHours extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openingsAndClosings: this.parseOpeningsAndClosings()
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.data !== this.props.data) {
      this.setState({ openingsAndClosings: this.parseOpeningsAndClosings() });
    }
  }

  parseOpeningsAndClosings(): $PropertyType<State, 'openingsAndClosings'> {
    const itemsByDay = day =>
      R.map(
        record => ({
          ...record,
          ...(record.type === 'open' ? { day } : {})
        }),
        this.props.data[day]
      );
    const items = R.chain(itemsByDay, DAYS);
    return new Circular().append(...items);
  }

  getDailyOpenings: Day => { open: number, close: number }[];
  getDailyOpenings(day: Day): { open: number, close: number }[] {
    let { head: node, length } = this.state.openingsAndClosings;
    let i = 0;
    const values = [];

    while (i < length) {
      if (node.value.day === day) {
        values.push({
          open: node.value.value,
          close: node.next.value.value
        });
        node = node.next.next;
        i += 2;
        continue;
      }
      node = node.next;
      i++;
    }

    return values;
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
