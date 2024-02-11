import { BankAccount, getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';
import lodash, { isNumber } from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount: BankAccount = getBankAccount(100);
    expect(bankAccount instanceof BankAccount).toBe(true);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount: BankAccount = getBankAccount(100);
    expect(() => bankAccount.withdraw(120)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount: BankAccount = getBankAccount(100);
    const receivedBankAccount: BankAccount = getBankAccount(0);
    expect(() => bankAccount.transfer(120, receivedBankAccount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount: BankAccount = getBankAccount(100);
    expect(() => bankAccount.transfer(100, bankAccount)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAccount: BankAccount = getBankAccount(100);
    expect(bankAccount.deposit(10).getBalance()).toBe(110);
  });

  test('should withdraw money', () => {
    const bankAccount: BankAccount = getBankAccount(100);
    expect(bankAccount.withdraw(10).getBalance()).toBe(90);
  });

  test('should transfer money', () => {
    const bankAccount: BankAccount = getBankAccount(100);
    const receivedBankAccount: BankAccount = getBankAccount(0);
    bankAccount.transfer(40, receivedBankAccount);
    expect(bankAccount.getBalance()).toBe(60);
    expect(receivedBankAccount.getBalance()).toBe(40);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    const bankAccount: BankAccount = getBankAccount(100);
    const newBalance = await bankAccount.fetchBalance();
    expect(isNumber(newBalance)).toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount: BankAccount = getBankAccount(10000);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(30);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(30);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount: BankAccount = getBankAccount(10000);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
