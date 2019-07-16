// @flow strict

import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import OpeningHours from './OpeningHours';

describe('OpeningHours', () => {
  let wrapper: ShallowWrapper<typeof OpeningHours>;

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(
        <OpeningHours
          data={{
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
          }}
        />
      );
    });

    it('renders error boundary', () => {
      expect(wrapper.find('InvalidDataBoundary')).toHaveLength(1);
    });

    it('renders list', () => {
      expect(wrapper.find('OpeningHoursList')).toHaveLength(1);
    });

    // beforeEach(() => {
    //   wrapper = shallow(
    //     <OpeningHours
    //       data={{
    //         monday: [],
    //         tuesday: [],
    //         wednesday: [],
    //         thursday: [],
    //         friday: [],
    //         saturday: [],
    //         sunday: []
    //       }}
    //     />
    //   );
    // });
    //
    // it('renders all days', () => {
    //   expect(wrapper.find('OpeningHoursDay')).toHaveLength(7);
    // });
  });
});
