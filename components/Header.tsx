
import React, { useState } from 'react';
import { User } from '../types';
import { NotificationIcon, LogoutIcon } from './Icons';

interface HeaderProps {
    currentUser: User;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const notifications = [
        { id: 1, message: "Link 'Google' has been approved.", time: "5m ago" },
        { id: 2, message: "Your request for 'Internal Docs' was rejected.", time: "1h ago" },
        { id: 3, message: "New comment on 'Project Phoenix'", time: "2h ago" },
    ];

    return (
        <header className="h-20 items-center relative z-10 bg-white dark:bg-gray-800 shadow-md flex-shrink-0">
            <div className="flex flex-col justify-center h-full px-3 mx-auto flex-center">
                <div className="relative flex items-center w-full lg:px-6">
                    <div className="flex-1">
                         <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 capitalize">Dashboard</h2>
                    </div>
                    <div className="flex items-center">
                        <div className="relative">
                            <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring">
                                <NotificationIcon />
                                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                            </button>
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-700 rounded-lg shadow-xl overflow-hidden">
                                    <div className="py-2 px-4 text-sm font-semibold border-b dark:border-gray-600">Notifications</div>
                                    <div className="divide-y dark:divide-gray-600">
                                        {notifications.map(n => (
                                            <a href="#" key={n.id} className="block py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <p className="text-sm">{n.message}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{n.time}</p>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="relative ml-6">
                            <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center focus:outline-none">
                                <img src={currentUser.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                                <div className="ml-3 text-left hidden md:block">
                                    <p className="font-semibold text-sm">{currentUser.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{currentUser.role}</p>
                                </div>
                            </button>
                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-xl">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Profile</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Settings</a>
                                    <div onClick={onLogout} className="cursor-pointer flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700">
                                        <LogoutIcon />
                                        <span className="ml-2">Logout</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
