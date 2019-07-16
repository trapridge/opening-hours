// @flow strict

import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import OpeningHoursList from './OpeningHoursList';

describe('OpeningHoursList', () => {
  let wrapper: ShallowWrapper<typeof OpeningHoursList>;

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(
        <OpeningHoursList
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

    it('renders all days', () => {
      expect(wrapper.find('OpeningHoursDay')).toHaveLength(7);
    });
  });

  describe('initially', () => {
    let parseOpeningsAndClosingsSpy;

    beforeEach(() => {
      parseOpeningsAndClosingsSpy = jest.spyOn(
        OpeningHoursList.prototype,
        'parseOpeningsAndClosings'
      );
      wrapper = shallow(
        <OpeningHoursList
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

    it('parseOpeningsAndClosings is called', () => {
      expect(parseOpeningsAndClosingsSpy).toHaveBeenCalled();
    });
  });

  describe('lifecycle methods', () => {
    describe('componentDidUpdate', () => {
      let setStateSpy;

      beforeEach(() => {
        setStateSpy = jest.spyOn(OpeningHoursList.prototype, 'setState');
        wrapper = shallow(
          <OpeningHoursList
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
        wrapper.setProps({
          data: {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
          },
        });
      });

      it('setStateSpy is called', () => {
        expect(setStateSpy).toHaveBeenCalledWith({
          openingsAndClosings: expect.anything(),
        });
      });
    });
  });

  describe('class methods', () => {
    describe('parseOpeningsAndClosings', () => {
      let result;

      beforeEach(() => {
        wrapper = shallow(
          <OpeningHoursList
            data={{
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
            }}
          />
        );
        result = wrapper.instance().parseOpeningsAndClosings();
      });

      it('data is converted into circular linked list', () => {
        expect(result.isCircular()).toBe(true);
        expect(result.toArray()).toEqual([
          {
            type: 'open',
            value: 36000,
            day: 'tuesday',
          },
          {
            type: 'close',
            value: 64800,
          },
          {
            type: 'open',
            value: 36000,
            day: 'thursday',
          },
          {
            type: 'close',
            value: 64800,
          },
          {
            type: 'open',
            value: 36000,
            day: 'friday',
          },
          {
            type: 'close',
            value: 3600,
          },
          {
            type: 'open',
            value: 36000,
            day: 'saturday',
          },
          {
            type: 'close',
            value: 3600,
          },
          {
            type: 'open',
            value: 43200,
            day: 'sunday',
          },
          {
            type: 'close',
            value: 75600,
          },
        ]);
      });
    });

    describe('getDailyOpenings', () => {
      let result;

      beforeEach(() => {
        wrapper = shallow(
          <OpeningHoursList
            data={{
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
            }}
          />
        );
        result = wrapper.instance().getDailyOpenings('tuesday');
      });

      it('data is converted into circular linked list', () => {
        expect(result).toEqual([
          {
            open: 36000,
            close: 64800,
          },
        ]);
      });
    });
  });
});
