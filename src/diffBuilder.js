import _ from 'lodash';

const makeDiffObject = (obj1, obj2) => {
  const uniqKeys = _.sortBy(_.uniq(Object.keys(obj1).concat(Object.keys(obj2))));
  const diffEntries = uniqKeys.map((currKey) => {
    if (obj1[currKey] === undefined) {
      return [currKey, { type: 'added', value: obj2[currKey] }];
    }
    if (obj2[currKey] === undefined) {
      return [currKey, { type: 'deleted', value: obj1[currKey] }];
    }
    if (obj1[currKey] === obj2[currKey]) {
      return [currKey, { type: 'unchanged', value: obj1[currKey] }];
    }
    return [currKey, { type: 'updated', old: obj1[currKey], new: obj2[currKey] }];
  });

  return Object.fromEntries(diffEntries);
};

export default makeDiffObject;
