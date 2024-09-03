import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test, jest } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/gendiff-src.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

describe('genDiff tests', () => {
  const testCases = [
    {
      title: 'flat json',
      file1: 'file1.json',
      file2: 'file2.json',
      expected: 'resultStylish.txt',
    },
    {
      title: 'flat yaml',
      file1: 'filepath1.yml',
      file2: 'filepath2.yml',
      expected: 'resultStylish.txt',
    },
    {
      title: '--format plain',
      file1: 'filepath1.yml',
      file2: 'filepath2.yml',
      format: 'plain',
      expected: 'resultPlain.txt',
    },
    {
      title: '--format json',
      file1: 'file1.json',
      file2: 'file2.json',
      format: 'json',
      expected: 'resultJson.txt',
    },
  ];

  testCases.forEach(({
    title, file1, file2, format = 'stylish', expected,
  }) => {
    test(String(title), () => {
      const result = genDiff(getFixturePath(file1), getFixturePath(file2), format);
      expect(result.replaceAll(/\s$/gm, '')).toEqual(readFile(expected).replaceAll(/\s$/gm, ''));
    });
  });

  test('--format unsupported', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const logSpy = jest.spyOn(console, 'log');

    genDiff(file1, file2, 'someUnsupportedOutputFormat');
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('Error: \'someUnsupportedOutputFormat\' output format is not supported');
  });

  test('unsupported file format', () => {
    const file1 = getFixturePath('resultJson.txt');
    const logSpy = jest.spyOn(console, 'log');

    expect(() => genDiff(file1, file1)).toThrowError();
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('Error: \'someUnsupportedOutputFormat\' output format is not supported');
  });
});
