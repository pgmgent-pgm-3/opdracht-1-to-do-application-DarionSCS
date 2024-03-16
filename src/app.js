import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
import { create } from "express-handlebars";
import { PORT, VIEWS_PATH } from "./constants.js";
import { home } from "./controllers/PageController.js";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";
import bodyParser from "body-parser";

import ContactValidation from "./middleware/validation/TaskValidation.js";

import { handlePost } from "./controllers/api/TaskController.js";

import { getMails } from "./controllers/api/MailController.js";

const app = express();

app.use(express.static("public"));

// handlebars instance
const hbs = create({
  extname: ".hbs",
  defaultLayout: "main",
  helpers: HandlebarsHelpers,
});

// set handlebars as the view engine
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH); // location of the handlebars files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//page routes
app.get("/", home);
app.post("/tasks", ContactValidation, handlePost);

app.get("/testmail", getMails);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
