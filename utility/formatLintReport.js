function formatLintReport(orgName, apiProxyName, revisionNumber, jsonArray) {
  // const revisionNumber = 1; // Replace with the actual revision number if needed
  const getApigeeUrl = (filePath) => {
    const baseUrl = `https://console.cloud.google.com/apigee/proxies/${apiProxyName}/develop/${revisionNumber}`;

    if (filePath.includes("/proxies/")) {
      return `${baseUrl}/proxy-endpoints/default?project=${orgName}`;
    } else if (filePath.includes("/targets/")) {
      const targetName = filePath.split("/").pop().replace(".xml", "");
      return `${baseUrl}/target-endpoints/${targetName}?project=${orgName}`;
    } else if (filePath.includes("/policies/")) {
      const policyName = filePath.split("/").pop().replace(".xml", "");
      return `${baseUrl}/policies/${policyName}?project=${orgName}`;
    } else if (filePath.includes("/resources/jsc/")) {
      const resourceName = filePath.split("/").pop();
      return `${baseUrl}/resources/jsc/${resourceName}?project=${orgName}`;
    } else {
      return `${baseUrl}?project=${orgName}`;
    }
  };
  let totalErrorCount = 0;
  let totalWarningCount = 0;
  const formattedArray = jsonArray.map((item) => {
    totalErrorCount += item.errorCount;
    totalWarningCount += item.warningCount;
    item.filePath = getApigeeUrl(item.filePath);
    return item;
  });

  return {
    formattedArray,
    totalErrorCount,
    totalWarningCount,
    apiProxyName,
    revisionNumber,
  };
}

export default formatLintReport;
