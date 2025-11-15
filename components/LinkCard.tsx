import React, { useState, useEffect, useMemo } from 'react';
import { QRCodeCanvas as QRCode } from 'qrcode.react';
import { Link, User, UserRole, LinkStatus } from '../types';
import { MOCK_USERS, MOCK_CATEGORIES } from '../mockData';
import { CopyIcon, QRIcon, EditIcon, DeleteIcon, ApproveIcon, RejectIcon } from './Icons';

interface LinkCardProps {
    link: Link;
    currentUser: User;
}

const Modal: React.FC<{onClose: () => void; children: React.ReactNode; title: string}> = ({onClose, children, title}) => (
     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm text-center" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            {children}
            <button onClick={onClose} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Close</button>
        </div>
    </div>
);


export const LinkCard: React.FC<LinkCardProps> = ({ link, currentUser }) => {
    const [showQR, setShowQR] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const qrSize = useMemo(() => {
        if (windowWidth < 640) { // Mobile
            return 128;
        }
        if (windowWidth < 1024) { // Tablet
            return 160;
        }
        return 200; // Desktop
    }, [windowWidth]);

    const creator = MOCK_USERS.find(u => u.id === link.creatorId);
    const category = MOCK_CATEGORIES.find(c => c.id === link.categoryId);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Add a toast notification here in a real app
    };

    const handleApprove = () => console.log(`Approving link ${link.id}`);
    const handleReject = () => console.log(`Rejecting link ${link.id}`);
    const handleEdit = () => console.log(`Editing link ${link.id}`);
    const handleDelete = () => console.log(`Deleting link ${link.id}`);


    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
            <div className="p-5 flex-grow">
                <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{category?.icon || '🔗'}</span>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">{link.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 h-10 overflow-hidden">{link.description}</p>
                
                <div className="mb-3">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm break-all">{link.url}</a>
                </div>

                {link.tags && link.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {link.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs font-medium text-purple-800 bg-purple-100 rounded-full dark:bg-purple-900 dark:text-purple-200">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}


                <div className="flex items-center mt-auto">
                    <img src={creator?.avatar} alt={creator?.name} className="w-8 h-8 rounded-full mr-2" />
                    <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{creator?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {link.createdAt.toLocaleDateString()}
                        </p>
                    </div>
                    <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">{link.clicks} clicks</div>
                </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3 flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <button onClick={() => copyToClipboard(link.shortUrl)} className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400" title="Copy Shortlink"><CopyIcon /></button>
                    <button onClick={() => setShowQR(true)} className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400" title="Show QR Code"><QRIcon /></button>
                </div>
                 {currentUser.role === UserRole.ADMIN && (
                    <div className="flex items-center gap-2">
                        {link.status === LinkStatus.PENDING ? (
                            <>
                                <button onClick={handleApprove} className="flex items-center px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800 transition-colors">
                                    <ApproveIcon />
                                    <span className="ml-1">Approve</span>
                                </button>
                                <button onClick={handleReject} className="flex items-center px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 transition-colors">
                                    <RejectIcon />
                                    <span className="ml-1">Reject</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleEdit} className="text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400" title="Edit Link"><EditIcon /></button>
                                <button onClick={handleDelete} className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400" title="Delete Link"><DeleteIcon /></button>
                            </>
                        )}
                    </div>
                )}
            </div>

            {showQR && (
                <Modal onClose={() => setShowQR(false)} title="Link QR Code">
                    <div className="p-4 bg-white inline-block rounded-lg">
                        <QRCode value={link.url} size={qrSize} />
                    </div>
                    <p className="mt-4 text-sm font-semibold">{link.shortUrl}</p>
                </Modal>
            )}
        </div>
    );
};