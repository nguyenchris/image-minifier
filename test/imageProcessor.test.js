const { compressImages } = require('../src/imageProcessor');
const sharp = require('sharp');
const fileUtils = require('../src/fileUtils');
const fs = require('fs-extra');
const os = require('os');

jest.mock('sharp');
jest.mock('../src/fileUtils');
jest.mock('fs-extra');
jest.mock('os');

describe('imageProcessor', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mocking fileUtils functions
    fileUtils.createDirectory.mockResolvedValue();
    fileUtils.getFileSize.mockResolvedValue(1024);

    // Mocking fs.readdir to simulate directory content
    fs.readdir.mockImplementation((path) => {
      if (path === '/source') {
        return Promise.resolve([
          { name: 'image1.jpg', isFile: () => true, isDirectory: () => false },
          { name: 'subfolder', isFile: () => false, isDirectory: () => true },
        ]);
      } else if (path === '/source/subfolder') {
        return Promise.resolve([
          { name: 'image2.png', isFile: () => true, isDirectory: () => false },
        ]);
      }
      return Promise.resolve([]);
    });

    sharp.mockReturnValue({
      toFormat: jest.fn().mockReturnThis(),
      toFile: jest.fn().mockResolvedValue(),
    });

    os.cpus.mockReturnValue({ length: 4 });
  });

  test('compressImages should process each image file, including in subdirectories', async () => {
    await compressImages('/source', '/dest', 80);

    // Verify directory and subdirectory processing
    expect(fileUtils.createDirectory).toHaveBeenCalledWith('/dest');
    expect(fileUtils.createDirectory).toHaveBeenCalledWith('/dest/subfolder');
    expect(fs.readdir).toHaveBeenCalledWith('/source', expect.anything());
    expect(fs.readdir).toHaveBeenCalledWith(
      '/source/subfolder',
      expect.anything()
    );

    // Verify image processing calls
    expect(sharp).toHaveBeenCalledTimes(2); // Two images processed
    expect(sharp().toFormat).toHaveBeenCalledTimes(2);
    expect(sharp().toFile).toHaveBeenCalledTimes(2);
  });
});
