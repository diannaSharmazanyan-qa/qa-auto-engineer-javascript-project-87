const mapping = {
  added: (node, path) => `  + ${path}: ${node.value}`,
  deleted: (node, path) => `  - ${path}: ${node.value}`,
  unchanged: (node, path) => `    ${path}: ${node.value}`,
  updated: (node, path) => `  - ${path}: ${node.old}\n  + ${path}: ${node.new}`,
};

const makeStringArray = (diffObject) => Object.keys(diffObject).map((key) => {
  const node = diffObject[key];
  if (Object.hasOwn(mapping, node.type)) return mapping[node.type](diffObject[key], key);
  throw new Error(`Unexpected status '${node.type}' for ${key}`);
});
const format = (diffObject) => `{\n${makeStringArray(diffObject).join('\n')}\n}`;

export default format;
