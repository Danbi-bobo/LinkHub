import React, { useState } from 'react';
import { UserIcon, DepartmentIcon, TeamIcon, CategoryIcon, AuditLogIcon, LinkIcon, ProjectIcon } from '../components/Icons';
import { LinkApproval } from '../components/admin/LinkApproval';
import { UserManagement } from '../components/admin/UserManagement';
import { DepartmentManagement } from '../components/admin/DepartmentManagement';
import { TeamManagement } from '../components/admin/TeamManagement';
import { ProjectManagement } from '../components/admin/ProjectManagement';
import { CategoryManagement } from '../components/admin/CategoryManagement';

type AdminSection = 'links' | 'users' | 'departments' | 'teams' | 'projects' | 'categories' | 'logs';

const AdminCard: React.FC<{ title: string; description: string; icon: React.ReactNode; onClick: () => void }> = ({ title, description, icon, onClick }) => (
    <div className="bg-white border border-gray-200 p-6 rounded-xl hover:border-blue-500 transition-colors duration-300">
        <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full mr-4 text-blue-500">
                {icon}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
        <button 
            onClick={onClick}
            className="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-800">
            Manage &rarr;
        </button>
    </div>
);

export const Admin: React.FC = () => {
    const [activeSection, setActiveSection] = useState<AdminSection | null>(null);

    const adminSections = [
        { key: 'links' as AdminSection, title: 'Link Approval', description: 'Review, approve, or reject user-submitted links.', icon: <LinkIcon /> },
        { key: 'users' as AdminSection, title: 'User Management', description: 'Manage users, roles, and permissions.', icon: <UserIcon /> },
        { key: 'departments' as AdminSection, title: 'Department Management', description: 'Create, edit, and delete company departments.', icon: <DepartmentIcon /> },
        { key: 'teams' as AdminSection, title: 'Team Management', description: 'Organize users into teams within departments.', icon: <TeamIcon /> },
        { key: 'projects' as AdminSection, title: 'Project Management', description: 'Create and manage company projects and teams.', icon: <ProjectIcon /> },
        { key: 'categories' as AdminSection, title: 'Category Management', description: 'Define categories for organizing links.', icon: <CategoryIcon /> },
        { key: 'logs' as AdminSection, title: 'Audit Logs', description: 'View system-wide activity and changes.', icon: <AuditLogIcon /> },
    ];

     const renderContent = () => {
        switch (activeSection) {
            case 'links': return <LinkApproval />;
            case 'users': return <UserManagement />;
            case 'departments': return <DepartmentManagement />;
            case 'teams': return <TeamManagement />;
            case 'projects': return <ProjectManagement />;
            case 'categories': return <CategoryManagement />;
            case 'logs': return <div className="bg-white border border-gray-200 p-6 rounded-xl"><p>Audit logs coming soon...</p></div>;
            default:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {adminSections.map(section => (
                            <AdminCard 
                                key={section.key} 
                                title={section.title}
                                description={section.description}
                                icon={section.icon}
                                onClick={() => setActiveSection(section.key)} 
                            />
                        ))}
                    </div>
                );
        }
    };

    const currentTitle = adminSections.find(s => s.key === activeSection)?.title || "Admin Console";

    return (
        <div>
            {activeSection && (
                 <button 
                    onClick={() => setActiveSection(null)} 
                    className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 mb-6">
                    <span className="mr-2">&larr;</span>
                    Back to Admin Console
                </button>
            )}
            <h2 className="text-3xl font-bold mb-8">{currentTitle}</h2>
            {renderContent()}
        </div>
    );
};