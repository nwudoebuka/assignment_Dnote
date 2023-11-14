import { getTotalPrice } from './Price';

describe('Tests of price calculations', () => {
  test('get total for 1 iBeacon', () => {
    expect(getTotalPrice(1, 65)).toEqual(65);
  });
  test('get total for 5 iBeacons', () => {
    expect(getTotalPrice(5, 50)).toEqual(250);
  });
});
