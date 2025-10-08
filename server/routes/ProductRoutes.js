
import express from "express";
import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    updateQuantity
} from "../controllers/ProductController.js";

const router = express.Router();

// Routes for /api/products
router.route("/")
    .get(getProducts)      // GET all products
    .post(createProduct);  // CREATE new product

// Routes for /api/products/:id
router.route("/:id")
    .get(getProduct)       // GET single product by ID
    .put(updateProduct)    // UPDATE product by ID
    .delete(deleteProduct); // DELETE product by ID

// Special route for quantity updates
router.patch("/:id/quantity", updateQuantity); // UPDATE product quantity

export default router;
