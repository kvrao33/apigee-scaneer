import formatLintReport from "./utility/formatLintReport.js";



// Example usage:
const orgName = "third-octagon-427015-c4";
const lintResults = [
  {
    filePath:
      "/home/karthik/Downloads/cyber-sachet-gahp-integration-nonprod_rev76_2024_05_02/apiproxy",
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    messages: [],
  },
  {
    filePath:
      "/home/karthik/Downloads/cyber-sachet-gahp-integration-nonprod_rev76_2024_05_02/apiproxy/proxies/default.xml",
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    messages: [],
  },
  {
    filePath:
      "/home/karthik/Downloads/cyber-sachet-gahp-integration-nonprod_rev76_2024_05_02/apiproxy/targets/combo-product.xml",
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    messages: [],
  },
  {
    filePath:
      "/home/karthik/Downloads/cyber-sachet-gahp-integration-nonprod_rev76_2024_05_02/apiproxy/targets/default.xml",
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    messages: [],
  },
  {
    filePath:
      "/home/karthik/Downloads/cyber-sachet-gahp-integration-nonprod_rev76_2024_05_02/apiproxy/policies/AC-ipRistrict.xml",
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    messages: [],
  },
  {
    filePath:
      "/home/karthik/Downloads/cyber-sachet-gahp-integration-nonprod_rev76_2024_05_02/apiproxy/policies/AM-setRequest.xml",
    errorCount: 0,
    warningCount: 2,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    messages: [
      {
        message:
          "AM-setRequest is not attached to a Step in the bundle.  Remove unused policies.",
        ruleId: "BN005",
        severity: 1,
        nodeType: "Policy",
      },
      {
        message: "unnecessary AssignTo with no named message",
        line: 11,
        column: 3,
        ruleId: "PO012",
        severity: 1,
        nodeType: "AssignMessage",
      },
    ],
  },
  {
    filePath:
      "/home/karthik/Downloads/cyber-sachet-gahp-integration-nonprod_rev76_2024_05_02/apiproxy/policies/FC-Cors.xml",
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    messages: [],
  },
  {
    filePath:
      "/home/karthik/Downloads/cyber-sachet-gahp-integration-nonprod_rev76_2024_05_02/apiproxy/policies/FC-aesDecryption.xml",
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    messages: [],
  },
  {
    filePath:
      "/home/karthik/Downloads/cyber-sachet-gahp-integration-nonprod_rev76_2024_05_02/apiproxy/policies/FC-aesEncryption.xml",
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    messages: [],
  },
  {
    filePath:
      "/home/karthik/Downloads/cyber-sachet-gahp-integration-nonprod_rev76_2024_05_02/apiproxy/policies/FC-messageLogging.xml",
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    messages: [],
  },
  {
    filePath:
      "/home/karthik/Downloads/cyber-sachet-gahp-integration-nonprod_rev76_2024_05_02/apiproxy/policies/FC-verifyJWTToken.xml",
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    messages: [],
  },
  {
    filePath:
      "/home/karthik/Downloads/cyber-sachet-gahp-integration-nonprod_rev76_2024_05_02/apiproxy/policies/VK-verifyApiKey.xml",
    errorCount: 0,
    warningCount: 1,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    messages: [
      {
        line: 2,
        column: 59,
        message:
          'Non-standard name for policy (VK-verifyApiKey). Valid prefixes for the VerifyAPIKey policy: ["verifyapikey","apikey","va","verify"]. Valid patterns: ["^verifyapikey$"].',
        ruleId: "PO007",
        severity: 1,
        nodeType: "Policy",
      },
    ],
  },
  {
    filePath:
      "/home/karthik/Downloads/cyber-sachet-gahp-integration-nonprod_rev76_2024_05_02/apiproxy/policies/Verify-API-Key-1.xml",
    errorCount: 0,
    warningCount: 1,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    messages: [
      {
        line: 3,
        column: 3,
        message:
          'Filename "Verify-API-Key-1.xml" does not match policy display name "Verify API Key-1". To avoid confusion when working online and offline use the same name for files and display name in policies (excluding .xml extension).',
        ruleId: "PO008",
        severity: 1,
        nodeType: "Policy",
      },
    ],
  },
];

console.log(JSON.stringify(formatLintReport(orgName,"hello-world", 2,lintResults)));
