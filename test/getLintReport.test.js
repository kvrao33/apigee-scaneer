// getLintReport.test.js
const apigeelint = require('apigeelint');
const getLintReport = require('../utility/getLintReport');

jest.mock('apigeelint');

describe('getLintReport', () => {
  const bundleType = 'apiproxy';
  const path = '/path/to/bundle';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return the lint report successfully', async () => {
    const mockLintResult = {
      getReport: jest.fn().mockReturnValue('mock-lint-report'),
    };

    apigeelint.bundleLinter.lint.mockResolvedValue(mockLintResult);

    const result = await getLintReport(bundleType, path);

    expect(apigeelint.bundleLinter.lint).toHaveBeenCalledWith({
      debug: true,
      source: {
        type: "filesystem",
        path,
        bundleType,
      },
      externalPluginsDirectory: undefined,
      excluded: {},
      maxWarnings: -1,
      profile: "apigeex",
      formatter: "json.js",
      output: "none",
    });

    expect(mockLintResult.getReport).toHaveBeenCalled();
    expect(result).toBe('mock-lint-report');
  });

  test('should handle errors gracefully', async () => {
    apigeelint.bundleLinter.lint.mockRejectedValue(new Error('Linting failed'));

    await expect(getLintReport(bundleType, path)).rejects.toThrow('Linting failed');
  });
});
