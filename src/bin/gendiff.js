#!/usr/bin/env node
import program from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .version('12.1.0', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')