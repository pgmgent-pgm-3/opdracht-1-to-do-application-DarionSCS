import { sideNavData, reminders, finishedReminders } from "../data/data.js";

export const home = (req, res) => {
  res.render("pages/home", {
    currentUrl: req.originalUrl,
    sideNavData,
    reminders,
    finishedReminders,
  });
};
