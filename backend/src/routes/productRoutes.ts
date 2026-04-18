import { Router } from "express";
import * as productController from "../controllers/productController";
import { requireAuth } from "@clerk/express";
const router = Router();

// GET /api/products - Get all products (public route)
router.get("/" , productController.getAllProducts);

// GET /api/products/my - Get products of current user (protected route)
router.get("/my" ,requireAuth(), productController.getMyProducts);

// GET /api/products/:id - Get single product by id(public route)
router.get("/:id" , requireAuth(), productController.getProductById);

// POST /api/products - Create new product (protected route)
router.post("/", requireAuth(), productController.createProduct);

// PUT /api/products/:id - Update product (protected - owner only)
router.put("/:id", requireAuth(), productController.updateProduct);

// DELETE /api/products/:id - Delete product (protected - owner only)
router.delete("/:id", requireAuth(), productController.deleteProduct);

export default router;