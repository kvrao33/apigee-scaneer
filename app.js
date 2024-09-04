import express from "express";
import path from "path";
import bodyParser from "body-parser";
import "dotenv/config";
import { fileURLToPath } from "url";
import apiBaseRouter from "./routes/baseRoute.js";
import openbrowser from "./utility/openbrowser.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use("/", apiBaseRouter);

const PORT = process.env.PORT || 3000;
if(process.env.ORG_Name){

  app.listen(PORT, () => {
    const URL=`http://localhost:${PORT}`
    console.log(`Server is running ${URL}`);
    openbrowser(URL)
  });
}else{
  console.log("Please set the Org Name in .env file");
  
}
