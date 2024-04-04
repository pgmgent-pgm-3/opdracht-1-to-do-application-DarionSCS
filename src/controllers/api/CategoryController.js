import Category from "../../models/TaskCategory.js";
import Task from "../../models/TaskItem.js";

export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.query().findById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.query();
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCategoryTasks = async (req, res, next) => {
  try {
    const taskItems = await Task.query().where("categoryId", req.params.id);
    const currentCategory = await Category.query().findById(req.params.id);
    const taskCategories = await Category.query();

    res.render("tasks", { taskItems, currentCategory, taskCategories });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export async function createCategory(req, res) {
  try {
    const category = await Category.query().insert(req.body);
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.query().findById(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  try {
    await Category.query().findById(id).patch(req.body);
    res.json({ message: "Category updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.query().findById(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  await Category.query().deleteById(id);
  res.json({ message: "Category deleted" });
};
