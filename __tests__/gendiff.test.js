import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test } from '@jest/globals';
import genDiff from '../src/bin/gendiff-src.js';
import parse from '../src/bin/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('flat json', () => {
  const file1 = readFile('file1.json');
  const file2 = readFile('file2.json');
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
test('flat yaml', () => {
  const file1 = readFile('filepath1.yml');
  const file2 = readFile('filepath2.yml');
  const obj1 = parse(file1, path.extname('filepath1.yml'));
  const obj2 = parse(file2, path.extname('filepath2.yml'));

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
test('--format plain', () => {
  const file1 = readFile('filepath1.yml');
  const file2 = readFile('filepath2.yml');
  const obj1 = parse(file1, path.extname('filepath1.yml'));
  const obj2 = parse(file2, path.extname('filepath2.yml'));

  expect(genDiff(obj1, obj2, 'plain')).toEqual(
    `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`,
  );
});
