// @flow strict

import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import ListItem from './ListItem';

describe('ListItem', () => {
  let wrapper: ShallowWrapper<typeof ListItem>;

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(<ListItem>example</ListItem>);
    });

    it('renders content', () => {
      expect(wrapper.contains('example')).toBe(true);
    });
  });
});
