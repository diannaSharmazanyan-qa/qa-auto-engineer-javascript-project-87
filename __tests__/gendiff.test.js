import fs from 'fs';
import { expect, test } from '@jest/globals';
import genDiff from '../src/bin/gendiff-src.js';

test('flat json', () => {
  const file1 = fs.readFileSync('__tests__/__fixtures__/file1.json').toString();
  const file2 = fs.readFileSync('__tests__/__fixtures__/file2.json').toString();
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  expect(genDiff(obj1, obj2)).toEqual(
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
  );
});