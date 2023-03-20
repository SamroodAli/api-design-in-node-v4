import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

/**
 * Product
 */

router.get("/product", (req, res) => {
  res.json({ message: "Hello" });
});

router.get("/product/:id", (req, res) => {});

router.post(
  "/product",
  body("name").isString().isLength({ min: 2 }),
  handleInputErrors,
  (req, res) => {}
);

router.put(
  "/product/:id",
  body("name").isString().isLength({ min: 2 }),
  handleInputErrors,
  (req, res) => {}
);

router.delete("/product/:id", (req, res) => {});

/**
 * update
 */
router.get("/update", (req, res) => {});

router.get("/update/:id", (req, res) => {});

router.post(
  "/update",
  body("title").isString(),
  body("body").isString(),
  handleInputErrors,
  (req, res) => {}
);

router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("version").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  handleInputErrors,
  (req, res) => {}
);

router.delete("/update/:id", (req, res) => {});

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

export default router;
