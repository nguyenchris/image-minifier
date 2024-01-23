const main = require('../src/main');

describe('main', () => {
  describe('main function', () => {
    test('should throw an error for a non-existing source directory', async () => {
      await expect(main('non/existing/path', 'dest/path')).rejects.toThrow();
    });
  });
});
