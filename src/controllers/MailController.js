import MailTransporter from "../lib/MailTransporter.js";
import TaskItem from "../models/TaskItem.js";

//mails all tasks to the user
export const getMails = async (req, res, next) => {
  try {
    const tasks = await TaskItem.query();
    MailTransporter.sendMail({
      from: "georgette@pgm.be",
      to: req.query.mail,
      subject: "You have requested your tasks by mail!",
      template: "mailTemplateForTasks",
      context: {
        title: "These are all your tasks:",
        message: tasks.length + " tasks",
        tasks: tasks,
      },
    });
  } catch (error) {
    res.send("Error sending mail: " + error.message);
  }
  res.redirect("/");
};

export const taskCreatedMail = async (req, res, next, addedTaskId) => {
  try {
    const task = await TaskItem.query().findById(addedTaskId);

    try { 
      await MailTransporter.sendMail({
        from: "georgette@pgm.be",
        to: "test@gmail.be",
        subject: "You have added a task!",
        template: "mailTemplateForTask",
        context: {
          title: "The new task you've added:",
          message: "1 tasks",
          task: task,
        },
      });
    } catch (error) {
      console.error("Error sending mail: ", error.message); // if node mailer server is not running, then site wont crash when adding tasks
    }

    res.redirect("/");
  } catch (error) {
    res.send("Error sending mail: " + error.message);
  }
};
