import React, { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useAuthContext } from "./authContext";
import WishList from "../pages/WishList/WishList";
import productReducer from "../reducers/productReducer";
import userReducer from "../reducers/userReducer";
import { useFetchUser } from "../hooks/useFetchUser";

interface UserProviderProps {
    children: ReactNode;
}

export interface UserStateProps {
    username: string | null;
    email: string | null;
    _id: string | null;
    token: string | null;
    avatar: string | null;
    address: string | null;
    cart: ProductInterface[],
    wishList: ProductInterface[]
}

interface UserContextType {
    uploadAvatar: (file: File) => Promise<string>;
    userState: UserStateProps;
    userDispatch: React.Dispatch<any>;
    initialUserState: UserStateProps;
}

export interface ProductInterface {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    quantity: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}



const userContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

    const initialUserState = {
        email: null,
        username: null,
        _id: null,
        token: null,
        avatar: null,
        address: null,
        cart: [],
        wishList: []
    }

    const [userState, userDispatch] = useReducer(userReducer, initialUserState);

    const uploadAvatar = async (file: File): Promise<string> => {
        if (file.type === "image/jpeg" || file.type === "image/png") {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "pokemon-ecom");
            formData.append("cloud_name", "blackfroth");

            try {
                const response = await axios.post("https://api.cloudinary.com/v1_1/blackfroth/image/upload", formData);
                return response.data.url;
            } catch (error) {
                console.error("Image upload failed", error);
                throw new Error("Image upload failed");
            }
        }
        console.log('error occurred while uploading image');

        throw new Error("unable to upload image.")
    };

    useEffect(() => {
        if (!userState._id) {
            const user = JSON.parse(localStorage.getItem("userState") || JSON.stringify(initialUserState))
            userDispatch({ type: 'SET_USER', payload: user });
        }
    }, []);

    return (
        <userContext.Provider value={{ userState, initialUserState, uploadAvatar, userDispatch, }}>
            {children}
        </userContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(userContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
