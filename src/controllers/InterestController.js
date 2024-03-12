import Interest from "../models/Interest.js";

export const getInterest = async (req, res, next) => {
  const id = req.params.id;
  const interest = await Interest.query().findById(id);
  if (!interest) {
    res.status(404).json({ message: "Interest not found" });
    return;
  }
  res.json(interest);
};

export const getInterests = async (req, res, next) => {
  const interests = await Interest.query().orderBy("priority", "DESC");
  res.json(interests);
};

export const createInterest = async (req, res, next) => {
  const name = req.body.name;
  const priority = req.body.priority || 1;
  const interest = await Interest.query().insert({
    name,
    priority,
  });

  res.status(201).json("interest created" + interest);
};

export const updateInterest = async (req, res, next) => {
  const body = req.body;
  const id = req.body.id;
  if (!id) {
    res.status(400).json({ message: "Id is required" });
    return;
  }
  const interest = await Interest.query().patchAndFetchById(body.id, body);

  if (!interest) {
    res.status(404).json({ message: "Interest not found" });
    return;
  }
  res.json(interest);
};

export const deleteInterest = async (req, res, next) => {
  const id = req.params.id;
  const interest = await Interest.query().deleteById(id);
  if (!interest) {
    res.status(404).json({ message: "Interest not found" });
    return;
  }
  res.json({ message: "Interest deleted" });
};
