import React, { useState } from 'react';
import { MOCK_USERS, MOCK_DEPARTMENTS, MOCK_TEAMS } from '../../mockData';
import { User, UserRole } from '../../types';
import { EditIcon, DeleteIcon, AddIcon } from '../Icons';

export const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null);

    const openModal = (user: Partial<User> | null = null) => {
        setCurrentUser(user ? { ...user } : { role: UserRole.USER, departmentId: '', teamId: '' });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!currentUser || !currentUser.name || !currentUser.email) return;

        if (currentUser.id) { // Editing
            setUsers(users.map(u => u.id === currentUser.id ? currentUser as User : u));
        } else { // Adding
            const newUser: User = {
                ...currentUser,
                id: `user-${Date.now()}`,
                avatar: `https://picsum.photos/seed/${currentUser.name}/100/100`,
            } as User;
            setUsers([...users, newUser]);
        }
        setIsModalOpen(false);
        setCurrentUser(null);
    };

    const handleDelete = (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== userId));
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex justify-end mb-4">
                {/* Fix: Removed size prop from AddIcon as it does not accept it. */}
                <button onClick={() => openModal()} className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg shrink-0 hover:bg-blue-700">
                    <AddIcon/> <span className="ml-2">Add User</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Department</th>
                            <th className="px-6 py-3">Team</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4 capitalize">{user.role}</td>
                                <td className="px-6 py-4">{MOCK_DEPARTMENTS.find(d => d.id === user.departmentId)?.name}</td>
                                <td className="px-6 py-4">{MOCK_TEAMS.find(t => t.id === user.teamId)?.name}</td>
                                <td className="px-6 py-4 flex gap-4">
                                    <button onClick={() => openModal(user)} className="text-gray-500 hover:text-yellow-500"><EditIcon/></button>
                                    <button onClick={() => handleDelete(user.id)} className="text-gray-500 hover:text-red-500"><DeleteIcon/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && currentUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">{currentUser.id ? 'Edit' : 'Add'} User</h2>
                        <div className="space-y-4">
                            <input type="text" placeholder="Name" value={currentUser.name || ''} onChange={e => setCurrentUser({...currentUser, name: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"/>
                            <input type="email" placeholder="Email" value={currentUser.email || ''} onChange={e => setCurrentUser({...currentUser, email: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"/>
                            <select value={currentUser.role} onChange={e => setCurrentUser({...currentUser, role: e.target.value as UserRole})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                                {Object.values(UserRole).map(role => <option key={role} value={role}>{role}</option>)}
                            </select>
                            <select value={currentUser.departmentId} onChange={e => setCurrentUser({...currentUser, departmentId: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                                <option value="">Select Department</option>
                                {MOCK_DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                             <select value={currentUser.teamId} onChange={e => setCurrentUser({...currentUser, teamId: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                                <option value="">Select Team</option>
                                {MOCK_TEAMS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
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