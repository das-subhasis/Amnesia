import axios from "axios";
import { useUserContext } from "../context/userContext"
import { useState } from "react";

const useFetchWishList = async () => {

    const { userState, wishList, productDispatch } = useUserContext();

    if (!userState?._id) {
        productDispatch({ type: 'SET_WISHLIST', payload: [] });
        return;
    }

    try {
        const { data: { wishList } } = await axios.get('http://localhost:3000/api/user/wishlist', { headers: { Authorization: userState.token } })
        productDispatch({ type: 'ADD_TO_WISHLIST', payload: wishList })
    } catch (error) {
        console.log(error);
    }

}

export default useFetchWishList;