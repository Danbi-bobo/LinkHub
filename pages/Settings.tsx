
import React from 'react';
import { User } from '../types';

interface SettingsProps {
    currentUser: User;
}

const SettingsSection: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
        <h3 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">{title}</h3>
        {children}
    </div>
);

const InputField: React.FC<{label: string, type: string, id: string, value: string, disabled?: boolean}> = ({ label, type, id, value, disabled }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <input 
            type={type} 
            id={id} 
            defaultValue={value}
            disabled={disabled}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200 dark:disabled:bg-gray-600" 
        />
    </div>
);

export const Settings: React.FC<SettingsProps> = ({ currentUser }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Settings</h2>

            <SettingsSection title="Profile Information">
                <div className="flex items-center mb-6">
                    <img src={currentUser.avatar} alt="Avatar" className="w-24 h-24 rounded-full mr-6" />
                    <div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">Change Avatar</button>
                        <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" type="text" id="name" value={currentUser.name} />
                    <InputField label="Email Address" type="email" id="email" value={currentUser.email} disabled />
                </div>
                 <div className="text-right mt-4">
                     <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
                </div>
            </SettingsSection>

            <SettingsSection title="System Preferences">
                 <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-semibold">Dark Mode</h4>
                        <p className="text-sm text-gray-500">Toggle between light and dark themes.</p>
                    </div>
                    <label htmlFor="dark-mode-toggle" className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input type="checkbox" id="dark-mode-toggle" className="sr-only" />
                            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                        </div>
                    </label>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-semibold">Email Notifications</h4>
                        <p className="text-sm text-gray-500">Receive emails for link status changes.</p>
                    </div>
                    <label htmlFor="email-toggle" className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input type="checkbox" id="email-toggle" className="sr-only" defaultChecked />
                            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                        </div>
                    </label>
                </div>
            </SettingsSection>
        </div>
    );
};
