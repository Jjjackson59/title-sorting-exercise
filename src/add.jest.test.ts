import {add} from './add.js';

describe('add', () => {
  test('adds 0 numbers', () => {
    const actual = add();
    expect(actual).toBe(0);
  });

  test('adds 1 number', () => {
    const actual = add(4);
    expect(actual).toBe(4);
  });

  test('adds 2 numbers', () => {
    const actual = add(2, 3);
    expect(actual).toBe(5);
  });

  test('adds 3 numbers', () => {
    const actual = add(2, 3, 4);
    expect(actual).toBe(9);
  });

  test('adds decimals', () => {
    const actual = add(1, 0.2);
    expect(actual).toBe(1.2);
  });
});
