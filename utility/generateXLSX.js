const { fileURLToPath } = require('url');
const path = require('path');
const XLSX = require('xlsx');
const XLSXStyle = require('xlsx-style');


// Create __dirname equivalent in ES module


// Sample lintResults data (same as before)
const lintResults = {
  formattedArray: [
    {
      filePath:
        "https://console.cloud.google.com/apigee/proxies/hello-world/develop/2?project=third-octagon-427015-c4",
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      messages: [],
      name: "Bundle: cyber-sachet-gahp-integration-nonprod_rev76_2024_05_02",
    },
    {
      filePath:
        "https://console.cloud.google.com/apigee/proxies/hello-world/develop/2/proxy-endpoints/default?project=third-octagon-427015-c4",
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      messages: [],
      name: "Proxy-endpoint: default",
    },
    {
      filePath:
        "https://console.cloud.google.com/apigee/proxies/hello-world/develop/2/target-endpoints/combo-product?project=third-octagon-427015-c4",
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      messages: [],
      name: "Target-endpoint: combo-product",
    },
    {
      filePath:
        "https://console.cloud.google.com/apigee/proxies/hello-world/develop/2/target-endpoints/default?project=third-octagon-427015-c4",
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      messages: [],
      name: "Target-endpoint: default",
    },
    {
      filePath:
        "https://console.cloud.google.com/apigee/proxies/hello-world/develop/2/policies/AC-ipRistrict?project=third-octagon-427015-c4",
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      messages: [],
      name: "Policy: AC-ipRistrict",
    },
    {
      filePath:
        "https://console.cloud.google.com/apigee/proxies/hello-world/develop/2/policies/AM-setRequest?project=third-octagon-427015-c4",
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
      name: "Policy: AM-setRequest",
    },
    {
      filePath:
        "https://console.cloud.google.com/apigee/proxies/hello-world/develop/2/policies/FC-Cors?project=third-octagon-427015-c4",
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      messages: [],
      name: "Policy: FC-Cors",
    },
    {
      filePath:
        "https://console.cloud.google.com/apigee/proxies/hello-world/develop/2/policies/FC-aesDecryption?project=third-octagon-427015-c4",
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      messages: [],
      name: "Policy: FC-aesDecryption",
    },
    {
      filePath:
        "https://console.cloud.google.com/apigee/proxies/hello-world/develop/2/policies/FC-aesEncryption?project=third-octagon-427015-c4",
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      messages: [],
      name: "Policy: FC-aesEncryption",
    },
    {
      filePath:
        "https://console.cloud.google.com/apigee/proxies/hello-world/develop/2/policies/FC-messageLogging?project=third-octagon-427015-c4",
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      messages: [],
      name: "Policy: FC-messageLogging",
    },
    {
      filePath:
        "https://console.cloud.google.com/apigee/proxies/hello-world/develop/2/policies/FC-verifyJWTToken?project=third-octagon-427015-c4",
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      messages: [],
      name: "Policy: FC-verifyJWTToken",
    },
    {
      filePath:
        "https://console.cloud.google.com/apigee/proxies/hello-world/develop/2/policies/VK-verifyApiKey?project=third-octagon-427015-c4",
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
      name: "Policy: VK-verifyApiKey",
    },
    {
      filePath:
        "https://console.cloud.google.com/apigee/proxies/hello-world/develop/2/policies/Verify-API-Key-1?project=third-octagon-427015-c4",
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
      name: "Policy: Verify-API-Key-1",
    },
  ],
  apiProxyName: "hello-world",
  revisionNumber: 2,
};

function generatexls() {
  // Create a new workbook and worksheet using xlsx
  const workbook = XLSX.utils.book_new();
  const worksheetData = [];

  // Add the report title
  worksheetData.push([
    `Apigee Lint Report: Proxy Name - ${lintResults.apiProxyName}`,
  ]);

  // Add headers for each main section
  worksheetData.push(["Name", "", "Warning", "Error"]);

  // Iterate through formattedArray and add data
  lintResults.formattedArray.forEach((result, index1) => {
    // Add the name of the type with its warning and error count
    worksheetData.push([
      result.name,
      "",
      result.warningCount,
      result.errorCount,
    ]);

    // If there are any messages, add their details in a separate row
    if (result.messages.length > 0) {
      worksheetData.push(["Line: Column", "Message", "Rule ID", "Severity"]);

      result.messages.forEach((msg, index) => {
        const lineColumn =
          (msg.line !== undefined&&msg.line !== null&&msg.column !== undefined&&msg.column !== null)? `${msg.line}:${msg.column}` : "0:0";
        worksheetData.push([lineColumn, msg.message, msg.ruleId, msg.severity]);
      });
    }
  });
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Convert the worksheet data to a sheet using xlsx

  // Define styles
  const darkBorder = {
    top: { style: "thin", color: { rgb: "000000" } },
    bottom: { style: "thin", color: { rgb: "000000" } },
    left: { style: "thin", color: { rgb: "000000" } },
    right: { style: "thin", color: { rgb: "000000" } },
  };

  const blueBackground = { fgColor: { rgb: "4F81BD" } };
  const redBackground = { fgColor: { rgb: "FF0000" } };

  // Apply styles to merged cells (A1, B1, C1, D1)
  worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }]; // Merge A1, B1, C1, and D1
  //   worksheet["!merges"] = [{ s: { r: 1, c: 0 }, e: { r: 1, c: 1 } }];
  // Apply styles to the merged cell
  const mergedCellStyle = {
    font: { bold: true, sz: 12, color: { rgb: "000000" } },
    fill: { fgColor: { rgb: "FFFFFF" } },
    alignment: { horizontal: "center" },
    border: darkBorder,
  };

  applyStyleIfExists(worksheet, "A1", mergedCellStyle);

  // Apply styles to the header cells that are not merged
  ["A2", "B2", "C2", "D2"].forEach((cell) => {
    applyStyleIfExists(worksheet, cell, {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: blueBackground,
      alignment: { horizontal: "center" },
      border: darkBorder,
    });
  });

  // Apply styles to message fields
  worksheetData.forEach((row, rowIndex) => {
    if (row[0] === "Line: Column") {
      ["A", "B", "C", "D"].forEach((col) => {
        const cell = `${col}${rowIndex + 1}`;
        applyStyleIfExists(worksheet, cell, {
          border: darkBorder,
          fill: redBackground,
          font: { color: { rgb: "FFFFFF" } },
        });
      });
    } else {
      // Merge cells in columns A and B if conditions are met
      const firstCell = row[0];
      const isDigitColonDigit = /^\d+:\d+$/.test(firstCell); // Check for digit:digit format

      if (firstCell !== "Line: Column" && !isDigitColonDigit) {
        // Define the merge range for columns A and B
        worksheet["!merges"] = worksheet["!merges"] || [];
        worksheet["!merges"].push({
          s: { r: rowIndex + 1, c: 0 }, // Start cell (A of current row)
          e: { r: rowIndex + 1, c: 1 }, // End cell (B of current row)
        });

        // Apply styles to the merged cell (A of the current row)
        applyStyleIfExists(worksheet, `A${rowIndex + 1}`, {
          border: darkBorder
        });
      }
    }
  });

  // Append the styled worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Lint Report");

  // Create a file path and write the Excel file
  const filePath = path.join(__dirname, "lint_report.xlsx");
  XLSXStyle.writeFile(workbook, filePath);

  // Send the file as a response for download
  // res.download(filePath, 'lint_report.xlsx', (err) => {
  //     if (err) {
  //         console.error("Error sending file:", err);
  //     }
  // });
}

// Helper function to apply styles if the cell exists
function applyStyleIfExists(worksheet, cell, style) {
  if (worksheet[cell]) {
    worksheet[cell].s = style;
  }
}

module.exports = generatexls;
