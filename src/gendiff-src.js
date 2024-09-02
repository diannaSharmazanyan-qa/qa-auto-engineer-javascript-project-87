import fs from 'fs';
import path from 'path';
import format from './formatters/index.js';
import parse from './parsers.js';
import makeDiffObject from './diffBuilder.js';

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
