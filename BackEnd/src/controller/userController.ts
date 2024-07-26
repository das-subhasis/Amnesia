import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userSchema";
import Product from "../models/productSchema";

// @route   GET /api/user/
// @desc    Get user details
// @access  Private
export const getUser = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500);
        throw new Error("Failed to get user details.");
    }
});

// @route   POST /api/user/update
// @desc    Update user details
// @access  Private
export const updateUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    if (!data) {
        res.status(400)
        throw new Error("Invalid input.");
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $set: data },
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Internal server error.");
    }
});

// @route   POST /api/user/cart
// @desc    Update cart (add/update product in cart)
// @access  Private
export const updateCart = expressAsyncHandler(async (req: Request, res: Response) => {
    const { _id, quantity } = req.body;
    try {
        let user = await User.findOneAndUpdate(
            { _id: req.user._id, "cart.product": _id },
            { $set: { "cart.$.quantity": quantity } },
            { new: true }
        ).populate("cart.product").select("-password");

        if (!user) {
            user = await User.findOneAndUpdate(
                { _id: req.user._id },
                { $addToSet: { cart: { product: _id, quantity } } },
                { new: true }
            ).populate("cart.product").select("-password");
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500)
        throw new Error("Error updating cart.");
    }
});

// @route   POST /api/user/cart/remove
// @desc    Remove product from cart
// @access  Private
export const removeFromCart = expressAsyncHandler(async (req: Request, res: Response) => {
    const { _id } = req.body;
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found.");

        user.cart = user.cart.filter((p) => p.product.toString() !== _id);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { cart: user.cart } },
            { new: true }
        ).select("-password");

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Error removing from cart.");
    }
});

// @route   POST /api/user/wishlist
// @desc    Add product to wishlist
// @access  Private
export const updateWishList = expressAsyncHandler(async (req: Request, res: Response) => {
    const userId = req.user._id;
    const { _id } = req.body;

    try {
        const product = await Product.findById(_id);
        if (!product) {
            res.status(404);
            throw new Error("Product not found.");
        }

        const existingWishlist = await User.findOne(
            { _id: userId, "cart._id": _id }
        ).select("-password");

        if (!existingWishlist) {
            const wishlist = await User.findOneAndUpdate(
                { _id: req.user._id },
                { $addToSet: { wishList: product } },
                { new: true }
            ).populate("cart.product").select("-password");
            res.json(wishlist?.cart);
        }
        res.json(existingWishlist?.cart);
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Error updating wish list.");
    }
});

// @route   POST /api/user/wishlist/remove
// @desc    Remove product from wishlist
// @access  Private
export const removeFromWishList = expressAsyncHandler(async (req: Request, res: Response) => {
    const { _id } = req.body;
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found.")

        user.wishList = user.wishList.filter((p) => p._id.toString() !== _id);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { wishList: user.wishList } },
            { new: true }
        ).select("-password");

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Error removing from wish list.");
    }
});
