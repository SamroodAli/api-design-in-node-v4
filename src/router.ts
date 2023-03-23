import { ErrorRequestHandler, Router } from "express";
import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

/**
 * Product
 */

router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.post(
  "/product",
  body("name").isString().isLength({ min: 2 }),
  handleInputErrors,
  createProduct
);

router.put(
  "/product/:id",
  body("name").isString().isLength({ min: 2 }),
  handleInputErrors,
  updateProduct
);

router.delete("/product/:id", deleteProduct);

/**
 * update
 */
router.get("/update", getUpdates);

router.get("/update/:id", getOneUpdate);

router.post(
  "/update",
  body("title").isString(),
  body("body").isString(),
  body("productId").isString(),
  handleInputErrors,
  createUpdate
);

router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("version").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  handleInputErrors,
  updateUpdate
);

router.delete("/update/:id", deleteUpdate);

/**
 * Update Point
 */
router.get("/update-point", (req, res) => {});
router.get("/update-point/:id", (req, res) => {});
router.post(
  "/update-point",

  body("name").isString(),
  body("description").isString(),
  body("updateId").isString(),
  handleInputErrors,

  (req, res) => {}
);

router.put(
  "/update-point/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputErrors,
  (req, res) => {}
);

router.delete("/update-point/:id", (req, res) => {});

// you can have router level error handling
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  // return res.json({ message: "oops! router" }); //either handle it here
  next(err); // bubble it up to the next error handler ( typically the app level error handling)
};

router.use(errorHandler);

export default router;
