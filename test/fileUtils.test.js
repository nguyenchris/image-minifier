const { isDirectory } = require('../src/fileUtils');

describe('fileUtils', () => {
  describe('isDirectory', () => {
    test('should return true for a directory', async () => {
      const result = await isDirectory(__dirname); // __dirname is always a directory
      expect(result).toBeTruthy();
    });

    test('should return false for a non-directory', async () => {
      const result = await isDirectory(__filename); // __filename is a file, not a directory
      expect(result).toBeFalsy();
    });
  });
});
