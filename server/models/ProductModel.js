import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true, 
    },
    category: {
        type: String,
        required: [true, "Product category is  a required"],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
        min: [0, "Quantity cannot be negative"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Price must be positive"],
    },
    inStock: {
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true, 
}
);

const Product = mongoose.model("Product", productSchema);
export default Product;
