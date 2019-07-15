// @flow strict

import mockdate from 'mockdate';
import { getAmPmHours, isToday } from './helpers';

describe('helpers', () => {
  describe('getAmPmHours', () => {
    let result;

    describe('AM', () => {
      beforeEach(() => {
        result = getAmPmHours(7200);
      });

      it('returns time', () => {
        expect(result).toBe('2\u00A0AM');
      });
    });

    describe('PM', () => {
      beforeEach(() => {
        result = getAmPmHours(72000);
      });

      it('returns time', () => {
        expect(result).toBe('8\u00A0PM');
      });
    });

    describe('midnight', () => {
      beforeEach(() => {
        result = getAmPmHours(86400);
      });

      it('returns time', () => {
        expect(result).toBe('12\u00A0AM');
      });
    });

    describe('noon', () => {
      beforeEach(() => {
        result = getAmPmHours(43200);
      });

      it('returns time', () => {
        expect(result).toBe('12\u00A0PM');
      });
    });
  });

  describe('isToday', () => {
    let result;

    afterEach(() => {
      mockdate.reset();
    });

    describe('monday', () => {
      describe('when is today', () => {
        beforeEach(() => {
          mockdate.set('2019-07-15');
          result = isToday('monday');
        });

        it('returns true', () => {
          expect(result).toBe(true);
        });
      });

      describe('when is not today', () => {
        beforeEach(() => {
          mockdate.set('2019-07-16');
          result = isToday('monday');
        });

        it('returns true', () => {
          expect(result).toBe(false);
        });
      });
    });

    describe('sunday', () => {
      describe('when is today', () => {
        beforeEach(() => {
          mockdate.set('2019-07-14');
          result = isToday('sunday');
        });

        it('returns true', () => {
          expect(result).toBe(true);
        });
      });

      describe('when is not today', () => {
        beforeEach(() => {
          mockdate.set('2019-07-15');
          result = isToday('sunday');
        });

        it('returns true', () => {
          expect(result).toBe(false);
        });
      });
    });
  });
});
