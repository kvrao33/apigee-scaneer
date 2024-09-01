import express from "express";
import indexRouter from "./index/route.js";
import getReportRouter from "./get-report/route.js";
const apiBaseRouter = express.Router();
// Exposed endpoints
apiBaseRouter.use("/",indexRouter)
apiBaseRouter.use("/get-report",getReportRouter)

export default apiBaseRouter;
