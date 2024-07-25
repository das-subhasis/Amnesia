import React from 'react'
import WishListCard from '../../components/WishListCard';
import { useUserContext } from '../../context/userContext';

const Order = () => {
    const { userState, userDispatch } = useUserContext();

    const removeHandler = (_id: string) => {
        userDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: { _id } });
    }

    return (
        <div className='px-20 py-10 w-full float-start justify-center'>
            <div className='flex flex-col gap-5 justify-center items-center'>
                <div className='w-[60%]'>
                    Orders
                </div>
                {
                    userState.wishList.map((product) => {
                        if (!product) { console.log(product); return; }

                        return <WishListCard product={product} removeHandler={removeHandler} />
                    })
                }
            </div>
        </div>
    )
}

export default Order