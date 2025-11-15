import React, { useMemo, useState } from 'react';
import { User, Link, LinkStatus } from '../types';
import { MOCK_LINKS } from '../mockData';
import { EditIcon, DeleteIcon } from '../components/Icons';

interface MyLinksProps {
    currentUser: User;
}

const StatusBadge: React.FC<{ status: LinkStatus }> = ({ status }) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full capitalize";
    const statusClasses = {
        [LinkStatus.APPROVED]: "bg-green-100 text-green-800",
        [LinkStatus.PENDING]: "bg-yellow-100 text-yellow-800",
        [LinkStatus.REJECTED]: "bg-red-100 text-red-800",
        [LinkStatus.ARCHIVED]: "bg-gray-100 text-gray-800",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

export const MyLinks: React.FC<MyLinksProps> = ({ currentUser }) => {
    const [links, setLinks] = useState<Link[]>(MOCK_LINKS);
    const [currentPage, setCurrentPage] = useState(1);
    const [linksPerPage] = useState(10); // Set items per page

    const userLinks = useMemo(() =>
        links.filter(link => link.creatorId === currentUser.id)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
        [links, currentUser.id]
    );

    // Pagination Logic
    const indexOfLastLink = currentPage * linksPerPage;
    const indexOfFirstLink = indexOfLastLink - linksPerPage;
    const currentLinks = userLinks.slice(indexOfFirstLink, indexOfLastLink);
    const totalPages = Math.ceil(userLinks.length / linksPerPage);

    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers.map(number => (
            <li key={number}>
                <button
                    onClick={() => paginate(number)}
                    aria-current={currentPage === number ? 'page' : undefined}
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                        currentPage === number
                            ? 'z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                >
                    {number}
                </button>
            </li>
        ));
    };

    return (
        <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">My Links</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">Short URL</th>
                            <th scope="col" className="px-6 py-3">Clicks</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Created</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLinks.map(link => (
                            <tr key={link.id} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {link.title}
                                </th>
                                <td className="px-6 py-4">
                                    <a href="#" className="text-blue-500">{link.shortUrl}</a>
                                </td>
                                <td className="px-6 py-4">{link.clicks}</td>
                                <td className="px-6 py-4"><StatusBadge status={link.status} /></td>
                                <td className="px-6 py-4">{link.createdAt.toLocaleDateString()}</td>
                                <td className="px-6 py-4 flex items-center gap-4">
                                    <button className="text-gray-500 hover:text-yellow-500"><EditIcon/></button>
                                    <button className="text-gray-500 hover:text-red-500"><DeleteIcon/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {userLinks.length === 0 && (
                <p className="text-center text-gray-500 py-8">You haven't created any links yet.</p>
            )}
             {userLinks.length > linksPerPage && (
                <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500">
                        Showing
                        <span className="font-semibold text-gray-900 mx-1">{indexOfFirstLink + 1}-{Math.min(indexOfLastLink, userLinks.length)}</span>
                        of
                        <span className="font-semibold text-gray-900 mx-1">{userLinks.length}</span>
                    </span>
                    <ul className="inline-flex items-center -space-x-px">
                        <li>
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                            >
                                Previous
                            </button>
                        </li>
                        {renderPageNumbers()}
                        <li>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};