import { Handler } from "express";
import { prisma } from "../db";

export const getUpdates: Handler = async (req, res) => {
  const updates = await prisma.update.findMany({
    where: {
      product: {
        belongsToId: req.user.id,
      },
    },
  });

  res.json({ data: updates });
};

export const getOneUpdate: Handler = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!update) {
    res.status(404);
    res.json({ message: "not found" });
    return;
  }

  res.status(200);
  res.json({ data: update });
};

export const createUpdate: Handler = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: req.body.productId,
        belongsToId: req.user.id,
      },
    },
  });

  if (!product) {
    res.status(404);
    res.json({ message: "not found" });
    return;
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: {
        connect: {
          id: product.id,
        },
      },
    },
  });

  res.status(200);
  res.json({ data: update });
};

export const updateUpdate: Handler = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      product: true,
    },
  });

  if (update.product.belongsToId !== req.user.id) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: {
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      version: req.body.version,
    },
  });

  res.status(200);
  res.json({ data: updatedUpdate });
};

export const deleteUpdate: Handler = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      product: true,
    },
  });

  if (update.product.belongsToId !== req.user.id) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200);

  res.json({ data: deletedUpdate });
};
