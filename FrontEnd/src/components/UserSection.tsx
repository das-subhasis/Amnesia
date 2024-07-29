import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import { useUserContext } from '../context/userContext'

interface UserSectionInterface {
    handler: () => void
}

const UserSection: React.FC<UserSectionInterface> = ({ handler }) => {
    const { ref, logout } = useAuthContext();
    const { userState } = useUserContext();

    return (
        userState._id ? <div className='flex flex-col flex-wrap bg-white text-black  w-24 rounded-xl overflow-hidden text-sm ring-1 ring-indigo-600' ref={ref}>
            <Link to={'/user-profile'}>
                <div className='w-full h-full px-4 py-2 hover:bg-indigo-50 hover:font-medium hover:text-indigo-400' onClick={handler}>Profile</div>
            </Link>
            <Link to={'/order-history'}>
                <div className='w-full h-full px-4 py-2 hover:bg-indigo-50 hover:font-medium hover:text-indigo-400' onClick={handler}>Orders</div>
            </Link>
            <span
                className='w-full h-full cursor-pointer'
                onClick={logout}
            >
                <div className='w-full h-full px-4 py-2 hover:bg-indigo-50 hover:font-medium hover:text-indigo-400' onClick={handler}>Logout</div>
            </span>
        </div> : <div className='flex flex-col flex-wrap bg-white text-black w-24 rounded-xl overflow-hidden text-sm ring-1 ring-indigo-600' ref={ref}>
            <Link to={'/login'}>
                <div className='w-full h-full px-4 py-2 hover:bg-indigo-50 hover:font-medium hover:text-indigo-600 transition-all duration-150 ease-in' onClick={handler}>Login</div>
            </Link>
            <Link to={'/signup'}>
                <div className='w-full h-full px-4 py-2 hover:bg-indigo-50 hover:font-medium hover:text-indigo-600 transition-all duration-150 ease-in' onClick={handler}>Signup</div>
            </Link>
        </div>
    )
}

export default UserSection