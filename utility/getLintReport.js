import apigeelint from "apigeelint";

export default async function getLintReport(bundleType, path) {
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
    profile: "apigee",
    formatter: "json.js",
    output: "none",
  };
  const data = await apigeelint.bundleLinter.lint(configuration);
  return data.getReport();
}

