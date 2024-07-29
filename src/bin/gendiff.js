#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from './gendiff-src.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .version('1.0.0', '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, type) => {
    console.log(genDiff(filepath1, filepath2, type.format));
  });

export default () => program.parse();
