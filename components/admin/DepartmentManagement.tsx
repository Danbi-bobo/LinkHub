import React, { useState } from 'react';
import { MOCK_DEPARTMENTS } from '../../mockData';
import { Department } from '../../types';
import { EditIcon, DeleteIcon, AddIcon } from '../Icons';

export const DepartmentManagement: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>(MOCK_DEPARTMENTS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDept, setCurrentDept] = useState<Partial<Department> | null>(null);

    const openModal = (dept: Partial<Department> | null = null) => {
        setCurrentDept(dept ? { ...dept } : { name: '' });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!currentDept || !currentDept.name) return;

        if (currentDept.id) { // Editing
            setDepartments(departments.map(d => d.id === currentDept.id ? currentDept as Department : d));
        } else { // Adding
            const newDept: Department = {
                ...currentDept,
                id: `dept-${Date.now()}`,
            } as Department;
            setDepartments([...departments, newDept]);
        }
        setIsModalOpen(false);
        setCurrentDept(null);
    };

    const handleDelete = (deptId: string) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            setDepartments(departments.filter(d => d.id !== deptId));
        }
    };
    
    const getParentName = (parentId?: string) => {
        if (!parentId) return 'N/A';
        return departments.find(d => d.id === parentId)?.name || 'Unknown';
    };

    return (
        <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <div className="flex justify-end mb-4">
                 <button onClick={() => openModal()} className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 hover:bg-blue-600">
                    <AddIcon/> <span className="ml-2">Add Department</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Parent Department</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(dept => (
                            <tr key={dept.id} className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-gray-900">{dept.name}</td>
                                <td className="px-6 py-4">{getParentName(dept.parentId)}</td>
                                <td className="px-6 py-4 flex gap-4">
                                    <button onClick={() => openModal(dept)} className="text-gray-500 hover:text-yellow-500"><EditIcon/></button>
                                    <button onClick={() => handleDelete(dept.id)} className="text-gray-500 hover:text-red-500"><DeleteIcon/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && currentDept && (
                 <div className="fixed inset-0 bg-white bg-opacity-75 z-40 flex justify-center items-center backdrop-blur-sm">
                    <div className="bg-white rounded-lg border border-gray-200 p-8 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">{currentDept.id ? 'Edit' : 'Add'} Department</h2>
                        <div className="space-y-4">
                            <input type="text" placeholder="Department Name" value={currentDept.name || ''} onChange={e => setCurrentDept({...currentDept, name: e.target.value})} className="w-full p-2 border rounded border-gray-300"/>
                             <select value={currentDept.parentId || ''} onChange={e => setCurrentDept({...currentDept, parentId: e.target.value || undefined})} className="w-full p-2 border rounded border-gray-300">
                                <option value="">No Parent Department</option>
                                {departments.filter(d => d.id !== currentDept.id).map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};