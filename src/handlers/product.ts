import { Handler } from "express";
import { prisma } from "../db";

// Get all
export const getProducts: Handler = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.status(200);

  res.json({
    data: user.products,
  });
};

// Get one
export const getOneProduct: Handler = async (req, res) => {
  const productId = req.params.id;

  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: productId,
        belongsToId: req.user.id,
      },
    },
  });

  if (!product) {
    res.status(404);
    res.json({ message: "product not found" });
  }

  res.status(200);
  res.json({ data: product });
};

// create a product
export const createProduct: Handler = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsTo: {
        connect: {
          id: req.user.id,
        },
      },
    },
  });

  res.status(201);
  res.json({ data: product });
};

export const updateProduct: Handler = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  if (!updateProduct) {
    res.status(404);
    res.json({ message: "product not found" });
  }

  res.status(200);

  res.json({ data: updated });
};

export const deleteProduct: Handler = async (req, res) => {
  const deletedProduct = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  });

  if (!deleteProduct) {
    res.status(404);
    res.json({ message: "product not found" });
  }

  res.status(200);
  res.json({ data: deletedProduct });
};
