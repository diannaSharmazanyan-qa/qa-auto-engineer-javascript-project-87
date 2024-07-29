const makeStringArray = (diffObject) => Object.keys(diffObject).map((key) => {
  if (key.endsWith('__added')) return `  + ${key.replace('__added', '')}: ${diffObject[key]}`;
  if (key.endsWith('__deleted')) return `  - ${key.replace('__deleted', '')}: ${diffObject[key]}`;
  // eslint-disable-next-line no-underscore-dangle
  if (typeof diffObject[key] === 'object') return `  - ${key}: ${diffObject[key].__old}\n  + ${key}: ${diffObject[key].__new}`;
  return `    ${key}: ${diffObject[key]}`;
});
const format = (diffObject) => `{\n${makeStringArray(diffObject).join('\n')}\n}`;

export default format;
