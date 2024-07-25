import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys = _.uniq(Object.keys(obj1).concat(Object.keys(obj2)).sort());
  const diff = keys.reduce((acc, key) => {
    const obj1Value = obj1[key];
    const obj2Value = obj2[key];

    if (obj1Value === undefined) {
      acc.push(`  + ${key}: ${obj2Value}`);
    } else if (obj2Value === undefined) {
      acc.push(`  - ${key}: ${obj1Value}`);
    } else if (obj1Value === obj2Value) {
      acc.push(`    ${key}: ${obj1Value}`);
    } else {
      acc.push(`  - ${key}: ${obj1Value}`);
      acc.push(`  + ${key}: ${obj2Value}`);
    }
    return acc;
  }, []);
  return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
