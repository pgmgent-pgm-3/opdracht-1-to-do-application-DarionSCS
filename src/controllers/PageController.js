import /*sideNavData , tasks, finishedTasks */ "../data/data.js";
import TaskItem from "../models/TaskItem.js";
import TaskCategory from "../models/TaskCategory.js";

export const home = async (req, res) => {
  const taskItems = await TaskItem.query();
  const taskCategories = await TaskCategory.query();
  res.render("pages/home", {
    currentUrl: req.originalUrl,
    taskItems,
    taskCategories,
  });
};
