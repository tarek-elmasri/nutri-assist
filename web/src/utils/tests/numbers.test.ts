import numbers from '../numbers';

describe('numbers module tests', () => {
  test('round method returns valid rounded value', () => {
    expect(numbers.fixedDecimals(1788.844654)).toEqual(1788.84);
    expect(numbers.fixedDecimals(12.79999)).toEqual(12.8);
    expect(numbers.fixedDecimals(12.8925)).toEqual(12.89);
  });
});
