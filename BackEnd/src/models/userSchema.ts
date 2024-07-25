import mongoose, { mongo, Mongoose } from "mongoose"
import Product, { ProductSchema } from "./productSchema";

export interface ProductInterface {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    quantity: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserInterface {
    username: string;
    email: string;
    password: string;
    address: string;
    avatar: string;
    cart: { product: mongoose.Schema.Types.ObjectId; quantity: number }[];
    wishList: ProductInterface[];
}

const UserSchema = new mongoose.Schema<UserInterface>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/blackfroth/image/upload/v1720947664/free-user-icon-3296-thumb_tyhkuy.png"
    },
    cart: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, quantity: { type: Number, default: 1 } }],
    wishList: [ProductSchema]
}, {
    timestamps: true
});

const User = mongoose.model<UserInterface>("User", UserSchema);

export default User;