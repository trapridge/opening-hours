// @flow strict

import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import Box from './Box';

describe('Box', () => {
  let wrapper: ShallowWrapper<typeof Box>;

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(<Box header={'Header'}>Content</Box>);
    });

    it('renders header', () => {
      expect(wrapper.contains('Header')).toBe(true);
    });

    it('renders content', () => {
      expect(wrapper.contains('Content')).toBe(true);
    });
  });
});
