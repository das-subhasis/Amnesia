import React from 'react'
import { IoIosHeart } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { ProductInterface, useUserContext } from '../context/userContext';
interface CardInterface {
  product: ProductInterface;
  Handler: (product: ProductInterface) => void;
  // orderHandler;
}

const Card: React.FC<CardInterface> = ({ product, Handler }) => {

  return (
    <div className={`w-[300px] h-[350px] flex flex-col  hover:shadow-2xl rounded-md`}>
      <div className='h-[70%] overflow-hidden'>
        <img src={product.imageUrl } alt="" className='h-full w-full object-cover' />
      </div>
      <div className='h-[30%]  px-5 py-3 flex flex-col justify-center items-center '>
        <span className='text-lg font-medium'>{product.name}</span>
        <div className='w-full h-full  flex items-center justify-between px-5'>
          <button><BsCart4 size={25} /></button>
          <span className='font-bold'>${product.price}</span>
          <button
            onClick={() => Handler(product)}
          ><IoIosHeart size={25} /></button>
        </div>
      </div>
    </div>
  )
}

export default Card