import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 23, b: 123, action: Action.Multiply, expected: 2829 },
    { a: 3585, b: 5, action: Action.Divide, expected: 717 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 23, b: 112, action: 'NoAction', expected: null },
    { a: null, b: undefined, action: Action.Exponentiate, expected: null }
]; 

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Calculated $a with %b using action $action',
    ({ action, a, b, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
