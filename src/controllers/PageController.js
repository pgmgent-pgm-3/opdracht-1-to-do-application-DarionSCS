import { sideNavData, reminders, finishedReminders } from "../data/data.js";
import NavigationItem from "../models/NavigationItem.js";

const menuItems = await NavigationItem.query();
export const home = (req, res) => {
  res.render("pages/home", {
    currentUrl: req.originalUrl,
    sideNavData,
    reminders,
    finishedReminders,
  });
};
