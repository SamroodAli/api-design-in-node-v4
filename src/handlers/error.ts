import { ErrorRequestHandler } from "express";

// this function should take in four arguments, even the last argument is needed.
// that's how express knows this is the error handler. really weird if you ask me.
export const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  console.error(err);

  res.status(500);

  res.json({ message: "Oops! something went wrong" });
};
