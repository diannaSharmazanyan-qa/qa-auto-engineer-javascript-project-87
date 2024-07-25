import YAML from 'yaml';

const parse = (data, format) => {
  let func;
  if (format === '.json') func = JSON.parse;
  if (format === '.yaml' || format === '.yml') func = YAML.parse;

  if (!func) console.log(`${format} file extension is not supported.`);

  return func(data);
};

export default parse;
