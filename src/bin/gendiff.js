#!/usr/bin/env node  
import { Command } from 'commander';
import fs from 'fs';
import * as path from 'node:path';
import genDiff from './gendiff-src.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .version('1.0.0', '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const file1 = fs.readFileSync(path.resolve(filepath1)).toString();
    const file2 = fs.readFileSync(path.resolve(filepath2)).toString();
    const obj1 = JSON.parse(file1);
    const obj2 = JSON.parse(file2);

    console.log(genDiff(obj1, obj2));
  });


export default () => program.parse(process.argv);
