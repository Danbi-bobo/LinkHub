import React from 'react';
import { Page } from '../App';
import { DashboardIcon, AnalyticsIcon, MyLinksIcon, AdminIcon, SettingsIcon, LogoIcon } from './Icons';

interface SidebarProps {
    activePage: Page;
    setActivePage: (page: Page) => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
    <li
        onClick={onClick}
        className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
            isActive
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
        }`}
    >
        {icon}
        <span className="ml-4 font-medium">{label}</span>
    </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
    const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
        { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
        { id: 'my-links', label: 'My Links', icon: <MyLinksIcon /> },
        { id: 'admin', label: 'Admin Console', icon: <AdminIcon /> },
        { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ];

    return (
        <div className="w-64 bg-gray-50 text-gray-700 flex-shrink-0 flex flex-col border-r border-gray-200">
            <div className="flex items-center justify-center h-20 border-b border-gray-200">
                <LogoIcon />
                <h1 className="text-2xl font-bold ml-2 text-gray-800">LinkHub</h1>
            </div>
            <nav className="flex-1 px-4 py-4">
                <ul>
                    {navItems.map((item) => (
                        <NavItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            isActive={activePage === item.id}
                            onClick={() => setActivePage(item.id)}
                        />
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-200">
                <p className="text-xs text-gray-400 text-center">&copy; 2024 LinkHub Inc.</p>
            </div>
        </div>
    );
};