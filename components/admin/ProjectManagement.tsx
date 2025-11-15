import React, { useState } from 'react';
import { MOCK_PROJECTS } from '../../mockData';
import { Project } from '../../types';
import { EditIcon, DeleteIcon, AddIcon } from '../Icons';

export const ProjectManagement: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(null);

    const openModal = (project: Partial<Project> | null = null) => {
        setCurrentProject(project ? { ...project } : { name: '' });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!currentProject || !currentProject.name) return;

        if (currentProject.id) { // Editing
            setProjects(projects.map(p => p.id === currentProject.id ? currentProject as Project : p));
        } else { // Adding
            const newProject: Project = {
                ...currentProject,
                id: `proj-${Date.now()}`,
            } as Project;
            setProjects([...projects, newProject]);
        }
        setIsModalOpen(false);
        setCurrentProject(null);
    };

    const handleDelete = (projectId: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            setProjects(projects.filter(p => p.id !== projectId));
        }
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex justify-end mb-4">
                 {/* Fix: Removed size prop from AddIcon as it does not accept it. */}
                 <button onClick={() => openModal()} className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg shrink-0 hover:bg-blue-700">
                    <AddIcon/> <span className="ml-2">Add Project</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{project.name}</td>
                                <td className="px-6 py-4 flex gap-4">
                                    <button onClick={() => openModal(project)} className="text-gray-500 hover:text-yellow-500"><EditIcon/></button>
                                    <button onClick={() => handleDelete(project.id)} className="text-gray-500 hover:text-red-500"><DeleteIcon/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && currentProject && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">{currentProject.id ? 'Edit' : 'Add'} Project</h2>
                        <div className="space-y-4">
                            <input type="text" placeholder="Project Name" value={currentProject.name || ''} onChange={e => setCurrentProject({...currentProject, name: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"/>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500">Cancel</button>
                            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};