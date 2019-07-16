// @flow strict

import React, { type Element } from 'react';
import InvalidDataBoundary from '../InvalidDataBoundary/InvalidDataBoundary';
import OpeningHoursList from '../OpeningHoursList/OpeningHoursList';
import Box from '../ui/Box/Box';
import clockIcon from './clock.png';

type OpeningHoursRecord = {
  type: 'open' | 'close',
  value: number,
};

export type OpeningHoursRecords = { [string]: OpeningHoursRecord[] };

type Props = {
  data: OpeningHoursRecords,
};

export const OpeningHours = ({ data }: Props): Element<typeof Box> => (
  <Box header="Opening hours" icon={clockIcon}>
    <InvalidDataBoundary>
      <OpeningHoursList data={data} />
    </InvalidDataBoundary>
  </Box>
);

export default OpeningHours;
