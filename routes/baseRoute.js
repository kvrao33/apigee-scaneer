import express from "express";
import indexRouter from "./index/route.js";
import getReportRouter from "./get-report/route.js";
import getProxiesRouter from "./proxies/route.js";
const apiBaseRouter = express.Router();
// Exposed endpoints
console.log("Base route");
apiBaseRouter.use("/",indexRouter)
apiBaseRouter.use('/proxies',getProxiesRouter)
apiBaseRouter.use("/get-report",getReportRouter)

export default apiBaseRouter;
