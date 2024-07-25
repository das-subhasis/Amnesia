import { Router } from "express";
import {
    updateCart,
    updateWishList,
    // getWishList,
    getUser,
    updateUser,
    removeFromCart,
    removeFromWishList
} from "../controller/userController";
import authenticate from "../middlewares/authMiddleware";

const user = Router();

user.get("/", authenticate, getUser);

user.post("/update", authenticate, updateUser);

user.post("/cart", authenticate, updateCart);

user.post("/cart/remove", authenticate, removeFromCart);

user.post("/wishlist", authenticate, updateWishList);

user.post("/wishlist/remove", authenticate, removeFromWishList);


export default user;
