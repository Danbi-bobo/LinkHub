import React, { useState, useMemo } from 'react';
import { MOCK_LINKS, MOCK_USERS, MOCK_CATEGORIES } from '../../mockData';
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
        <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">URL</th>
                            <th scope="col" className="px-6 py-3">Submitter</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Submitted On</th>
                            <th scope="col" className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingLinks.map(link => {
                            const submitter = MOCK_USERS.find(u => u.id === link.creatorId);
                            const category = MOCK_CATEGORIES.find(c => c.id === link.categoryId);
                            return (
                                <tr key={link.id} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {link.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{link.url}</a>
                                    </td>
                                    <td className="px-6 py-4">{submitter?.name || 'Unknown'}</td>
                                    <td className="px-6 py-4">{category?.name || 'N/A'}</td>
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
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {pendingLinks.length === 0 && (
                <p className="text-center text-gray-500 py-8">No pending links to review.</p>
            )}
        </div>
    );
};