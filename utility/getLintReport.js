const apigeelint = require('apigeelint');

module.exports = async function getLintReport(bundleType, path) {
  const configuration = {
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
  };
  const data = await apigeelint.bundleLinter.lint(configuration);
  return data.getReport();
};

