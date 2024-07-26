function formatKey(key, val1, val2, res) {
  if (val1 === undefined) {
    res.push(`Property '${key}' was added with value: ${val2}`);
  } else if (val2 === undefined) {
    res.push(`Property '${key}' was removed`);
  } else if (val1 !== val2) {
    res.push(`Property '${key}' was updated. From ${val1} to ${val2}`);
  }
}
const formatLines = (linesArr) => linesArr.join('\n');

export { formatLines, formatKey };
