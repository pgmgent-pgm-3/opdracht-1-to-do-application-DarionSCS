import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();
import { create } from "express-handlebars";
import { PORT, VIEWS_PATH } from "./constants.js";
import { home } from "./controllers/PageController.js";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";
import {
  getInterest,
  getInterests,
  updateInterest,
  deleteInterest,
  createInterest,
} from "./controllers/InterestController.js";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./controllers/UserController.js";

const app = express();

app.use(express.static("public"));

// handlebars instanc
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
//interest routes
app.get("/api/interest/:id", getInterest);
app.get("/api/interest", getInterests);
app.post("/api/interest", createInterest);
app.delete("/api/interest/:id", deleteInterest);
app.put("/api/interest/:id", updateInterest);

//user routes
app.get("/api/users/:id", getUser);
app.get("/api/users", getUsers);
app.post("/api/users", createUser);
app.delete("/api/users/:id", deleteUser);
app.put("/api/users/:id", updateUser);
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
