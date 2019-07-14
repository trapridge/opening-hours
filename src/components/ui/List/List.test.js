// @flow strict

import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import ListItem from '../ListItem/ListItem';
import List from './List';

describe('List', () => {
  let wrapper: ShallowWrapper<typeof List>;

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(
        <List>
          <ListItem>example</ListItem>
        </List>
      );
    });

    it('renders content', () => {
      expect(wrapper.contains('example')).toBe(true);
    });
  });
});
