import { Router } from "express";

const router = Router();

/**
 * Product
 */

router.get("/product", (req, res) => {
  res.json({ message: "Hello" });
});
router.get("/product/:id", (req, res) => {});
router.post("/product", (req, res) => {});
router.put("/product/:id", (req, res) => {});
router.delete("/product/:id", (req, res) => {});

/**
 * update
 */
router.get("/update", (req, res) => {});
router.get("/update/:id", (req, res) => {});
router.post("/update", (req, res) => {});
router.put("/update/:id", (req, res) => {});
router.delete("/update/:id", (req, res) => {});

/**
 * Update Point
 */
router.get("/update-point", (req, res) => {});
router.get("/update-point/:id", (req, res) => {});
router.post("/update-point", (req, res) => {});
router.put("/update-point/:id", (req, res) => {});
router.delete("/update-point/:id", (req, res) => {});

export default router;
