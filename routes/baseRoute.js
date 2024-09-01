import express from "express";
import router from "./index/index.js";

const apiBaseRouter = express.Router();
// Exposed endpoints
apiBaseRouter.use("/",router)

export default apiBaseRouter;
