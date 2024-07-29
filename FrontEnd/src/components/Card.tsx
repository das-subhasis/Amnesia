import React from 'react'
import { IoIosHeart } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { ProductInterface, useUserContext } from '../context/userContext';
import client from '../config/client';
import { Link } from 'react-router-dom';
interface CardInterface {
  product: ProductInterface;
}

const Card: React.FC<CardInterface> = ({ product }) => {
  const { userState, userDispatch } = useUserContext();

  const updateCart = async (product: ProductInterface) => {
    if (!userState._id) return
    try {
      const response = await client.post('/user/cart', { _id: product._id, quantity: 1 }, { headers: { Authorization: `Bearer ${userState.token}` } });
      if (response.status === 200) {
        console.log(response.data);
        userDispatch({ type: 'SET_CART', payload: response.data });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const updateWishlist = async (product: ProductInterface) => {
    if (!userState._id) return
    try {
      const response = await client.post('/user/wishlist', { _id: product._id }, { headers: { Authorization: `Bearer ${userState.token}` } });
      if (response.status === 200) {
        console.log(response.data);
        userDispatch({ type: 'SET_WISHLIST', payload: response.data[0] });
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <Link to={`/products/item/${product._id}`}>
      <div className={`w-[200px] h-[250px] md:w-[250px] md:h-[300px] xl:w-[300px] xl:h-[350px] flex flex-col hover:shadow-2xl rounded-md ring-1 ring-black`}>
        <div className='h-[70%] overflow-hidden'>
          {/* <img src={product.imageUrl} alt="" className='h-full w-full object-cover' /> */}
        </div>
        <div className='h-[30%]  md:px-5 md:py-3 flex flex-col justify-center items-center '>
          <span className='text-sm md:text-base lg:text-lg font-medium'>{product.name}</span>
          <div className='w-full h-full  flex items-center justify-between px-5'>
            <button
              onClick={() => updateCart(product)}
            ><BsCart4 size={25} className='hover:text-indigo-600'/></button>
            <span className='font-bold'>${product.price}</span>
            <button
              onClick={() => updateWishlist(product)}
            ><IoIosHeart size={25} className='hover:text-indigo-600'/></button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card