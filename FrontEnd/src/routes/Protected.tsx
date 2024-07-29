import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

interface ProtectedInterface {
    children: React.ReactNode
}

const Protected: React.FC<ProtectedInterface> = ({ children }) => {
    const { userState } = useUserContext();
    if (!userState || !userState._id) {
        return <Navigate to={'/'} />
    }

    return children
}

export default Protected