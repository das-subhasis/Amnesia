import { useState, useEffect } from "react";
import { ProductInterface } from "../context/userContext";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/utils";
import { debounce } from 'lodash';

export interface CartListCardProps {
    product: ProductInterface;
    quantity: number;
    removeHandler: (id: string) => void;
    updateCart: (id: string, quantity: number) => void;
}

const CartListCard: React.FC<CartListCardProps> = ({ product, quantity, removeHandler, updateCart }) => {
    const [selectedQuantity, setSelectedQuantity] = useState(quantity);

    const debouncedUpdateQuantity = debounce((id: string, quantity: number) => {
        updateCart(id, quantity);
    }, 2000);

    useEffect(() => {
        debouncedUpdateQuantity(product._id, selectedQuantity);
        return () => {
            debouncedUpdateQuantity.cancel();
        };
    }, [selectedQuantity]);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newQuantity = parseInt(event.target.value);
        setSelectedQuantity(newQuantity);
    };

    return (
        <div className='w-[80%] md:w-[60%] h-[200px] hover:shadow-xl flex items-center rounded-lg border-2 overflow-hidden'>
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
                    <div className='flex justify-between h-full'>
                        <div className='flex flex-col gap-2 w-[75%] md:w-[80%]'>
                            <Link to={`/products/item/${product._id}`}><p className='text-2xl font-bold hover:underline hover:text-blue-700 w-fit'>{product.name}</p></Link>
                            <p className='text-sm line-clamp-1'>{product.description}</p>
                            <p className='text-sm '><span className="text-gray-500 font-medium h-full ">Category: </span>{product.category}</p>
                            <div className="flex-1 flex items-end mb-2">
                                <select value={selectedQuantity} onChange={handleQuantityChange} className="w-fit">
                                    {Array.from({ length: 10 }).map((_, idx) => (
                                        <option key={idx} value={idx + 1}>{idx + 1}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='text-base font-bold h-full flex flex-col items-end justify-between'>
                            <div className="">${product.price}</div>
                            <div className="flex w-full">Subtotal: ${selectedQuantity * product.price}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartListCard;
