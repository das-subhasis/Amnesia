import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Order from "../models/orderSchema";
import User from "../models/userSchema";

// @route   GET /api/orders
// @desc    Get all orders for the authenticated user
// @access  Private
const getOrders = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('user',"-password").populate('products.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500);
        throw new Error("Internal server error");
    }
});

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
const createOrder = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const { products, totalAmount } = req.body;
            let order = await Order.create({
                user: req.user._id,
                products: products,
                totalAmount: totalAmount
            });
            order = await order.populate('user', "-password");
            res.json(order);
    } catch (error: any) {
        console.error(error);
        throw new Error(error)
    }
});

// @route   DELETE /api/orders/remove
// @desc    Delete an order by ID
// @access  Private
const deleteOrder = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const order = await Order.findOneAndDelete({ "user": req.user._id }).select("-password");
        if (!order) {
            res.status(404);
            throw new Error("Order not found");
        }

        res.status(200).json({
            message: `Order ID: ${order._id} has been deleted successfully.`
        });
    } catch (error) {
        console.log(error);
        res.status(500);
        throw new Error("Internal server error.");
    }
});

export { getOrders, createOrder, deleteOrder};
