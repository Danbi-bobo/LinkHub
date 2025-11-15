import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { MyLinks } from './pages/MyLinks';
import { Admin } from './pages/Admin';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { AuthCallback } from './components/AuthCallback';
import { User, UserRole } from './types';

export type Page = 'dashboard' | 'analytics' | 'my-links' | 'admin' | 'settings';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [activePage, setActivePage] = useState<Page>('dashboard');
    const [isCallback, setIsCallback] = useState<boolean>(false);

    const mockUser: User = useMemo(() => ({
        id: 'user-1',
        name: 'Alex Johnson',
        email: 'alex.j@company.com',
        avatar: 'https://picsum.photos/seed/alex/100/100',
        role: UserRole.ADMIN,
        departmentId: 'dept-1',
        teamId: 'team-1',
    }), []);

    useEffect(() => {
        // Check if this is an OAuth callback
        const params = new URLSearchParams(window.location.search);
        if (params.has('code') || params.has('error')) {
            setIsCallback(true);
        }
    }, []);
    
    const handleLogin = () => {
        setCurrentUser(mockUser);
        setIsAuthenticated(true);
        setActivePage('dashboard');
    };

    const handleOAuthLoginSuccess = (user: User) => {
        setCurrentUser(user);
        setIsAuthenticated(true);
        setIsCallback(false);
        // Clean up URL
        window.history.replaceState({}, document.title, '/');
        setActivePage('dashboard');
    };

    const handleOAuthLoginError = (error: string) => {
        console.error('OAuth login failed:', error);
        setIsCallback(false);
        // Clean up URL
        window.history.replaceState({}, document.title, '/');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
        // Clear OAuth tokens
        sessionStorage.removeItem('lark_access_token');
        sessionStorage.removeItem('lark_refresh_token');
        sessionStorage.removeItem('lark_oauth_state');
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

    // Handle OAuth callback
    if (isCallback) {
        return (
            <AuthCallback 
                onLoginSuccess={handleOAuthLoginSuccess}
                onLoginError={handleOAuthLoginError}
            />
        );
    }

    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="flex h-screen bg-white text-gray-800">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header currentUser={currentUser!} onLogout={handleLogout} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default App;