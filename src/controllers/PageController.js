import { sideNavData /*, tasks, finishedTasks */ } from "../data/data.js";
import TaskItem from "../models/TaskItem.js";

const taskItems = await TaskItem.query();
export const home = (req, res) => {
  res.render("pages/home", {
    currentUrl: req.originalUrl,
    sideNavData,
    taskItems,
  });
};
