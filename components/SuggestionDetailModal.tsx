import React from 'react';
import type { SuggestedTool } from '../types';
import { CheckCircleIcon, XCircleIcon } from './Icons';

interface SuggestionDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    suggestion: SuggestedTool;
    onEditAndApprove: (suggestion: SuggestedTool) => void;
    onReject: (suggestionId: string) => void;
}

const colorMap = {
  red: 'bg-red-100 text-red-700',
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  purple: 'bg-purple-100 text-purple-700',
  indigo: 'bg-indigo-100 text-indigo-700',
  pink: 'bg-pink-100 text-pink-700',
};

export const SuggestionDetailModal: React.FC<SuggestionDetailModalProps> = ({ isOpen, onClose, suggestion, onEditAndApprove, onReject }) => {
    if (!isOpen) return null;

    const tagColorClass = colorMap[suggestion.tagColor] || colorMap.blue;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white border border-gray-200 rounded-xl w-full max-w-2xl shadow-2xl animate-fade-in-up" onClick={e => e.stopPropagation()}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Review Tool Suggestion</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <p className="text-sm font-bold text-gray-600 mb-2">Tool Image</p>
                            <img src={suggestion.imageUrl} alt={suggestion.name} className="w-full aspect-video object-cover rounded-lg border border-gray-200" />
                        </div>

                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <p className="text-sm font-bold text-gray-600">Tool Name</p>
                                <p className="text-gray-800">{suggestion.name}</p>
                            </div>
                             <div>
                                <p className="text-sm font-bold text-gray-600">Description</p>
                                <p className="text-gray-800 text-sm">{suggestion.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-bold text-gray-600">Category</p>
                                    <p className="text-gray-800">{suggestion.category}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-600">Tag Color</p>
                                     <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${tagColorClass}`}>
                                        {suggestion.tagColor}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-600">Tool Link</p>
                                <a href={suggestion.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{suggestion.link}</a>
                            </div>
                             {suggestion.videoUrl && (
                                <div>
                                    <p className="text-sm font-bold text-gray-600">Video URL</p>
                                    <a href={suggestion.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{suggestion.videoUrl}</a>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div className="bg-slate-50 px-6 py-3 flex justify-end gap-3 rounded-b-xl border-t border-gray-200">
                    <button type="button" onClick={() => onReject(suggestion.suggestionId)} className="text-sm bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition-colors flex items-center gap-2">
                        <XCircleIcon className="w-5 h-5" /> Reject
                    </button>
                    <button type="button" onClick={() => onEditAndApprove(suggestion)} className="text-sm bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md transition-colors flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5" /> Edit & Approve
                    </button>
                </div>
            </div>
        </div>
    );
};