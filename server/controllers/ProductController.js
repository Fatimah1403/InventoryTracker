import Product from "../models/ProductModel.js";

// create a new product
// @route   POST /api/products

export const createProduct = async (req, res) => {

    try {
        // Create product with data from request body
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            // message: "Invalid data",
            message: error.message
        })
    }
};

// Get all products
// @route   GET /api/products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}

// @desc    Update product
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        // Check if quantity is 0 and send email notification
        if (product.quantity === 0) {
            // We'll add email functionality later
            console.log("⚠️ Product out of stock:", product.name);
            product.inStock = false;
            await product.save();
        }
        
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Update failed",
            error: error.message
        });
    }
}

// @desc    Delete product
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Delete failed",
            error: error.message
        });
    }
};
// @desc    Update product quantity (for quick inventory updates)
// @route   PATCH /api/products/:id/quantity
export const updateQuantity = async (req, res) => {
    try {
        const { quantity } = req.body;
        if (quantity === undefined || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid quantity"

            });
        }
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        product.quantity = quantity;
        product.inStock = quantity > 0;

        await product.save();

        // Send email if out of stock
        if (quantity === 0) {
            console.log("📧 Sending out of stock email for:", product.name);
            // Emali logic will be added later
        }
        res.status(200).json({
            success: true,
            data: product
        });

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Update failed",
            error: error.message
        })
        
    }
}

