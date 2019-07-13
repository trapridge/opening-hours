// @flow strict

import React from 'react';

import { storiesOf } from '@storybook/react';
import ListItem from '../ListItem/ListItem';
import List from './List';
import '../../../index.scss';

storiesOf('List', module).add('default', () => (
  <List>
    <ListItem key="1">First</ListItem>
    <ListItem key="2">Second</ListItem>
    <ListItem key="3">Third</ListItem>
  </List>
));
