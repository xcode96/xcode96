import React from 'react';
import { EyeIcon } from '../Icons';
import type { SuggestedTool } from '../../types';

interface SuggestionManagementPanelProps {
    suggestions: SuggestedTool[];
    onReview: (suggestion: SuggestedTool) => void;
}

export const SuggestionManagementPanel: React.FC<SuggestionManagementPanelProps> = ({ suggestions, onReview }) => {
    const pendingSuggestions = suggestions.filter(s => s.status === 'pending');

    return (
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl animate-fade-in">
            <div className="p-6">
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pending Tool Suggestions</h2>
                 {pendingSuggestions.length === 0 && <p className="text-gray-500 dark:text-gray-400 mt-2">There are no pending suggestions.</p>}
            </div>
            {pendingSuggestions.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-slate-50 dark:bg-slate-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Tool Name</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Link</th>
                                <th scope="col" className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingSuggestions.map(suggestion => (
                                <tr key={suggestion.suggestionId} className="border-b border-gray-200 dark:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-700/50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{suggestion.name}</th>
                                    <td className="px-6 py-4">{suggestion.category}</td>
                                    <td className="px-6 py-4">
                                        <a href={suggestion.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                            View Link
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => onReview(suggestion)} className="flex items-center gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700 font-semibold px-3 py-1.5 rounded-md transition-colors text-xs">
                                            <EyeIcon className="w-4 h-4" /> Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
};