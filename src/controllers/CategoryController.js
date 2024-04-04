import TaskCategory from "../models/TaskCategory.js";

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
  await TaskCategory.query().insert({ name, description });
  res.redirect("/");
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
  res.redirect("/");
};
export const deleteCategory = async (req, res, next) => {
  const { id } = req.body;
  console.log(id);
  if (!id) {
    return res.status(400).json({ message: "Category id not found" });
  }
  const category = await TaskCategory.query().deleteById(id);
  res.redirect("/");
};

export const handlePostCategory = async (req, res, next) => {
  const method = req.body.method;
  const id = req.body.id;
  if (method == "POST") {
    createCategory(req, res, next);
  }
  if (method == "PUT") {
    updateCategory(req, res, next);
  }
  if (method == "DELETE") {
    deleteCategory(req, res, next);
  }
};
