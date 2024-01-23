// src/fileUtils.js
const fs = require('fs').promises;
const fse = require('fs-extra');

async function isDirectory(path) {
  try {
    const stat = await fs.stat(path);
    return stat.isDirectory();
  } catch (err) {
    return false;
  }
}

async function createDirectory(directory) {
  await fs.mkdir(directory, { recursive: true });
}

async function readDirectory(directory) {
  return await fs.readdir(directory);
}

async function getFileSize(filePath) {
  const stats = await fse.stat(filePath);
  return stats.size;
}

module.exports = {
  isDirectory,
  createDirectory,
  readDirectory,
  getFileSize,
};
