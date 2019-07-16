// @flow strict

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import App from './App';

describe('App', () => {
  let wrapper: ShallowWrapper<typeof App>;
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

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
        });
      });

      it('renders opening hours', () => {
        expect(wrapper.find('OpeningHours')).toHaveLength(1);
      });
    });
  });

  describe('lifecycle methods', () => {
    describe('componentDidMount', () => {
      describe('on load success', () => {
        let data = ['data'];
        let setStateSpy;

        beforeEach(() => {
          mockAxios.onGet('data.json').reply(200, data);
          setStateSpy = jest.spyOn(App.prototype, 'setState');
          wrapper = shallow(<App />);
        });

        it('call setState', () => {
          expect(setStateSpy).toHaveBeenNthCalledWith(1, {
            loading: true,
            loadError: false,
          });
          expect(setStateSpy).toHaveBeenNthCalledWith(2, {
            loading: false,
            openingHoursData: data,
          });
        });
      });

      describe('on load failure', () => {
        let setStateSpy;

        beforeEach(async () => {
          mockAxios.onGet('data.json').networkError();
          setStateSpy = jest.spyOn(App.prototype, 'setState');
          wrapper = shallow(<App />);
          setStateSpy.mockClear();
          await wrapper.instance().componentDidMount();
        });

        it('call setState', () => {
          expect(setStateSpy).toHaveBeenNthCalledWith(1, {
            loading: true,
            loadError: false,
          });
          expect(setStateSpy).toHaveBeenNthCalledWith(2, {
            loading: false,
            loadError: true,
          });
        });
      });
    });
  });
});
