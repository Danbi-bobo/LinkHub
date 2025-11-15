import React, { useState } from 'react';
import { MOCK_CATEGORIES } from '../../mockData';
import { Category } from '../../types';
import { EditIcon, DeleteIcon, AddIcon } from '../Icons';

export const CategoryManagement: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<Partial<Category> | null>(null);

    const openModal = (category: Partial<Category> | null = null) => {
        setCurrentCategory(category ? { ...category } : { name: '', icon: '' });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!currentCategory || !currentCategory.name) return;

        if (currentCategory.id) { // Editing
            setCategories(categories.map(c => c.id === currentCategory.id ? currentCategory as Category : c));
        } else { // Adding
            const newCategory: Category = {
                ...currentCategory,
                id: `cat-${Date.now()}`,
            } as Category;
            setCategories([...categories, newCategory]);
        }
        setIsModalOpen(false);
        setCurrentCategory(null);
    };

    const handleDelete = (categoryId: string) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            setCategories(categories.filter(c => c.id !== categoryId));
        }
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex justify-end mb-4">
                 {/* Fix: Removed size prop from AddIcon as it does not accept it. */}
                 <button onClick={() => openModal()} className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg shrink-0 hover:bg-blue-700">
                    <AddIcon/> <span className="ml-2">Add Category</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Icon</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4 text-xl">{category.icon}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{category.name}</td>
                                <td className="px-6 py-4 flex gap-4">
                                    <button onClick={() => openModal(category)} className="text-gray-500 hover:text-yellow-500"><EditIcon/></button>
                                    <button onClick={() => handleDelete(category.id)} className="text-gray-500 hover:text-red-500"><DeleteIcon/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && currentCategory && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">{currentCategory.id ? 'Edit' : 'Add'} Category</h2>
                        <div className="space-y-4">
                            <input type="text" placeholder="Category Name" value={currentCategory.name || ''} onChange={e => setCurrentCategory({...currentCategory, name: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"/>
                            <input type="text" placeholder="Icon (e.g., 💻)" value={currentCategory.icon || ''} onChange={e => setCurrentCategory({...currentCategory, icon: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"/>
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