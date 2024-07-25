import React, { ButtonHTMLAttributes, ChangeEvent, MouseEventHandler, useState } from 'react'
import { ProductInterface, useUserContext } from '../../context/userContext'
import { formatDate } from '../../utils/utils';
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


import { Link } from 'react-router-dom';
import WishListCard from '../../components/WishListCard';

const WishList = () => {

  const { userState, userDispatch } = useUserContext();

  const removeHandler = (_id: string) => { 
    userDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: { _id } });
  }

  return (
    <div className='px-20 py-10 w-full float-start justify-center'>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <div className='w-[60%]'>
          Wishlist
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

export default WishList