import { ErrorRequestHandler } from "express";

// this function should take in four arguments, even the last argument is needed.
// that's how express knows this is the error handler. really weird if you ask me.
export const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  console.error(err);

  if (err.type === "auth") {
    return res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    return res.status(400).json({ message: "invalid input" });
  } else {
    return res
      .status(500)
      .json({ message: "Oops! something went wrong. This is on us" });
  }
};

process.on("uncaughtException", (error) => {
  console.error("uncaught Exception handled", error);
});

process.on("unhandledRejection", (error) => {
  console.error("unhandled rejection handled", error);
});
