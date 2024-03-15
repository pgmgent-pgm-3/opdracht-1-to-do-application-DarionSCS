import { body } from "express-validator";

export default [
  body("title").notEmpty().isString().bail().isLength({ min: 3, max: 50 }),
  body("categoryId").isNumeric().bail().isInt({ min: 1 }),
];
