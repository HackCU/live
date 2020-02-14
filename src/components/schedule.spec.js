import moment from 'moment';
import { overlappingTimes } from './schedule';

describe('overlappingTimes', () => {
  describe('overlapping', () => {
    it('is true for encapsolating times', () => {
      expect(
        overlappingTimes({
          first: {
            startTime: moment('10:00am', 'hh:mm a'),
            endTime: moment('11:00am', 'hh:mm a')
          },
          second: {
            startTime: moment('10:30am', 'hh:mm a'),
            endTime: moment('10:45am', 'hh:mm a')
          }
        })
      ).toBe(true);
      expect(
        overlappingTimes({
          second: {
            startTime: moment('10:00am', 'hh:mm a'),
            endTime: moment('11:00am', 'hh:mm a')
          },
          first: {
            startTime: moment('10:30am', 'hh:mm a'),
            endTime: moment('10:45am', 'hh:mm a')
          }
        })
      ).toBe(true);
    });
  });
});
