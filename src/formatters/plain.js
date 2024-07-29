const filterUnchanged = (diffObject) => Object.keys(diffObject).filter((key) => key.includes('__added')
  || key.includes('__deleted')
  || typeof diffObject[key] === 'object');

const makeStringArray = (diffObject) => filterUnchanged(diffObject).map((key) => {
  if (key.endsWith('__added')) return `Property '${key.replace('__added', '')}' was added with value: ${diffObject[key]}`;
  if (key.endsWith('__deleted')) return `Property '${key.replace('__deleted', '')}' was removed`;
  // eslint-disable-next-line no-underscore-dangle
  return `Property '${key}' was updated. From ${diffObject[key].__old} to ${diffObject[key].__new}`;
});
const format = (diffObject) => makeStringArray(diffObject).join('\n');

export default format;
