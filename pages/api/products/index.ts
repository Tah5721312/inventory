import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSessionServer } from "@/utils/auth";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSessionServer(req, res);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { method } = req;
  const userId = session.id;

  switch (method) {
    case "POST":
      try {
        const { name, sku, price, quantity, status, categoryId, supplierId } =
          req.body;

        // Check if SKU already exists
        const existingProduct = await prisma.product.findUnique({
          where: { sku },
        });

        if (existingProduct) {
          return res.status(400).json({ error: "SKU must be unique" });
        }

        const product = await prisma.product.create({
          data: {
            name,
            sku,
            price,
            quantity,
            status,
            userId,
            categoryId,
            supplierId,
          },
        });

        res.status(201).json(product);
      } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
      }
      break;

    case "GET":
      try {
        const products = await prisma.product.findMany({
          where: { userId },
          include: {
            category: true, // Include category relation
            supplier: true, // Include supplier relation
          },
        });

        // Transform category and supplier to strings
        const transformedProducts = products.map((product) => ({
          ...product,
          createdAt: product.createdAt.toISOString(), // Convert `createdAt` to ISO string
          category: product.category?.name || "Unknown", // Transform category to string
          supplier: product.supplier?.name || "Unknown", // Transform supplier to string
        }));

        console.log("Transformed Products:", transformedProducts); // Debugging log

        res.status(200).json(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
      }
      break;

    case "PUT":
      try {
        const {
          id,
          name,
          sku,
          price,
          quantity,
          status,
          categoryId,
          supplierId,
        } = req.body;

        const updatedProduct = await prisma.product.update({
          where: { id },
          data: {
            name,
            sku,
            price,
            quantity,
            status,
            categoryId,
            supplierId,
          },
        });

        res.status(200).json(updatedProduct);
      } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.body;

        await prisma.product.delete({
          where: { id },
        });

        res.status(204).end();
      } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
      }
      break;

    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
