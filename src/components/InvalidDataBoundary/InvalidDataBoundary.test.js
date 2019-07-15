// @flow strict

import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import InvalidDataBoundary from './InvalidDataBoundary';

describe('InvalidDataBoundary', () => {
  let wrapper: ShallowWrapper<typeof InvalidDataBoundary>;

  describe('rendering', () => {
    describe('when did not catch', () => {
      beforeEach(() => {
        wrapper = shallow(<InvalidDataBoundary>Child</InvalidDataBoundary>);
      });

      it('renders children as is', () => {
        expect(wrapper.contains('Child')).toBe(true);
      });
    });

    describe('when did catch', () => {
      beforeEach(() => {
        wrapper = shallow(<InvalidDataBoundary>Child</InvalidDataBoundary>);
        wrapper.instance().componentDidCatch();
        wrapper.update();
      });

      it('renders error message', () => {
        expect(wrapper.contains('Invalid data')).toBe(true);
      });
    });
  });
});
