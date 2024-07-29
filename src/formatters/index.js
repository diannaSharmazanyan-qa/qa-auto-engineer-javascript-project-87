import stylishFormat from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

const mapping = {
  json: (diffObject) => jsonFormat(diffObject),
  plain: (diffObject) => plainFormat(diffObject),
  stylish: (diffObject) => stylishFormat(diffObject),
  unsupported: (formatName) => console.log(`Error: '${formatName}' output format is not supported`),
};

const format = (diffObject, formatName = 'stylish') => {
  if (formatName === 'plain') return mapping.plain(diffObject);
  if (formatName === 'json') return mapping.json(diffObject);
  if (formatName === 'stylish') return mapping.stylish(diffObject);
  return mapping.unsupported(formatName);
};

export default format;
