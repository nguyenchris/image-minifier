const { compressImages } = require('./imageProcessor');
const { isDirectory } = require('./fileUtils');

async function main(source, destination, quality) {
  if (!(await isDirectory(source))) {
    throw new Error(`Source "${source}" is not a directory or does not exist.`);
  }

  await compressImages(source, destination, quality);
}

module.exports = main;
