import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
import { create } from "express-handlebars";
import { PORT, VIEWS_PATH } from "./constants.js";
import { home } from "./controllers/PageController.js";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";
import bodyParser from "body-parser";

import ContactValidation from "./middleware/validation/TaskValidation.js";
import AuthRegisterValidation from "./middleware/validation/AuthRegisterValidation.js";
import AuthLoginValidation from "./middleware/validation/AuthLoginValidation.js";
import * as AuthController from "./controllers/AuthController.js";
import { jwtAuth } from "./middleware/jwtAuth.js";
import authoriseUser from "./middleware/autorisation/AuthoriseUser.js";

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
app.use(cookieParser());

//page routes
app.get("/", jwtAuth, home);
app.post(
  "/tasks",
  jwtAuth,
  authoriseUser("admin"),
  ContactValidation,
  handlePost
);

// Auth routes
app.get("/login", AuthController.login);
app.get("/register", AuthController.register);

app.post(
  "/register",
  AuthRegisterValidation,
  AuthController.postRegister,
  AuthController.register
);

app.post(
  "/login",
  AuthLoginValidation,
  AuthController.postLogin,
  AuthController.login
);

//logout
app.get("/logout", AuthController.logout);

//test for mails
app.get("/testmail", getMails);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
