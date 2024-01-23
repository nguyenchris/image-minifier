const {
  formatBytes,
  calculateReductionPercentage,
} = require('../src/sizeUtils');

describe('sizeUtils', () => {
  describe('formatBytes', () => {
    test('should correctly format bytes to readable format', () => {
      expect(formatBytes(1024)).toBe('1.00 KB');
      expect(formatBytes(1234)).toBe('1.21 KB');
      expect(formatBytes(123456789)).toBe('117.74 MB');
    });
  });

  describe('calculateReductionPercentage', () => {
    test('should correctly calculate reduction percentage', () => {
      expect(calculateReductionPercentage(1000, 500)).toBe('50.00');
      expect(calculateReductionPercentage(1000, 0)).toBe('100.00');
      expect(calculateReductionPercentage(1000, 1000)).toBe('0.00');
    });
  });
});
