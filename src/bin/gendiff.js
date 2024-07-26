#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
import * as path from 'node:path';
import genDiff from './gendiff-src.js';
import parse from './parsers.js';

const searchRecursive = (dir, pattern) => {
  let results = [];
  fs.readdirSync(dir).forEach((dirInner) => {
    // eslint-disable-next-line no-param-reassign
    dirInner = path.resolve(dir, dirInner);

    const stat = fs.statSync(dirInner);
    if (stat.isDirectory()) {
      results = results.concat(searchRecursive(dirInner, pattern));
    }

    if (stat.isFile() && dirInner.endsWith(pattern)) {
      results.push(dirInner);
    }
  });

  return results;
};

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .version('1.0.0', '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, type) => {
    const file1 = fs.readFileSync(path.resolve(searchRecursive('./', filepath1)[0])).toString();
    const format1 = path.extname(filepath1);
    const file2 = fs.readFileSync(path.resolve(searchRecursive('./', filepath2)[0])).toString();
    const format2 = path.extname(filepath2);
    const obj1 = parse(file1, format1);
    const obj2 = parse(file2, format2);

    console.log(genDiff(obj1, obj2, type.format));
  });

program.parse();
