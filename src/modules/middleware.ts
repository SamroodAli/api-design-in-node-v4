import { Handler } from "express";
import { validationResult } from "express-validator";

export const handleInputErrors: Handler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
    return;
  }

  next();
};
