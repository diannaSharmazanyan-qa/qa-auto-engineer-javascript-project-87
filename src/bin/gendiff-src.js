import _ from 'lodash';
import format from '../formatters/index.js';

const genDiff = (obj1, obj2, formatName) => {
  const keys = _.uniq(Object.keys(obj1).concat(Object.keys(obj2)).sort());
  return format(obj1, obj2, keys, formatName);
};

export default genDiff;
