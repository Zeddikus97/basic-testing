import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ 
      a: 37, 
      b: 63, 
      action: Action.Add 
    });
    expect(result).toBe(100);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ 
      a: 100, 
      b: 50, 
      action: Action.Subtract 
    });
    expect(result).toBe(50);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ 
      a: 23, 
      b: 123, 
      action: Action.Multiply 
    });
    expect(result).toBe(2829);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ 
      a: 3585, 
      b: 5, 
      action: Action.Divide });
    expect(result).toBe(717);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ 
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ 
      a: 23, 
      b: 112, 
      action: 'NoAction' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ 
      a: null, 
      b: undefined, 
      action: Action.Exponentiate,
    });
    expect(result).toBeNull();
  });
});
