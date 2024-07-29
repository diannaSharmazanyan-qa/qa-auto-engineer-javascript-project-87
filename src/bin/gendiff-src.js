import _ from 'lodash';
import fs from 'fs';
import path from 'node:path';
import format from '../formatters/index.js';

import parse from './parsers.js';

const makeDiffObject = (obj1, obj2) => {
  const uniqKeys = _.sortBy(_.uniq(Object.keys(obj1).concat(Object.keys(obj2))));
  return uniqKeys.reduce((acc, currKey) => {
    if (obj1[currKey] === undefined) return { ...acc, [`${currKey}__added`]: obj2[currKey] };
    if (obj2[currKey] === undefined) return { ...acc, [`${currKey}__deleted`]: obj1[currKey] };
    if (obj1[currKey] === obj2[currKey]) return { ...acc, [currKey]: obj1[currKey] };
    return { ...acc, [currKey]: { __old: obj1[currKey], __new: obj2[currKey] } };
  }, {});
};
const genDiff = (filepath1, filepath2, outputFormat) => {
  const file1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const file1Format = path.extname(filepath1);
  const file2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');
  const file2Format = path.extname(filepath2);

  const obj1 = parse(file1, file1Format);
  const obj2 = parse(file2, file2Format);

  const diffObject = makeDiffObject(obj1, obj2);
  return format(diffObject, outputFormat);
};

export default genDiff;
