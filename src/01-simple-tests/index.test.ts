import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({a: 2, b: 1, action: Action.Add})).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({a: 2, b: 1, action: Action.Subtract})).toBe(1);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({a: 3, b: 2, action: Action.Multiply})).toBe(6);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({a: 10, b: 2, action: Action.Divide})).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({a: 2, b: 3, action: Action.Exponentiate})).toBe(8);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({a: 2, b: 1, action: 'any action'})).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({a: null, b: 1, action: Action.Add})).toBe(null);
    expect(simpleCalculator({a: 2, b: null, action: Action.Add})).toBe(null);
  });
});
