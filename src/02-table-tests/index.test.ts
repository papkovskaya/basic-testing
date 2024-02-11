import { simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 1, b: 2, action: Action.Subtract, expected: -1 },
    { a: 2, b: 2, action: Action.Subtract, expected: 0 },
    { a: 3, b: 2, action: Action.Subtract, expected: 1 },
    { a: 2, b: 2, action: Action.Divide, expected: 1 },
    { a: 4, b: 2, action: Action.Divide, expected: 2 },
    { a: 10, b: 2, action: Action.Divide, expected: 5 },
    { a: 2, b: 2, action: Action.Multiply, expected: 4 },
    { a: 4, b: 2, action: Action.Multiply, expected: 8 },
    { a: 10, b: 2, action: Action.Multiply, expected: 20 },
    { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
    { a: null, b: 2, action: Action.Multiply, expected: null },
    { a: 10, b: null, action: Action.Multiply, expected: null },
    { a: 10, b: 2, action: null, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)("simpleCalculator({a: %i, b: %i, action: %s})", (testCaseExample) => {
    expect(simpleCalculator({a: testCaseExample.a, b: testCaseExample.b, action: testCaseExample.action})).toBe(testCaseExample.expected);
  });
});
