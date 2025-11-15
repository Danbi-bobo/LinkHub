
import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { MyLinks } from './pages/MyLinks';
import { Admin } from './pages/Admin';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { User, UserRole } from './types';

export type Page = 'dashboard' | 'analytics' | 'my-links' | 'admin' | 'settings';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [activePage, setActivePage] = useState<Page>('dashboard');

    const mockUser: User = useMemo(() => ({
        id: 'user-1',
        name: 'Alex Johnson',
        email: 'alex.j@company.com',
        avatar: 'https://picsum.photos/seed/alex/100/100',
        role: UserRole.ADMIN,
        departmentId: 'dept-1',
        teamId: 'team-1',
    }), []);
    
    const handleLogin = () => {
        setCurrentUser(mockUser);
        setIsAuthenticated(true);
        setActivePage('dashboard');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard':
                return <Dashboard currentUser={currentUser!} />;
            case 'analytics':
                return <Analytics />;
            case 'my-links':
                return <MyLinks currentUser={currentUser!} />;
            case 'admin':
                return <Admin />;
            case 'settings':
                return <Settings currentUser={currentUser!} />;
            default:
                return <Dashboard currentUser={currentUser!} />;
        }
    };

    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header currentUser={currentUser!} onLogout={handleLogout} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default App;
