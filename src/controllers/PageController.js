import { sideNavData /*, tasks, finishedTasks */ } from "../data/data.js";
import TaskItem from "../models/TaskItem.js";

export const home = async (req, res) => {
  const taskItems = await TaskItem.query();
  res.render("pages/home", {
    currentUrl: req.originalUrl,
    sideNavData,
    taskItems,
  });
};
