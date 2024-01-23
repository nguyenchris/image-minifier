#!/usr/bin/env node

const yargs = require('yargs');
const main = require('../src/main');
const { defaultQuality } = require('../src/config');

const options = yargs
  .usage('Usage: -s <source-dir> -d <dest-dir> -q <quality>')
  .option('s', {
    alias: 'source',
    describe: 'Source directory',
    type: 'string',
    demandOption: true,
  })
  .option('d', {
    alias: 'destination',
    describe: 'Destination directory',
    type: 'string',
    demandOption: true,
  })
  .option('q', {
    alias: 'quality',
    describe: 'Quality of the image compression',
    type: 'number',
    default: defaultQuality,
  }).argv;

const { source, destination, quality } = options;

main(source, destination, quality)
  .then(() => console.log('Processing complete.'))
  .catch((err) => {
    console.error(`Error: ${err.message}`);
    throw err;
  });
