import { Handler } from "express";
import { prisma } from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser: Handler = async (req, res, next) => {
  const payload = req.body;

  {
    const user = await prisma.user.findUnique({
      where: {
        username: payload.username,
      },
    });

    if (user) {
      res.status(400);
      res.json({ message: "user already exists" });
      return;
    }
  }

  try {
    const user = await prisma.user.create({
      data: {
        username: payload.username,
        password: await hashPassword(payload.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    err.type = "input"; // refactor this to an error service, this is just an example

    next(err);
  }
};

export const signIn: Handler = async (req, res) => {
  const payload = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username: payload.username,
    },
  });

  if (!user) {
    res.status(404);
    res.json({ message: "invalid username/password" });
    return;
  }

  const isValid = await comparePassword(payload.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "invalid username/password" });

    return;
  }

  const token = createJWT(user);

  res.status(200);

  res.json({ token });
};
