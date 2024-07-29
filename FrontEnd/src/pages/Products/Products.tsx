import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import useClickOutside from '../../hooks/useClickOutside';
import { useUserContext } from '../../context/userContext';
import client from '../../config/client';
import Skeletons from '../../components/ProductSkeletons';
import { useParams } from 'react-router-dom';
import { capitalize } from 'lodash';
import FilterSection from '../../components/FilterSection';

const Products = () => {
    const [filter, setFilter] = useState<boolean>(false);
    const { products, loading, setLoading, productDispatch } = useUserContext();
    const ref = useClickOutside(() => setFilter(false));
    const { id } = useParams();
    const toggleFilter = () => {
        setFilter(!filter);
    }
    useEffect(() => {
        setLoading(true);
        const getProducts = async () => {
            try {
                const response = await client.get(`/products/c/${capitalize(id)}`);
                if (response.status === 200) {
                    productDispatch({
                        type: "SET_PRODUCTS",
                        payload: response.data,
                    });
                    setLoading(false)
                }
            } catch (error) {
                console.error(error);
            }
        }
        getProducts();
    }, [])


console.log(filter);

    return (
        <div className='flex-1 flex flex-col px-20 ml-[2rem] gap-5'>
            {/* Filter Section */}
            <div
                className='w-full z-1 mt-10 flex justify-between relative'
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
                {filter && <FilterSection setFilter={setFilter} products={products}/>}
            </div>
            {/* Product Cards */}
            <div className='flex-1 flex flex-wrap items-center justify-center xl:justify-normal py-5 gap-10'>
                {
                    loading ? Array.from({ length: 5 }).map((_, idx) => <Skeletons key={idx}/>) : products.map((product) => {
                        return <Card key={product._id} product={product} />
                    })
                }
            </div>
        </div>
    );
}

export default Products;
