// routes/index.js
import express from "express";
import axios from "axios";
import generateToken from "../../utility/generateToken.js";
import downloadAndUnzipProxy from "../../utility/getProxyBundle.js";
import formatLintReport from "../../utility/formatLintReport.js";
import getLintReport from "../../utility/getLintReport.js";
import fs from "fs";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { proxyName, revision } = req.query;
    const accessToken = await generateToken();
    const orgName = "third-octagon-427015-c4";
    // Make the API call with the access token
    const path = await downloadAndUnzipProxy(
      "third-octagon-427015-c4",
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
    res.render("report", lintResult);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export default router;
