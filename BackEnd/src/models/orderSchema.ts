import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, quantity: { type: Number, default: 1 } }],
    totalAmount: { type: Number, required: true }
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);
export default Order