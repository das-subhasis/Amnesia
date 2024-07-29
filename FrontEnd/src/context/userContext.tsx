import React, { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import userReducer from "../reducers/userReducer";
import productReducer from "../reducers/productReducer";

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
    cart: CartInterface[];
    wishList: ProductInterface[];
}

interface UserContextType {
    userState: UserStateProps;
    initialUserState: UserStateProps;
    products: ProductInterface[];
    categories: string[]
    orders: [];
    loading: boolean;
    error: string | null;
    uploadAvatar: (file: File) => Promise<string>;
    userDispatch: React.Dispatch<any>;
    productDispatch: React.Dispatch<any>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

export interface ProductReducerProps {
    products: ProductInterface[],
    categories: string[]
    orders: [],
}

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

export interface CartInterface {
    product: ProductInterface;
    quantity: number;
}

const userContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

    const initialUserState: UserStateProps = JSON.parse(localStorage.getItem("userState")!) || {
        email: null,
        username: null,
        _id: null,
        token: null,
        avatar: null,
        address: null,
        cart: [],
        wishList: []
    }

    const initialProductState: ProductReducerProps = {
        products: [],
        categories: ['Topwear', 'Bottomwear', 'Footwear'],
        orders: []
    }


    const [userState, userDispatch] = useReducer(userReducer, initialUserState);
    const [{ products, categories, orders }, productDispatch] = useReducer(productReducer, initialProductState);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


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
        localStorage.setItem("userState", JSON.stringify(userState));
    }, [userState]);

    return (
        <userContext.Provider value={{
            userState,
            initialUserState,
            products,
            categories,
            orders,
            loading,
            error,
            setError,
            setLoading,
            uploadAvatar,
            userDispatch,
            productDispatch,
        }}>


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
