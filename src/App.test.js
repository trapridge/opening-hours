// @flow strict

import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import App from './App';

describe('InvalidDataBoundary', () => {
  let wrapper: ShallowWrapper<typeof App>;

  describe('rendering', () => {
    describe('by default', () => {
      beforeEach(() => {
        wrapper = shallow(<App />);
      });

      it('renders loading message', () => {
        expect(wrapper.contains('Loading opening hours')).toBe(true);
      });
    });

    describe('when there is a loading error', () => {
      beforeEach(() => {
        wrapper = shallow(<App />);
        wrapper.setState({ loadError: true });
      });

      it('renders loading error message', () => {
        expect(wrapper.contains('Cannot load opening hours')).toBe(true);
      });
    });

    describe('when data is loaded', () => {
      beforeEach(() => {
        wrapper = shallow(<App />);
        wrapper.setState({
          loading: false,
          loadError: false,
          openingHoursData: {
            monday: [],
            tuesday: [
              {
                type: 'open',
                value: 36000
              },
              {
                type: 'close',
                value: 64800
              }
            ],
            wednesday: [],
            thursday: [
              {
                type: 'open',
                value: 36000
              },
              {
                type: 'close',
                value: 64800
              }
            ],
            friday: [
              {
                type: 'open',
                value: 36000
              }
            ],
            saturday: [
              {
                type: 'close',
                value: 3600
              },
              {
                type: 'open',
                value: 36000
              }
            ],
            sunday: [
              {
                type: 'close',
                value: 3600
              },
              {
                type: 'open',
                value: 43200
              },
              {
                type: 'close',
                value: 75600
              }
            ]
          }
        });
      });

      it('renders opening hours', () => {
        expect(wrapper.find('OpeningHours')).toHaveLength(1);
      });
    });
  });
});
