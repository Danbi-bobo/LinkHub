import React from 'react';
import { LogoIcon } from '../components/Icons';
import { getAuthorizationUrl } from '../larkAuth';

interface LoginProps {
    onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const handleLarkLogin = () => {
        const authUrl = getAuthorizationUrl();
        window.location.href = authUrl;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <div className="flex items-center justify-center mb-5">
                    <LogoIcon size={10} />
                    <h1 className="font-bold text-center text-3xl ml-4 text-gray-800">LinkHub</h1>
                </div>

                <div className="bg-white border border-gray-200 w-full rounded-lg divide-y divide-gray-200">
                    <div className="px-5 py-7">
                        {/* Lark OAuth Login */}
                        <button 
                            type="button" 
                            onClick={handleLarkLogin}
                            className="transition duration-200 bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-3 rounded-lg text-sm font-semibold text-center mb-4 flex items-center justify-center"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                            </svg>
                            Sign in with Lark
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Traditional Login (Demo) */}
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                        <input type="text" defaultValue="admin@linkhub.com" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-50 border-gray-300" />
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                        <input type="password" defaultValue="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-50 border-gray-300" />
                        <button type="button" onClick={onLogin} className="transition duration-200 bg-gray-500 hover:bg-gray-600 focus:bg-gray-700 focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm font-semibold text-center inline-block">
                            <span className="inline-block mr-2">Demo Login</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                    </svg>
                                    <span className="inline-block ml-1">Forgot Password</span>
                                </button>
                            </div>
                            <div className="text-center sm:text-right whitespace-nowrap">
                                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-bottom">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="inline-block ml-1">Help</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};