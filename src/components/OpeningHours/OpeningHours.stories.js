// @flow strict

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import InvalidDataBoundary from '../InvalidDataBoundary/InvalidDataBoundary';
import OpeningHours from './OpeningHours';
import '../../index.scss';

storiesOf('OpeningHours', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <InvalidDataBoundary>
      <OpeningHours
        data={object(
          'data',
          {
            monday: [],
            tuesday: [
              {
                type: 'open',
                value: 36000,
              },
              {
                type: 'close',
                value: 64800,
              },
            ],
            wednesday: [],
            thursday: [
              {
                type: 'open',
                value: 36000,
              },
              {
                type: 'close',
                value: 64800,
              },
            ],
            friday: [
              {
                type: 'open',
                value: 36000,
              },
            ],
            saturday: [
              {
                type: 'close',
                value: 3600,
              },
              {
                type: 'open',
                value: 36000,
              },
            ],
            sunday: [
              {
                type: 'close',
                value: 3600,
              },
              {
                type: 'open',
                value: 43200,
              },
              {
                type: 'close',
                value: 75600,
              },
            ],
          },
          'groupId'
        )}
      />
    </InvalidDataBoundary>
  ));
