import { ChangeEvent, useEffect, useState } from 'react'
import { IoIosHeart } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link } from 'react-router-dom'
import UserSection from './UserSection';
import useClickOutside from '../hooks/useClickOutside';
import { ProductInterface, useUserContext } from '../context/userContext';
import { debounce } from 'lodash';
import client from '../config/client';

const Navbar = () => {
    const [dropDown, setDropDown] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<ProductInterface[]>([]);
    const toggleDropDown = () => {
        setDropDown(!dropDown);
    }

    const ref = useClickOutside(() => setDropDown(false));
    const showRef = useClickOutside(() => setQuery(''));

    const { userState, loading, setLoading } = useUserContext();
    const queryHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }


    useEffect(() => {
        const debouncedSearch = debounce(async () => {
            if (query.trim() === '') return;
            setLoading(true);
            const response = await client.get(`/products/${query}`);
            setSearchResults(response.data);
            setLoading(false);
        }, 300)
        debouncedSearch();
    }, [query])



    return (
        <div className='w-full h-14 text-[#F1EFEF] flex items-center justify-between px-10 py-1.5 shadow-md relative z-10'>
            {/* sidebar and logo */}
            <div className='ml-10'>
                <Link to={'/'}>
                    <h1 className='text-xl font-bold text-black font-mont'>Amnesia</h1>
                </Link>
            </div>
            <div className='w-1/4 h-8 flex items-center rounded-md overflow-hidden border-0 ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 relative'>
                <input type="text" className='w-full h-full px-3 py-1.5 outline-none  text-black placeholder:text-sm placeholder:text-[#272829]' placeholder='Search the product you want' value={query} onChange={queryHandler} />
                <span className='w-[10%] h-full flex items-center justify-center'>
                    <FaSearch size={15} color='#000' />
                </span>
            </div>
            {
                query.trim() !== '' &&
                <div className={`w-[24%] left-[36.4%] top-[90%] min-h-10 max-h-52 absolute text-black  z-10 bg-white rounded-xl shadow-xl ring-2  ring-indigo-600 overflow-hidden overflow-y-scroll divide-y-2 divide-black/45`}
                    ref={showRef}>
                    {
                        loading ? <div className='w-full h-10 px-5 py-1.5 flex items-center justify-center'><p className='w-full h-fit bg-slate-300 animate-pulse rounded-full'></p></div> : <div className='flex flex-col gap-2'>
                            {
                                searchResults.length > 0 ?
                                    (
                                        searchResults.map(p =>
                                            <div className='w-full h-10 px-5 py-2.5 flex items-center justify-center' key={p._id}>
                                                <p className='w-full h-full hover:text-indigo-600 hover:underline-offset-2 hover:underline'
                                                    onClick={() => setQuery('')}
                                                >
                                                    <Link to={`/products/item/${p._id}`}>{p.name}</Link>
                                                </p>
                                            </div>))
                                    :
                                    <div className='flex   items-center justify-center w-full h-10 '>
                                        <p>Oops no results found...</p>
                                    </div>
                            }
                        </div>
                    }
                </div>
            }
            {/* Page links and User icon */}
            <div className='h-full flex items-center justify-center gap-10 '>
                <div className='flex gap-8 items-center relative'>
                    {userState._id && userState.cart.length > 0 && <span className='absolute right-[2.5rem] bottom-[1rem] text-xs w-5 h-5 font-semibold rounded-full text-black flex items-center justify-center'>{userState.cart.length}</span>}
                    <Link to={'/cart'}><BsCart4 size={25} className='text-black hover:text-indigo-600' /></Link>
                    <Link to={'/wishlist'}><IoIosHeart size={25} className='text-black hover:text-indigo-600' /></Link>
                </div>
                <div className='flex items-center gap-2 cursor-pointer' ref={ref} onClick={toggleDropDown}>
                    <div className='w-8 h-8 rounded-full overflow-hidden'>
                        {
                            userState._id ? <img src={userState.avatar || ''} alt="image" /> : <img src="https://res.cloudinary.com/blackfroth/image/upload/v1720947664/free-user-icon-3296-thumb_tyhkuy.png" alt="image" />
                        }
                    </div>
                    <div className='h-full flex items-center transition-all duration-150 ease-out select-none'>
                        {
                            dropDown ? <MdKeyboardArrowUp size={20} color='#7C00FE' /> : <MdKeyboardArrowDown size={20} color='#000' />
                        }
                    </div>
                </div>
                {
                    dropDown && (
                        <div className='absolute right-5 top-16 z-10 '>
                            <UserSection handler={toggleDropDown} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default Navbar