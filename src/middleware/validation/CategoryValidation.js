import { body } from "express-validator";

export default [
  body("name").notEmpty().isString().bail().isLength({ min: 2, max: 20 }),
];
