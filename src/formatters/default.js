function formatKey(key, val1, val2, res) {
  if (val1 === undefined) {
    res.push(`  + ${key}: ${val2}`);
  } else if (val2 === undefined) {
    res.push(`  - ${key}: ${val1}`);
  } else if (val1 === val2) {
    res.push(`    ${key}: ${val1}`);
  } else {
    res.push(`  - ${key}: ${val1}`);
    res.push(`  + ${key}: ${val2}`);
  }
}

const formatLines = (linesArr) => `{\n${linesArr.join('\n')}\n}`;

export { formatKey, formatLines };
