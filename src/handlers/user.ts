import { Handler } from "express";
import { prisma } from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser: Handler = async (req, res) => {
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

  const user = await prisma.user.create({
    data: {
      username: payload.username,
      password: await hashPassword(payload.password),
    },
  });

  const token = createJWT(user);

  res.json({ token });
};

export const signIn: Handler = async (req, res) => {
  const payload = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username: payload.username,
    },
  });

  const isValid = await comparePassword(payload.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "invalid username/password" });

    return;
  }

  const token = await createJWT(user);

  res.status(200);

  res.json({ token });
};
