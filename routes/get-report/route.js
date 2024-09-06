// routes/index.js
import express from "express";
import generateToken from "../../utility/generateToken.js";
import downloadAndUnzipProxy from "../../utility/getProxyBundle.js";
import formatLintReport from "../../utility/formatLintReport.js";
import getLintReport from "../../utility/getLintReport.js";
import fs from "fs";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { proxyName, revision, orgName } = req.query;
    const accessToken = await generateToken();
    // Make the API call with the access token
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
    res.render("reportv2", {data :lintResult});
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export default router;
