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
    .get(getProducts)      
    .post(createProduct);  

// Routes for /api/products/:id
router.route("/:id")
    .get(getProduct)       
    .put(updateProduct)    
    .delete(deleteProduct); 

// Special route for quantity updates
router.patch("/:id/quantity", updateQuantity); 

export default router;
