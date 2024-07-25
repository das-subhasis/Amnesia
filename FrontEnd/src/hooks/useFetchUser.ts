import axios from "axios";
import { useUserContext } from "../context/userContext";

export const useFetchUser = async (token: string, dispatch: React.Dispatch<any>) => {
    if (!token) return
    try {
        const response = await axios.get(`http://localhost:3000/api/user`, { headers: { Authorization: token } });
        console.log(response.data);
        dispatch({ type: "SET_CART", payload: response.data.cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
    }
};