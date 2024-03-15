import TaskItem from "../../models/TaskItem.js";

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
  const { title } = req.body;
  const categoryId = parseInt(req.body.categoryId);
  const task = await TaskItem.query().insert({ title, categoryId });
  res.redirect("/");
};

//update
export const updateTask = async (req, res, next) => {
  const { id } = req.body;
  console.log(req.body.is_done);
  const task = await TaskItem.query().patchAndFetchById(id, {
    title: req.body.title,
    is_done: parseInt(req.body.is_done) === 1 ? true : false,
    categoryId: parseInt(req.body.categoryId),
  });
  res.redirect("/");
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

export const handlePost = async (req, res) => {
  const method = req.body.method;
  const id = req.body.id;
  if (method == "POST") {
    createTask(req, res);
  }
  if (method == "PUT") {
    updateTask(req, res);
  }
  if (method == "DELETE") {
    deleteTask(req, res);
  }
};
