const express = require('express');
const generateToken = require('../../utility/generateToken.js');
const downloadAndUnzipProxy = require('../../utility/getProxyBundle.js');
const formatLintReport = require('../../utility/formatLintReport.js');
const getLintReport = require('../../utility/getLintReport.js');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { proxyName, revision, orgName } = req.query;
    const accessToken = await generateToken();
    const path = await downloadAndUnzipProxy(
      orgName,
      proxyName,
      revision,
      accessToken
    );
    const lintResult = formatLintReport(
      orgName,
      proxyName,
      revision,
      await getLintReport("apiproxy", path + "/apiproxy")
    );

    fs.rmSync(path, { recursive: true, force: true });
    res.status(200).render("reportv2", {data :lintResult});
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;