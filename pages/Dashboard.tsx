import React, { useState, useMemo, useEffect } from 'react';
import { Link, User, LinkStatus, Category, UserRole } from '../types';
import { MOCK_LINKS, MOCK_CATEGORIES } from '../mockData';
import { LinkCard } from '../components/LinkCard';
import { CreateLinkModal } from '../components/CreateLinkModal';
import { AddIcon, SearchIcon } from '../components/Icons';

interface DashboardProps {
    currentUser: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
    const [links, setLinks] = useState<Link[]>(MOCK_LINKS);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [linksPerPage] = useState(12);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);
    
    const visibleLinks = useMemo(() => 
        links.filter(link => 
            link.status === LinkStatus.APPROVED || (link.status === LinkStatus.PENDING)
        ),
        [links]
    );

    const filteredLinks = useMemo(() => {
        const lowercasedTerm = searchTerm.toLowerCase();
        return visibleLinks.filter(link =>
            link.title.toLowerCase().includes(lowercasedTerm) ||
            link.description.toLowerCase().includes(lowercasedTerm) ||
            link.url.toLowerCase().includes(lowercasedTerm) ||
            link.tags?.some(tag => tag.toLowerCase().includes(lowercasedTerm))
        )
    }, [visibleLinks, searchTerm]);
    
    // Pagination Logic
    const indexOfLastLink = currentPage * linksPerPage;
    const indexOfFirstLink = indexOfLastLink - linksPerPage;
    const currentLinks = filteredLinks.slice(indexOfFirstLink, indexOfLastLink);
    const totalPages = Math.ceil(filteredLinks.length / linksPerPage);

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
                            ? 'z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                >
                    {number}
                </button>
            </li>
        ));
    };


    const handleCreateLink = (newLinkData: Omit<Link, 'id' | 'shortUrl' | 'clicks' | 'creatorId' | 'createdAt' | 'status'>) => {
        const newLink: Link = {
            ...newLinkData,
            id: `link-${Date.now()}`,
            shortUrl: `lh.co/${Math.random().toString(36).substring(7)}`,
            clicks: 0,
            creatorId: currentUser.id,
            createdAt: new Date(),
            status: currentUser.role === UserRole.ADMIN ? LinkStatus.APPROVED : LinkStatus.PENDING,
        };
        setLinks(prevLinks => [newLink, ...prevLinks]);
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full sm:w-auto flex-grow sm:max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Search links, tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-full bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-600 rounded-full shrink-0 sm:w-auto hover:bg-blue-700"
                >
                    <AddIcon />
                    <span className="ml-2">Create Link</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentLinks.map(link => (
                    <LinkCard key={link.id} link={link} currentUser={currentUser} />
                ))}
                 {filteredLinks.length === 0 && (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No links found.</p>
                    </div>
                )}
            </div>
            
            {filteredLinks.length > linksPerPage && (
                 <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 pt-8" aria-label="Dashboard navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Showing
                        <span className="font-semibold text-gray-900 dark:text-white mx-1">{indexOfFirstLink + 1}-{Math.min(indexOfLastLink, filteredLinks.length)}</span>
                        of
                        <span className="font-semibold text-gray-900 dark:text-white mx-1">{filteredLinks.length}</span>
                    </span>
                    <ul className="inline-flex items-center -space-x-px">
                        <li>
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                            >
                                Previous
                            </button>
                        </li>
                        {renderPageNumbers()}
                        <li>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}

            {isModalOpen && (
                <CreateLinkModal
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleCreateLink}
                />
            )}
        </div>
    );
};
