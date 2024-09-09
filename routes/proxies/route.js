const express = require("express");
const axios = require("axios");
const generateToken = require("../../utility/generateToken.js");
const getProxyList = require("../../utility/getProxyList.js");
const logger = require("../../utility/logger.js");

const router = express.Router();
router.post("/", async (req, res) => {
  try {
      logger.info("Api endpoint Get /proxies")
      const orgName = req.body.organization;
      const proxies = await getProxyList(orgName);

    res.render("proxies", { proxies, orgName });
    // res.redirect(`/next-page?org=${selectedOrg}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
