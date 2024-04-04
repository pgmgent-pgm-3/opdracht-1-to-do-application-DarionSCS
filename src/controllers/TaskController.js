import TaskItem from "../models/TaskItem.js";
import { taskCreatedMail } from "../controllers/MailController.js";
import { validationResult } from "express-validator";

//middleware
export const postContact = async (req, res, next) => {
  // check errors and show in browser
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.formErrorFields = {};

    errors.array().forEach((error) => {
      req.formErrorFields[error.path] = error.msg;
    });
    console.log(errors);
    return false;
  }
  return true;
};

//get all tasks
export const getTasks = async (req, res, next) => {
  const tasks = await TaskItem.query();
  res.json(tasks);
};

//get task by ID
export const getTask = async (req, res, next) => {
  const { id } = req.body;
  const task = await TaskItem.query().findById(id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
};

//create
export const createTask = async (req, res, next) => {
  if (!(await postContact(req, res, next))) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: req.formErrorFields });
  }
  const { title } = req.body;
  const categoryId = parseInt(req.body.categoryId);
  const task = await TaskItem.query().insert({ title, categoryId });
  taskCreatedMail(req, res, next, task.id);
};

//update
export const updateTask = async (req, res, next) => {
  if (!(await postContact(req, res, next))) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: req.formErrorFields });
  }
  const { id } = req.body;
  const task = await TaskItem.query().patchAndFetchById(id, {
    title: req.body.title,
    is_done: parseInt(req.body.is_done) === 1 ? true : false,
    categoryId: parseInt(req.body.categoryId),
  });
};

//delete
export const deleteTask = async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Task id not found" });
  }
  const task = await TaskItem.query().deleteById(id);
  res.redirect("/");
};

//handle post
export const handlePostTask = async (req, res, next) => {
  const method = req.body.method;
  const id = req.body.id;
  if (method == "POST") {
    createTask(req, res, next);
  }
  if (method == "PUT") {
    updateTask(req, res, next);
  }
  if (method == "DELETE") {
    deleteTask(req, res, next);
  }
};
