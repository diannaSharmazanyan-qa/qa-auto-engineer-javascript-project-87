import YAML from 'yaml';

const parse = (data, format) => {
  if (format === '.json') return JSON.parse(data);
  if (format === '.yaml' || format === '.yml') return YAML.parse(data);

  console.log(`${format} file extension is not supported.`);

  return 0;
};

export default parse;
