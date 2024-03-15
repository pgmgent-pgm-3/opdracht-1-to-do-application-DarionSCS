import TaskCategory from "../../models/TaskCategory.js";

export const getCategories = async (req, res, next) => {
  const categories = await TaskCategory.query();
  res.json(categories);
};
export const getCategory = async (req, res, next) => {
  const { id } = req.params;
  const category = await TaskCategory.query().findById(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(category);
};
export const createCategory = async (req, res, next) => {
  const { name, description } = req.body;
  const category = await TaskCategory.query().insert({ name, description });
  res.status(201).json(category);
};
export const updateCategory = async (req, res, next) => {
  const body = req.body;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Category id not found" });
  }
  const category = await TaskCategory.query().patchAndFetchById(body.id, body);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(category);
};
export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Category id not found" });
  }
  const category = await TaskCategory.query().deleteById(id);
};
