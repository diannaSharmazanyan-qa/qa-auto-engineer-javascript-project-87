import * as defaultFormat from './default.js';
import * as plainFormat from './plain.js';
import * as jsonFormat from './json.js';

const format = (obj1, obj2, uniqKeys, formatName = 'default') => {
  const diff = uniqKeys.reduce((acc, key) => {
    const obj1Value = obj1[key];
    const obj2Value = obj2[key];

    if (formatName === 'plain') {
      plainFormat.formatKey(key, obj1Value, obj2Value, acc);
    } else if (formatName === 'json') {
      jsonFormat.formatKey(key, obj1Value, obj2Value, acc);
    } else {
      defaultFormat.formatKey(key, obj1Value, obj2Value, acc);
    }

    return acc;
  }, []);

  if (formatName === 'plain') return plainFormat.formatLines(diff);
  if (formatName === 'json') return jsonFormat.formatLines(diff);
  return defaultFormat.formatLines(diff);
};

export default format;
