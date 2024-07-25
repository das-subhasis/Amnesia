import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    description: { type: String },
    category: { type: String, required: true },
    price: { type: Number, required: true, },
    quantity: { type: Number },
    imageUrl: { type: String, default: "https://res.cloudinary.com/dkzcmb58n/image/upload/v1720947354/image-not-found_cb2fey.jpg" },
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);
export default Product