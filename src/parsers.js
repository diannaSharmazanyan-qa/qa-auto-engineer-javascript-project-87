import YAML from 'yaml';

const mapping = {
  json: (data) => JSON.parse(data),
  yaml: (data) => YAML.parse(data),
  yml: (data) => YAML.parse(data),
};
const parse = (data, format) => {
  if (Object.hasOwn(mapping, format)) return mapping[format](data);

  throw new Error(`Unsupported format ${format}`);
};

export default parse;
