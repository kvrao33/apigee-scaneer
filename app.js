const express = require("express");
const expressContext = require("@niveus/express-context");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const apiBaseRouter = require("./routes/baseRoute");
const { expressReqid } =require("@niveus/express-reqid") ;
const openbrowser = require("./utility/openbrowser");
const logger = require("./utility/logger.js");

// Equivalent to __dirname in CommonJS
const app = express();
app.use(express.json());
app.use(expressContext.expressContextMiddleware());

const reqidOptions = {
  idPrefix: process.env.SERVICE_NAME || "service-name",
  setInContext: true,
};

app.use(expressReqid(reqidOptions));

// Add request properties to context.
app.use((req, res, next) => {
  const reqPath = req.path;

  expressContext.setMany({ reqPath });

  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use("/", apiBaseRouter);
const PORT = process.env.PORT || 3003;
if (process.env.ORG_Name) {
  app.listen(PORT, () => {
    const URL = `http://localhost:${PORT}`;
    logger.info(`Server is running on : ${URL}`);
    openbrowser(URL);
  });
} else {
  logger.error("Please setup a gcloud SDK in your system");
}
