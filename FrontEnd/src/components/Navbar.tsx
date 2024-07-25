import React, { useRef, useState } from 'react'
import { VscThreeBars } from "react-icons/vsc";
import { IoIosHeart } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom'

import profile from '../assets/IMG_20240501_105444.jpg'
import UserSection from './UserSection';
import useClickOutside from '../hooks/useClickOutside';
import { useAuthContext } from '../context/authContext';
import { useUserContext } from '../context/userContext';

const Navbar = () => {
    const [dropDown, setDropDown] = useState<boolean>(false);

    const toggleDropDown = () => {
        setDropDown(!dropDown);
    }

    const ref = useClickOutside(() => setDropDown(false));


    const { userState } = useUserContext();

    return (
        <div className='w-full h-16 bg-[#191717] text-[#F1EFEF] flex items-center justify-between px-10 py-1.5 shadow-xl relative'>
            {/* sidebar and logo */}
            <div className='flex items-center gap-5'>
                <div>
                    <VscThreeBars size={25} color='#FFF' />
                </div>
                <Link to={'/'}>
                    <h1 className='text-xl font-bold'>Amnesia</h1>
                </Link>
            </div>
            <div className='w-1/3 h-8 flex items-center bg-white rounded-md overflow-hidden'>
                <input type="text" className='w-full h-full px-3 py-1.5 outline-none text-black placeholder:text-[#272829]' placeholder='Search the product you want' />
                <span className='w-[10%] h-full bg-[#D8D9DA] flex items-center justify-center'>
                    <FaSearch size={18} color='#000' />
                </span>
            </div>
            {/* Page links and User icon */}
            <div className='h-full flex items-center justify-center gap-10 '>
                <div className='flex gap-8 items-center relative'>
                    <span className='absolute right-[2.5rem] bottom-[1rem] text-xs w-5 h-5 font-semibold bg-white rounded-full  text-black flex items-center justify-center'>1</span>
                    <Link to={'/orders'}><BsCart4 size={25} /></Link>
                    <Link to={'/wishlist'}><IoIosHeart size={25} /></Link>
                </div>
                <div className='w-8 h-8 rounded-full bg-[#F1EFEF] overflow-hidden cursor-pointer' ref={ref} onClick={toggleDropDown}>
                    {
                        userState._id ? <img src={userState.avatar || ''} alt="image" /> : <img src="https://res.cloudinary.com/blackfroth/image/upload/v1720947664/free-user-icon-3296-thumb_tyhkuy.png" alt="image" />
                    }
                </div>
                {
                    dropDown && (
                        <div className='absolute right-5 top-16 z-10'>
                            <UserSection handler={toggleDropDown} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default Navbar