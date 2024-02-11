import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([5, 6, 7])).toStrictEqual({
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 7,
        },
        value: 6,
      },
      value: 5,
    });
  });

  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([5, 6, 7])).toMatchSnapshot();
  });
});
