import TaskItem from "../../models/TaskItem.js";

export const getTask = async (req, res, next) => {
  try {
    const task = await TaskItem.query().findById(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await TaskItem.query();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export async function createTask(req, res) {
  try {
    const task = await TaskItem.query().insert(req.body);
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const task = await TaskItem.query().findById(id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  try {
    await TaskItem.query().findById(id).patch(req.body);
    res.json({ message: "Task updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const task = await TaskItem.query().findById(id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  await TaskItem.query().deleteById(id);
  res.json({ message: "Task deleted" });
};
