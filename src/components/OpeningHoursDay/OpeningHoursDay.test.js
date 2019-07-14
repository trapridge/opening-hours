// @flow strict

import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import OpeningHoursDay from './OpeningHoursDay';

describe('OpeningHoursDay', () => {
  let wrapper: ShallowWrapper<typeof OpeningHoursDay>;

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(
        <OpeningHoursDay
          day={'monday'}
          dailyOpenings={[{ open: 36000, close: 72000 }]}
        />
      );
    });

    it('renders day', () => {
      expect(wrapper.contains('monday')).toBe(true);
    });

    it('renders opening hours', () => {
      expect(wrapper.contains('10 AM - 8 PM')).toBe(true);
    });
  });
});
