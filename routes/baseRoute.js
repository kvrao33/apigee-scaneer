const express = require('express');
const indexRouter = require('./index/route.js');
const getReportRouter = require('./get-report/route.js');
const getProxiesRouter = require('./proxies/route.js');
const apiBaseRouter = express.Router();
// Exposed endpoints
apiBaseRouter.use("/",indexRouter)
apiBaseRouter.use('/proxies',getProxiesRouter)
apiBaseRouter.use("/get-report",getReportRouter)

module.exports = apiBaseRouter;