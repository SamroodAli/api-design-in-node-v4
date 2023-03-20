import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Handler, NextFunction } from "express";

export const createJWT = (user: User): string => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    <string>process.env.JWT_SECRET
  );

  return token;
};

export const protect: Handler = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "invalid authorization token" });
    return;
  }

  try {
    const user = jwt.verify(token, <string>process.env.JWT_SECRET) as Pick<
      User,
      "id" | "username"
    >;

    req.user = user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }
};
