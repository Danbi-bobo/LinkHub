import React, { useState, useMemo } from 'react';
import { MOCK_LINKS } from '../../mockData';
import { Link, LinkStatus } from '../../types';
import { ApproveIcon, RejectIcon } from '../Icons';

export const LinkApproval: React.FC = () => {
    const [links, setLinks] = useState<Link[]>(MOCK_LINKS);

    const pendingLinks = useMemo(() =>
        links.filter(link => link.status === LinkStatus.PENDING),
        [links]
    );

    const handleUpdateStatus = (linkId: string, newStatus: LinkStatus.APPROVED | LinkStatus.REJECTED) => {
        setLinks(currentLinks =>
            currentLinks.map(link =>
                link.id === linkId ? { ...link, status: newStatus } : link
            )
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">URL</th>
                            <th scope="col" className="px-6 py-3">Submitted On</th>
                            <th scope="col" className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingLinks.map(link => (
                            <tr key={link.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {link.title}
                                </th>
                                <td className="px-6 py-4">
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{link.url}</a>
                                </td>
                                <td className="px-6 py-4">{link.createdAt.toLocaleDateString()}</td>
                                <td className="px-6 py-4 flex items-center justify-center gap-4">
                                    <button onClick={() => handleUpdateStatus(link.id, LinkStatus.APPROVED)} className="flex items-center text-green-600 hover:text-green-800" title="Approve">
                                        <ApproveIcon /> <span className="ml-1 hidden sm:inline">Approve</span>
                                    </button>
                                    <button onClick={() => handleUpdateStatus(link.id, LinkStatus.REJECTED)} className="flex items-center text-red-600 hover:text-red-800" title="Reject">
                                        <RejectIcon /> <span className="ml-1 hidden sm:inline">Reject</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {pendingLinks.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">No pending links to review.</p>
            )}
        </div>
    );
};