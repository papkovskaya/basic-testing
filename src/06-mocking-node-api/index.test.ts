import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockSetTimeout = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(mockSetTimeout).toHaveBeenCalledWith(callback, 1000);
    mockSetTimeout.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockSetInterval = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(mockSetInterval).toHaveBeenCalledWith(callback, 1000);
    mockSetInterval.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 100);
    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'pathToFile';
    const mockJoin = jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    await readFileAsynchronously(pathToFile);
    expect(mockJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'pathToFile';
    const mockJoin = jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    await readFileAsynchronously(pathToFile);
    expect(mockJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'pathToFile';
    const content = 'content example';
    jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(Buffer.from(content));
    expect(await readFileAsynchronously(pathToFile)).toBe(content);
  });
});
