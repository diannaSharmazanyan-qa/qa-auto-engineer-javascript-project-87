function formatKey(key, val1, val2, res) {
  if (res[0] === undefined) res[0] = {};
  if (val1 === undefined) {
    res[0][`${key}__added`] = val2;
  } else if (val2 === undefined) {
    res[0][`${key}__deleted`] = val1;
  } else if (val1 === val2) {
    res[0][`${key}`] = val2;
  } else {
    res[0][`${key}`] = { __old: val1, __new: val2 };
  }
}

const formatLines = (linesArr) => JSON.stringify(linesArr[0]);

export { formatKey, formatLines };
