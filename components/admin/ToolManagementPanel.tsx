import React from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '../Icons';
import type { Tool } from '../../types';

interface ToolManagementPanelProps {
    tools: Tool[];
    onAddClick: () => void;
    onEditClick: (tool: Tool) => void;
    onDeleteClick: (toolId: string) => void;
}

export const ToolManagementPanel: React.FC<ToolManagementPanelProps> = ({ tools, onAddClick, onEditClick, onDeleteClick }) => (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl animate-fade-in">
        <div className="p-6 flex justify-between items-center">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Tools</h2>
             <button onClick={onAddClick} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md transition-colors text-sm">
                <PlusIcon className="w-5 h-5"/>
                Add New Tool
             </button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-slate-50 dark:bg-slate-700/50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Tool Name</th>
                        <th scope="col" className="px-6 py-3">Category</th>
                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tools.map(tool => (
                        <tr key={tool.id} className="border-b border-gray-200 dark:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-700/50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{tool.name}</th>
                            <td className="px-6 py-4">{tool.category}</td>
                            <td className="px-6 py-4 text-right space-x-2">
                                <button onClick={() => onEditClick(tool)} className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                                    <PencilIcon className="w-4 h-4" />
                                </button>
                                <button onClick={() => onDeleteClick(tool.id)} className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);