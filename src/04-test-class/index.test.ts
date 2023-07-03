import { BankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError, getBankAccount } from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  let testAcc: BankAccount;

  beforeEach(() => {
    testAcc = getBankAccount(300);
  });


  test('should create account with initial balance', () => {
    const newAcc = new BankAccount(300);
    expect(newAcc.getBalance()).toBe(300);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => testAcc.withdraw(301)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const newAcc = new BankAccount(0);
    expect(() => testAcc.transfer(301, newAcc)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => testAcc.transfer(300, testAcc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    testAcc.deposit(100);
    expect(testAcc.getBalance()).toBe(400);
  });

  test('should withdraw money', () => {
    testAcc.withdraw(100);
    expect(testAcc.getBalance()).toBe(200);
  });

  test('should transfer money', () => {
    const newAcc = new BankAccount(0);
    testAcc.transfer(200, newAcc);
    expect(newAcc.getBalance()).toBe(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn().mockReturnValueOnce(300);
    const balance = await testAcc.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodash.random = jest.fn().mockReturnValueOnce(1300);
    await testAcc.synchronizeBalance();
    expect(testAcc.getBalance()).toBe(1300);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    lodash.random = jest.fn().mockReturnValueOnce(null);
    await expect(async () => await testAcc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
