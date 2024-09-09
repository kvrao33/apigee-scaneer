const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const apiBaseRouter = require("./routes/baseRoute");
const openbrowser = require("./utility/openbrowser");
const logger = require("./utility/logger.js")

console.log(__dirname);
 // Equivalent to __dirname in CommonJS
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use("/", apiBaseRouter);

const PORT = process.env.PORT || 3003;
if(process.env.ORG_Name){

  app.listen(PORT, () => {
    const URL = `http://localhost:${PORT}`;
    logger.info("Tetsing")
    openbrowser(URL);
  });
}else{
  console.log("Please set the Org Name in .env file");
}
