// import node modules
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

// import validations
import TaskValidation from "./middleware/validation/TaskValidation.js";
import CategoryValidation from "./middleware/validation/CategoryValidation.js";
import AuthRegisterValidation from "./middleware/validation/AuthRegisterValidation.js";
import AuthLoginValidation from "./middleware/validation/AuthLoginValidation.js";

// import auth scripts
import { jwtAuth } from "./middleware/jwtAuth.js";
import authoriseUser from "./middleware/autorisation/AuthoriseUser.js";

// import controllers
import * as AuthController from "./controllers/AuthController.js";
import { handlePostTask } from "./controllers/TaskController.js";
import { handlePostCategory } from "./controllers/CategoryController.js";
import { getMails } from "./controllers/MailController.js";

// import api controllers
import * as TaskController from "./controllers/api/TaskController.js";
import * as CategoryController from "./controllers/api/CategoryController.js";

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

/** Page Routes */
//home
app.get("/", jwtAuth, home);

//register page
app.post(
  "/register",
  AuthRegisterValidation,
  AuthController.postRegister,
  AuthController.register
);

//login page
app.post(
  "/login",
  AuthLoginValidation,
  AuthController.postLogin,
  AuthController.login
);

// task modifier route
app.post(
  "/tasks",
  jwtAuth,
  authoriseUser("admin"),
  TaskValidation,
  handlePostTask
);

// category adder route
app.post(
  "/categories",
  jwtAuth,
  authoriseUser("admin"),
  CategoryValidation,
  handlePostCategory
);
app.get("/categories/:id", CategoryController.getCategoryTasks);

// Auth routes
app.get("/login", AuthController.login);
app.get("/register", AuthController.register);

//logout
app.get("/logout", AuthController.logout);

/** test for mails
 * app.get("/testmail", getMails);
 */

/** API routes for categories */
//get all categories
app.get("/api/categories", CategoryController.getCategories);
//get category by ID
app.get("/api/categories/:id", CategoryController.getCategory);
//create category
app.post("/api/categories", CategoryController.createCategory);
//update category
app.put("/api/categories/:id", CategoryController.updateCategory);
//delete category
app.delete("/api/categories/:id", CategoryController.deleteCategory);

/** API routes for tasks */
//get all tasks
app.get("/api/tasks", TaskController.getTasks);
//get task by ID
app.get("/api/tasks/:id", TaskController.getTask);
//create task
app.post("/api/tasks", TaskController.createTask);
//update task
app.put("/api/tasks/:id", TaskController.updateTask);
//delete task
app.delete("/api/tasks/:id", TaskController.deleteTask);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
