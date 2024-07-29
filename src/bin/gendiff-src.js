import _ from 'lodash';
import fs from 'fs';
import path from 'node:path';
import format from '../formatters/index.js';

import parse from './parsers.js';

const genDiff = (filepath1, filepath2, outputFormat) => {
  const file1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const file1Format = path.extname(filepath1);
  const file2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');
  const file2Format = path.extname(filepath2);

  const obj1 = parse(file1, file1Format);
  const obj2 = parse(file2, file2Format);

  const keys = _.uniq(Object.keys(obj1).concat(Object.keys(obj2)).sort());
  return format(obj1, obj2, keys, outputFormat);
};

export default genDiff;
