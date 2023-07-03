import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue('Some value')).toBe('Some value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('Custom error message')).toThrow('Custom error message');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  const customError = new MyAwesomeError();
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(customError);
  });
});

describe('rejectCustomError', () => {
  const customError = new MyAwesomeError();
  test('should reject custom error', async () => {
    return await expect(() => rejectCustomError()).rejects.toThrow(customError);
  });
});