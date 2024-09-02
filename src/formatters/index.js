import stylishFormat from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

const mapping = {
  json: (diffObject) => jsonFormat(diffObject),
  plain: (diffObject) => plainFormat(diffObject),
  stylish: (diffObject) => stylishFormat(diffObject),
};

const format = (diffObject, formatName = 'stylish') => {
  if (Object.hasOwn(mapping, formatName)) return mapping[formatName](diffObject);

  return console.log(`Error: '${formatName}' output format is not supported`);
};

export default format;
