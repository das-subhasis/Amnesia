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
  
  const WishListCard: React.FC<WishListCardProps> = ({ product, removeHandler }) => {
    
    console.log(product);
    
    
    const [quantity, setQuantity] = useState<number>(1);
  
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
              <button onClick={() => removeHandler(product._id)}><MdDelete size={20} /></button>
            </div>
          </div>
          <div className='px-5 py-1 flex flex-col gap-5 h-full justify-center'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-1'>
                <Link to={'/'}><p className='text-xl'>{product.name}</p></Link>
                <p className='text-sm'>{product.description}</p>
                <p className='text-sm'>{product.category}</p>
              </div>
              <div className='text-base font-bold h-full '>
                ${product.price}
              </div>
            </div>
            <div className='flex-1 flex items-center justify-between'>
              <div className='flex items-center  gap-2 bg-[#151515] text-white w-fit h-fit px-3 rounded-md'>
                <button className='py-1.5' name='reduce' onClick={() => quantity > 1 ? setQuantity(quantity - 1) : 1}><FaMinus size={8} /></button>
                <span className='py-1.5 bg-gray-200 px-2 text-[#31363F] font-medium text-sm'>{quantity < 10 ? '0' + quantity : quantity}</span>
                <button className='py-1.5 flex items-center' name='increase' onClick={() => quantity < 10 ? setQuantity(quantity + 1) : 10}><FaPlus size={9} /></button>
              </div>
              <div className='font-medium'>
                Items Subtotal: ${(product.price * quantity).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
export default WishListCard