import React, { useState } from 'react';
import { MOCK_TEAMS, MOCK_DEPARTMENTS, MOCK_PROJECTS } from '../../mockData';
import { Team } from '../../types';
import { EditIcon, DeleteIcon, AddIcon } from '../Icons';

export const TeamManagement: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>(MOCK_TEAMS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTeam, setCurrentTeam] = useState<Partial<Team> | null>(null);

    const openModal = (team: Partial<Team> | null = null) => {
        setCurrentTeam(team ? { ...team } : { name: '' });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!currentTeam || !currentTeam.name) return;

        if (currentTeam.id) { // Editing
            setTeams(teams.map(t => t.id === currentTeam.id ? currentTeam as Team : t));
        } else { // Adding
            const newTeam: Team = {
                ...currentTeam,
                id: `team-${Date.now()}`,
            } as Team;
            setTeams([...teams, newTeam]);
        }
        setIsModalOpen(false);
        setCurrentTeam(null);
    };

    const handleDelete = (teamId: string) => {
        if (window.confirm('Are you sure you want to delete this team?')) {
            setTeams(teams.filter(t => t.id !== teamId));
        }
    };
    
    const getParentName = (team: Team) => {
        if (team.departmentId) return `Dept: ${MOCK_DEPARTMENTS.find(d => d.id === team.departmentId)?.name || '?'}`;
        if (team.projectId) return `Proj: ${MOCK_PROJECTS.find(p => p.id === team.projectId)?.name || '?'}`;
        return 'N/A';
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex justify-end mb-4">
                 {/* Fix: Removed size prop from AddIcon as it does not accept it. */}
                 <button onClick={() => openModal()} className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg shrink-0 hover:bg-blue-700">
                    <AddIcon/> <span className="ml-2">Add Team</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Association</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map(team => (
                            <tr key={team.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{team.name}</td>
                                <td className="px-6 py-4">{getParentName(team)}</td>
                                <td className="px-6 py-4 flex gap-4">
                                    <button onClick={() => openModal(team)} className="text-gray-500 hover:text-yellow-500"><EditIcon/></button>
                                    <button onClick={() => handleDelete(team.id)} className="text-gray-500 hover:text-red-500"><DeleteIcon/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && currentTeam && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">{currentTeam.id ? 'Edit' : 'Add'} Team</h2>
                        <div className="space-y-4">
                            <input type="text" placeholder="Team Name" value={currentTeam.name || ''} onChange={e => setCurrentTeam({...currentTeam, name: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"/>
                             <select value={currentTeam.departmentId || ''} onChange={e => setCurrentTeam({...currentTeam, departmentId: e.target.value || undefined, projectId: undefined})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                                <option value="">Assign to Department...</option>
                                {MOCK_DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                            <div className="text-center text-xs text-gray-500">OR</div>
                             <select value={currentTeam.projectId || ''} onChange={e => setCurrentTeam({...currentTeam, projectId: e.target.value || undefined, departmentId: undefined})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                                <option value="">Assign to Project...</option>
                                {MOCK_PROJECTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
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