import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test, jest } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/gendiff-src.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('flat json', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  expect(genDiff(file1, file2)).toEqual(readFile('resultStylish.txt'));
});
test('flat yaml', () => {
  const file1 = getFixturePath('filepath1.yml');
  const file2 = getFixturePath('filepath2.yml');

  expect(genDiff(file1, file2)).toEqual(readFile('resultStylish.txt'));
});
test('--format plain', () => {
  const file1 = getFixturePath('filepath1.yml');
  const file2 = getFixturePath('filepath2.yml');

  expect(genDiff(file1, file2, 'plain')).toEqual(readFile('resultPlain.txt'));
});
test('--format json', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  expect(genDiff(file1, file2, 'json')).toEqual(readFile('resultJson.txt'));
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
  expect(logSpy).toHaveBeenCalledWith('txt file format is not supported.');
});
