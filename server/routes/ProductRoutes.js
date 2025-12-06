import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    updateQuantity
} from "../controllers/ProductController.js";

const router = express.Router();

// /api/products
router.route("/")
    .get(
        protect,
        authorize("admin", "manager", "viewer"),
        getProducts
    )
    .post(
        protect,
        authorize("admin", "manager"),
        createProduct
    );

// /api/products/:id
router.route("/:id")
    .get(
        protect,
        authorize("admin", "manager", "viewer"),
        getProduct
    )
    .put(
        protect,
        authorize("admin", "manager"),
        updateProduct
    )
    .delete(
        protect,
        authorize("admin"),
        deleteProduct
    );

// Quantity update
router.patch(
    "/:id/quantity",
    protect,
    authorize("admin", "manager"),
    updateQuantity
);

export default router;
