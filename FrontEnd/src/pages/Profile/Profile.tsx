import React, { ChangeEvent, useState } from 'react';
import { useAuthContext } from '../../context/authContext';
import { useUserContext } from '../../context/userContext';


interface User {
    username: string;
    email: string;
    password: string;
    avatar: string;
    address: string;
}

const Profile: React.FC = () => {
    const { updateUser, uploadAvatar } = useUserContext();
    const { userState } = useAuthContext();
    const [editingAddress, setEditingAddress] = useState(false);
    const [address, setAddress] = useState(userState?.address);
    const [avatar, setAvatar] = useState<File | null>(null);

    const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    const handleAddressSave = () => {
        updateUser({ ...userState, address });
        setEditingAddress(false);
    };

    const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setAvatar(file);
            const url = await uploadAvatar(file);
            updateUser({ ...userState, avatar: url });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
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

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        value={userState?.username}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={userState?.email}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value="******"
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address</label>
                    {editingAddress ? (
                        <div>
                            <input
                                type="text"
                                value={address}
                                onChange={handleAddressChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <button
                                onClick={handleAddressSave}
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <input
                                type="text"
                                value={address}
                                readOnly
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
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
