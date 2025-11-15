import React, { useState, useMemo, useEffect } from 'react';
import { Link, Category, LinkStatus, LinkVisibility, Department, Team } from '../types';
import { MOCK_CATEGORIES, MOCK_DEPARTMENTS, MOCK_TEAMS, MOCK_PROJECTS, MOCK_USERS } from '../mockData';

interface CreateLinkModalProps {
    onClose: () => void;
    onCreate: (linkData: Omit<Link, 'id' | 'shortUrl' | 'clicks' | 'creatorId' | 'createdAt' | 'status'>) => void;
}

const SearchableMultiSelect: React.FC<{
    label: string,
    items: any[],
    selectedItems: string[],
    onSelectionChange: (ids: string[]) => void,
    displayFormatter: (item: any) => string,
    idField: string,
}> = ({ label, items, selectedItems, onSelectionChange, displayFormatter, idField }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = useMemo(() =>
        items.filter(item =>
            displayFormatter(item).toLowerCase().includes(searchTerm.toLowerCase())
        ), [items, searchTerm, displayFormatter]
    );

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIds = Array.from(e.target.selectedOptions, option => option.value);
        onSelectionChange(selectedIds);
    };

    return (
        <div>
            <label htmlFor={idField} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type="search"
                placeholder={`Search ${label.toLowerCase()}...`}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="mt-1 mb-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <select
                id={idField}
                multiple
                value={selectedItems}
                onChange={handleSelectChange}
                className="mt-1 block w-full h-24 px-3 py-2 bg-white border border-gray-300 rounded-md"
            >
                {filteredItems.map(item => <option key={item[idField]} value={item[idField]}>{displayFormatter(item)}</option>)}
            </select>
        </div>
    );
};

export const CreateLinkModal: React.FC<CreateLinkModalProps> = ({ onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(MOCK_CATEGORIES[0].id);
    const [tags, setTags] = useState('');
    const [visibility, setVisibility] = useState<LinkVisibility>(LinkVisibility.PUBLIC);
    const [allowedDepartmentIds, setAllowedDepartmentIds] = useState<string[]>([]);
    const [allowedTeamIds, setAllowedTeamIds] = useState<string[]>([]);
    const [allowedProjectIds, setAllowedProjectIds] = useState<string[]>([]);
    const [allowedUserIds, setAllowedUserIds] = useState<string[]>([]);
    
    // New states for "By Team" filtering
    const [teamFilterType, setTeamFilterType] = useState<'all' | 'project' | 'department'>('all');
    const [teamFilterId, setTeamFilterId] = useState<string>('');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !url) return;
        onCreate({ 
            title, 
            url, 
            description, 
            categoryId, 
            tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
            visibility,
            allowedDepartmentIds: visibility === LinkVisibility.DEPARTMENT ? allowedDepartmentIds : undefined,
            allowedTeamIds: (visibility === LinkVisibility.TEAM || visibility === LinkVisibility.PROJECT) ? allowedTeamIds : undefined,
            allowedProjectIds: visibility === LinkVisibility.PROJECT ? allowedProjectIds : undefined,
            allowedUserIds: visibility === LinkVisibility.PRIVATE ? allowedUserIds : undefined,
        });
    };
    
    const getDepartmentDisplayName = (dept: Department): string => {
        if (dept.parentId) {
            const parent = MOCK_DEPARTMENTS.find(d => d.id === dept.parentId);
            return `${dept.name} (${parent?.name || 'Sub-department'})`;
        }
        return dept.name;
    };

    const getTeamDisplayName = (team: Team): string => {
        if (team.departmentId) {
            const parent = MOCK_DEPARTMENTS.find(d => d.id === team.departmentId);
            return `${team.name} (${parent?.name || 'Department'})`;
        }
        if (team.projectId) {
            const parent = MOCK_PROJECTS.find(p => p.id === team.projectId);
            return `${team.name} (${parent?.name || 'Project'})`;
        }
        return team.name;
    };

    const filteredTeamsForSelection = useMemo(() => {
        if (teamFilterType === 'all' || !teamFilterId) {
            return MOCK_TEAMS;
        }
        if (teamFilterType === 'project') {
            return MOCK_TEAMS.filter(team => team.projectId === teamFilterId);
        }
        if (teamFilterType === 'department') {
            return MOCK_TEAMS.filter(team => team.departmentId === teamFilterId);
        }
        return MOCK_TEAMS;
    }, [teamFilterType, teamFilterId]);

    const teamsInSelectedProjects = useMemo(() => {
        if (allowedProjectIds.length === 0) return [];
        const selectedProjectIds = new Set(allowedProjectIds);
        return MOCK_TEAMS.filter(team => team.projectId && selectedProjectIds.has(team.projectId));
    }, [allowedProjectIds]);
    
    useEffect(() => {
        // Reset specific selections when visibility type changes to avoid keeping irrelevant data
        setAllowedDepartmentIds([]);
        setAllowedTeamIds([]);
        setAllowedProjectIds([]);
        setAllowedUserIds([]);
        setTeamFilterType('all');
        setTeamFilterId('');
    }, [visibility]);

    useEffect(() => {
        if (visibility === LinkVisibility.PROJECT) {
            // When the selected projects change, filter the selected teams to only include those
            // that are part of the currently selected projects.
            const validTeamIdsInProjects = new Set(teamsInSelectedProjects.map(t => t.id));
            setAllowedTeamIds(currentTeams => currentTeams.filter(teamId => validTeamIdsInProjects.has(teamId)));
        }
    }, [allowedProjectIds, visibility, teamsInSelectedProjects]);


    return (
        <div className="fixed inset-0 bg-white bg-opacity-75 z-40 flex justify-center items-center backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-lg border border-gray-200 p-8 w-full max-w-2xl transform transition-all" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a New Link</h2>
                <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                                {MOCK_CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                        <input
                            type="url" id="url" value={url} onChange={(e) => setUrl(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://example.com" required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                     <div className="mt-4">
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                        <input
                            type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g. urgent, frontend, docs"
                        />
                         <p className="text-xs text-gray-500 mt-1">Comma-separated values.</p>
                    </div>
                    
                    <div className="mt-6 p-4 border rounded-md border-gray-200 space-y-4">
                        <h3 className="text-lg font-medium text-gray-800">Visibility</h3>
                         <div>
                            <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">Access Level</label>
                            <select
                                id="visibility" value={visibility} onChange={(e) => setVisibility(e.target.value as LinkVisibility)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                                <option value={LinkVisibility.PUBLIC}>Public</option>
                                <option value={LinkVisibility.DEPARTMENT}>By Department</option>
                                <option value={LinkVisibility.TEAM}>By Team</option>
                                <option value={LinkVisibility.PROJECT}>By Project & Teams</option>
                                <option value={LinkVisibility.PRIVATE}>Specific Users</option>
                            </select>
                        </div>

                        {visibility === LinkVisibility.DEPARTMENT && (
                            <SearchableMultiSelect 
                                label="Select Departments"
                                items={MOCK_DEPARTMENTS}
                                selectedItems={allowedDepartmentIds}
                                onSelectionChange={setAllowedDepartmentIds}
                                displayFormatter={getDepartmentDisplayName}
                                idField="id"
                            />
                        )}
                        {visibility === LinkVisibility.TEAM && (
                             <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <select
                                        value={teamFilterType}
                                        onChange={e => {
                                            setTeamFilterType(e.target.value as any);
                                            setTeamFilterId(''); // Reset selection on type change
                                        }}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    >
                                        <option value="all">Filter by...</option>
                                        <option value="department">Department</option>
                                        <option value="project">Project</option>
                                    </select>
                                    
                                    <select
                                        value={teamFilterId}
                                        onChange={e => setTeamFilterId(e.target.value)}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        disabled={teamFilterType === 'all'}
                                    >
                                        <option value="">Select a {teamFilterType}...</option>
                                        {teamFilterType === 'department' && MOCK_DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{getDepartmentDisplayName(d)}</option>)}
                                        {teamFilterType === 'project' && MOCK_PROJECTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                </div>
                                <SearchableMultiSelect 
                                    label="Select Teams"
                                    items={filteredTeamsForSelection}
                                    selectedItems={allowedTeamIds}
                                    onSelectionChange={setAllowedTeamIds}
                                    displayFormatter={getTeamDisplayName}
                                    idField="id"
                                />
                            </div>
                        )}
                        {visibility === LinkVisibility.PROJECT && (
                             <div className="space-y-4">
                                <SearchableMultiSelect 
                                    label="Select Projects"
                                    items={MOCK_PROJECTS}
                                    selectedItems={allowedProjectIds}
                                    onSelectionChange={setAllowedProjectIds}
                                    displayFormatter={(proj) => proj.name}
                                    idField="id"
                                />
                                {allowedProjectIds.length > 0 && (
                                    <SearchableMultiSelect 
                                        label="Select Teams within selected Project(s)"
                                        items={teamsInSelectedProjects}
                                        selectedItems={allowedTeamIds}
                                        onSelectionChange={setAllowedTeamIds}
                                        displayFormatter={getTeamDisplayName}
                                        idField="id"
                                    />
                                )}
                            </div>
                        )}
                        {visibility === LinkVisibility.PRIVATE && (
                             <SearchableMultiSelect 
                                label="Select Users"
                                items={MOCK_USERS}
                                selectedItems={allowedUserIds}
                                onSelectionChange={setAllowedUserIds}
                                displayFormatter={(user) => user.name}
                                idField="id"
                            />
                        )}
                    </div>


                    <div className="flex justify-end gap-4 mt-8">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Create Link</button>
                    </div>
                </form>
            </div>
        </div>
    );
};