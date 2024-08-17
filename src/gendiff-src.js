import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import format from './formatters/index.js';

import parse from './parsers.js';

const makeDiffObject = (obj1, obj2) => {
  const uniqKeys = _.sortBy(_.uniq(Object.keys(obj1).concat(Object.keys(obj2))));
  return uniqKeys.reduce((acc, currKey) => {
    if (obj1[currKey] === undefined) return { ...acc, [currKey]: { type: 'added', value: obj2[currKey] } };
    if (obj2[currKey] === undefined) return { ...acc, [currKey]: { type: 'deleted', value: obj1[currKey] } };
    if (obj1[currKey] === obj2[currKey]) return { ...acc, [currKey]: { type: 'unchanged', value: obj1[currKey] } };
    return { ...acc, [currKey]: { type: 'updated', old: obj1[currKey], new: obj2[currKey] } };
  }, {});
};
const buildFullPath = (path1) => path.resolve(path1);
const getData = (fullPath) => {
  const file = fs.readFileSync(fullPath, 'utf-8');
  const fileFormat = path.extname(fullPath).substring(1);

  return parse(file, fileFormat);
};

const genDiff = (filepath1, filepath2, outputFormat) => {
  const obj1 = getData(buildFullPath(filepath1));
  const obj2 = getData(buildFullPath(filepath2));

  const diffObject = makeDiffObject(obj1, obj2);
  return format(diffObject, outputFormat);
};

export default genDiff;
