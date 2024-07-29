import { useState } from "react";
import { ProductInterface } from "../context/userContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/utils";

export interface WishListCardProps {
  product: ProductInterface;
  removeHandler: (id: string) => void;
}

const WishListCard: React.FC<WishListCardProps> = ({ product, removeHandler}) => {
  return (
    <div className='w-[60%] h-[200px] hover:shadow-xl flex items-center rounded-lg border-2 overflow-hidden'>
      {/* Product image */}
      <div className='w-[20%] h-full flex items-center justify-center border-r-2'>
        <img src='https://shema-backend.vercel.app/public/men/images-1661721639781.jpg' alt="image" className='w-[100px]' />
      </div>
      <div className='w-[80%] h-full flex flex-col'>
        <div className='h-[30%] bg-gray-300 px-5 py-1.5 flex items-center gap-5'>
          <div className='flex flex-col'>
            <span className='text-xs font-medium'>ADDED ON</span>
            <span className='text-sm'>{formatDate(product.createdAt)}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs font-medium'>LAST SEEN ON</span>
            <span className='text-sm'>{formatDate(product.updatedAt)}</span>
          </div>
          <div className='flex-1 h-full flex items-center justify-end'>
            <button onClick={() => removeHandler(product._id)}><MdDelete size={23} /></button>
          </div>
        </div>
        <div className='px-5 py-1.5 flex flex-col h-full '>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-2'>
              <Link to={'/'}><p className='text-2xl font-bold hover:underline hover:text-blue-700 w-fit'>{product.name}</p></Link>
              <p className='text-sm line-clamp-3'>{product.description}</p>
              <p className='text-sm'><span className="text-gray-500 font-medium">Category: </span>{product.category}</p>
            </div>
            <div className='text-base font-bold h-full '>
              ${product.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WishListCard