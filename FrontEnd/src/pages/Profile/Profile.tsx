import React, { ChangeEvent, useState } from 'react';
import { useUserContext } from '../../context/userContext';
import client from '../../config/client';

interface User {
    username: string;
    email: string;
    password: string;
    avatar: string;
    address: string;
}

const Profile: React.FC = () => {
    const { userDispatch, uploadAvatar, userState } = useUserContext();
    const [editingAddress, setEditingAddress] = useState(false);
    const [address, setAddress] = useState(userState.address || '');
    const [avatar, setAvatar] = useState<File | null>(null);

    const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    const handleAddressSave = async () => {
        setEditingAddress(false);
        try {
            const response = await client.post('/user/update', { address }, { headers: { Authorization: `Bearer ${userState.token}` } });
            if (response.status === 200) {
                userDispatch({ type: 'SET_USER', payload: { address } });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setAvatar(file);
            const avatar = await uploadAvatar(file);
            try {
                const response = await client.post('/user/update', { avatar }, { headers: { Authorization: `Bearer ${userState.token}` } });
                if (response.status === 200) {
                    userDispatch({ type: 'SET_USER', payload: { avatar } });
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center w-full h-full">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <img
                        src={userState?.avatar || 'default-avatar-url'}
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                    <input
                        type="file"
                        onChange={handleAvatarChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
                <h1 className="mt-4 text-2xl font-bold">{userState?.username}</h1>
            </div>

            <div className="mt-8 w-[30%] bg-gray-200 px-5 py-5 rounded-xl">
                <h2 className="text-xl text-center font-semibold mb-4">Profile Information</h2>
                <div className="mb-4 flex items-center justify-between">
                    <p className="block text-black font-medium">Username</p>
                    <p>{userState.username}</p>
                </div>
                <div className="mb-4 flex items-center justify-between">
                    <p className="block text-black font-medium">Email</p>
                    <p>{userState.email}</p>
                </div>
                <div className="mb-4 flex items-center justify-between">
                    <p className="block text-black font-medium">Password</p>
                    <p>*****</p>
                </div>
                <div className="mb-4 flex justify-between">
                    <label className="block text-black font-medium">Address</label>
                    {editingAddress ? (
                        <div className='flex flex-col justify-between items-end gap-2'>
                            <input
                                type="text"
                                value={address}
                                onChange={handleAddressChange}
                                className="px-2 py-1.5 mt-1 block w-full rounded-md ring-2 ring-indigo-500 outline-none"
                            />
                            <button
                                onClick={handleAddressSave}
                                className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-between items-end gap-5">
                            <p>{userState.address}</p>
                            <button
                                onClick={() => setEditingAddress(true)}
                                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md"
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
