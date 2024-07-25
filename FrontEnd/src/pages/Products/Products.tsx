import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import useClickOutside from '../../hooks/useClickOutside';
import { useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import { capitalize } from '../../utils/utils';
import { ProductInterface, useUserContext } from '../../context/userContext';

const Products = () => {
    const [filter, setFilter] = useState<boolean>(false);
    const toggleFilter = () => {
        setFilter(!filter);
    }
    const [count, setCount] = useState(0);

    const { userState, userDispatch } = useUserContext();


    const wishListHandler = (product: ProductInterface) => {
        if (!userState._id) return
        userDispatch({ type: 'SET_WISHLIST', payload: product });
    }

    const { id } = useParams();

    const { products } = id ? useProducts(capitalize(id)) : { products: [] }


    const ref = useClickOutside(() => setFilter(false));

    console.log(count);
    
    
    return (
        <div className='flex-1 flex flex-col px-20 ml-[2rem]'>
            {/* Filter Section */}
            <div
                className='w-full z-1 mt-10 flex justify-between'
                ref={ref}>
                <div className='text-[12px] pt-5'>
                    SHOWING {products.length} RESULTS
                </div>
                <button
                    className={`${filter ? 'ring-pink-600' : 'ring-black'} h-10 px-4 py-1.5 flex items-center justify-center gap-2 ring-[1px] hover:bg-slate-50 `}
                    onClick={toggleFilter}
                >
                    Filter
                    {filter ? <MdOutlineKeyboardArrowUp size={15} /> : <MdOutlineKeyboardArrowDown size={15} />}
                </button>
            </div>
            {/* Product Cards */}
            <div className='flex-1 flex flex-wrap items-center  py-5  gap-10'>
                {
                    products.map((product) => {
                        return <Card key={product._id} product={product} Handler={wishListHandler} />
                    })
                }
            </div>
        </div>
    );
}

export default Products;
