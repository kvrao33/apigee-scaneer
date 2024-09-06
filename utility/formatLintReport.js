function formatLintReport(orgName, apiProxyName, revisionNumber, jsonArray) {
  const getApigeeUrl = (filePath) => {
    const baseUrl = `https://console.cloud.google.com/apigee/proxies/${apiProxyName}/develop/${revisionNumber}`;

    if (filePath.includes("/proxies/")) {
      const proxyEndpointName = filePath.split("/").pop().replace(".xml", "");
      return `${baseUrl}/proxy-endpoints/${proxyEndpointName}?project=${orgName}`;
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

  const getName = (filePath) => {
    if (filePath.includes("/proxies/")) {
      const proxyEndpointName = filePath.split("/").pop().replace(".xml", "");
      return `Proxy-endpoint: ${proxyEndpointName}`;
    } else if (filePath.includes("/targets/")) {
      const targetName = filePath.split("/").pop().replace(".xml", "");
      return `Target-endpoint: ${targetName}`;
    } else if (filePath.includes("/policies/")) {
      const policyName = filePath.split("/").pop().replace(".xml", "");
      return `Policy: ${policyName}`;
    } else if (filePath.includes("/resources/jsc/")) {
      const resourceName = filePath.split("/").pop();
      return `Resource: ${resourceName}`;
    } else if (filePath.includes("apiproxy")) {
      return `Bundle: ${filePath.split("/").slice(-2, -1)[0]}`;
    } else {
      return `Other: ${filePath}`;
    }
  };

  let totalErrorCount = 0;
  let totalWarningCount = 0;
  const formattedArray = jsonArray.map((item) => {
    totalErrorCount += item.errorCount;
    totalWarningCount += item.warningCount;
    item.name = getName(item.filePath);
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

module.exports = formatLintReport;