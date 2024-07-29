import React, { createContext, ReactNode, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./userContext";
import client from "../config/client";


interface AuthProviderProps {
    children: ReactNode;
}


interface AuthContextType {
    login: (email: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string, avatar: string | undefined) => Promise<void>;
    logout: () => void;
    ref: React.MutableRefObject<any>;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const ref = useRef(null);

    
    const { initialUserState, userDispatch } = useUserContext();

    const login = async (email: string, password: string) => {
        if (!email || !password) {
            throw new Error("Must provide all information");
        }
        try {
            const { data } = await client.post("auth/login", { email, password });
            console.log(data);

            userDispatch({ type: 'SET_USER', payload: data });
            localStorage.setItem("userState", JSON.stringify(data));
            navigate('/');
        } catch (error: any) {
            console.error("Login failed", error.response.data.message);
        }
    };

    const signup = async (username: string, email: string, password: string, avatar: string | undefined) => {
        if (!email || !password || !username) {
            throw new Error("Must provide all information");
        }
        try {
            const { data } = await client.post("auth/register", { username, email, password, avatar });
            console.log(data);
            userDispatch({ type: 'SET_USER', payload: data });
            localStorage.setItem("userState", JSON.stringify(data));
            navigate('/');
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    const logout = () => {
        console.log('clicked');
        userDispatch({ type: 'REMOVE_USER', payload: initialUserState })
        navigate('/login');
    };

    return (
        <authContext.Provider value={{ login, signup, logout, ref }}>
            {children}
        </authContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
