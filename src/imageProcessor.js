const sharp = require('sharp');
const path = require('path');
const fs = require('fs-extra');
const { createDirectory, getFileSize } = require('./fileUtils');
const { formatBytes, calculateReductionPercentage } = require('./sizeUtils');
const os = require('os');
const chalk = require('chalk');

async function processImage(sourcePath, destPath, quality) {
  const originalSize = await getFileSize(sourcePath);

  try {
    await sharp(sourcePath)
      .toFormat(sourcePath.endsWith('.png') ? 'png' : 'jpeg', {
        quality: quality,
      })
      .toFile(destPath);

    const newSize = await getFileSize(destPath);
    const savedSize = originalSize - newSize;
    const reductionPercentage = calculateReductionPercentage(
      originalSize,
      newSize
    );

    console.log(
      `${destPath} ${chalk.gray(`(saved ${formatBytes(savedSize)} - ${reductionPercentage}%)`)}`
    );
  } catch (err) {
    throw new Error(`Error processing ${sourcePath}: ${err.message}`);
  }
}

async function compressDirectory(source, destination, quality) {
  // Check if the destination is a subdirectory of the source
  if (path.resolve(destination).startsWith(path.resolve(source))) {
    throw new Error(
      'Destination directory cannot be a subdirectory of the source directory.'
    );
  }

  await createDirectory(destination);
  const entries = await fs.readdir(source, { withFileTypes: true });

  let promises = [];
  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      promises.push(compressDirectory(sourcePath, destPath, quality));
    } else if (
      entry.isFile() &&
      ['.jpg', '.jpeg', '.png'].includes(path.extname(entry.name).toLowerCase())
    ) {
      promises.push(processImage(sourcePath, destPath, quality, destination));
    }

    if (promises.length >= os.cpus().length) {
      await Promise.all(promises);
      promises = [];
    }
  }

  await Promise.all(promises);
}

async function compressImages(source, destination, quality) {
  await compressDirectory(source, destination, quality);
}

module.exports = {
  compressImages,
};
