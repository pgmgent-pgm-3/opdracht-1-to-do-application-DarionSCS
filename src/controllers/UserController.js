import User from "../models/User.js";

export const getUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.query().findById(id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
};
export const getUsers = async (req, res, next) => {
  const users = await User.query();
  res.json(users);
};
export const createUser = async (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const user = await User.query().insert({
    firstname,
    lastname,
  });

  res.status(201).json("user created" + user);
};
export const updateUser = async (req, res, next) => {};
export const deleteUser = async (req, res, next) => {};
