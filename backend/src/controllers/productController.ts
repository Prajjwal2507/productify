import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export async function getAllProducts(req: Request, res: Response) {
    try {
        const products = await queries.getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error occurred while fetching products:", error);
        return res.status(500).json({ message: "Internal Server Error , failed to fetch products" });
    }
}

// GET products by current user(protected route)
export async function getMyProducts(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const products = await queries.getProductsByUserId(userId);
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error occurred while fetching my products:", error);
        return res.status(500).json({ message: "Internal Server Error , failed to fetch user products" });
    }
}

// GET single product by id
type Params = {
    id: string;
};

export async function getProductById(
    req: Request<Params>,
    res: Response
) {
    try {
        const { id } = req.params;
        const product = await queries.getProductById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        return res.status(200).json(product);
    } catch (error) {
        console.error("Error occurred while fetching product:", error);
        return res.status(500).json({ message: "Internal Server Error , failed to fetch product" });
    }
}


// create product (protected route)

type CreateProductBody = {
    title: string;
    description: string;
    imageUrl: string;
};
export async function createProduct(req: Request<{}, {}, CreateProductBody>, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const { title, description, imageUrl } = req.body;
        if (!title || !description || !imageUrl) return res.status(400).json({ message: "Title, description and image URL are required" });
        const product = await queries.createProduct({ userId, title, description, imageUrl });
        return res.status(201).json(product);
    } catch (error) {
        console.error("Error occurred while creating product:", error);
        return res.status(500).json({ message: "Internal Server Error , failed to create product" });
    }
}

// Update product (protected - owner only)
export const updateProduct = async (req: Request<Params>, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    // Check if product exists and belongs to user
    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    if (existingProduct.userId !== userId) {
      res.status(403).json({ error: "You can only update your own products" });
      return;
    }

    const product = await queries.updateProduct(id, {
      title,
      description,
      imageUrl,
    });

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete product (protected - owner only)
export const deleteProduct = async (req: Request<Params>, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;

    // Check if product exists and belongs to user
    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    if (existingProduct.userId !== userId) {
      res.status(403).json({ error: "You can only delete your own products" });
      return;
    }

    await queries.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};