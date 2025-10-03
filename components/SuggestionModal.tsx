import React, { useState, useEffect } from 'react';
import type { Category, SuggestedTool, TagColor } from '../types';
import { tagColors } from '../constants';

interface SuggestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (suggestion: Omit<SuggestedTool, 'suggestionId' | 'status'>) => void;
    categories: Category[];
}

const initialFormData = {
    name: '',
    description: '',
    imageUrl: '',
    link: '',
    videoUrl: '',
    category: '',
    tagColor: tagColors[0] as TagColor,
};

export const SuggestionModal: React.FC<SuggestionModalProps> = ({ isOpen, onClose, onSave, categories }) => {
    const [formData, setFormData] = useState({
        ...initialFormData,
        category: categories[0]?.name || '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (isOpen) {
             setFormData({
                ...initialFormData,
                category: categories[0]?.name || '',
            });
            setErrors({});
        }
    }, [isOpen, categories]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name.trim()) newErrors.name = 'Tool name cannot be empty.';
        if (!formData.description.trim()) newErrors.description = 'Description cannot be empty.';
        if (!formData.link.trim()) newErrors.link = 'Tool link cannot be empty.';
        try {
            new URL(formData.link);
        } catch (_) {
            newErrors.link = 'Please enter a valid URL.';
        }
        if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL cannot be empty.';
         try {
            new URL(formData.imageUrl);
        } catch (_) {
            newErrors.imageUrl = 'Please enter a valid URL.';
        }
        if (formData.videoUrl && !formData.videoUrl.startsWith('http')) {
             try {
                new URL(formData.videoUrl);
            } catch (_) {
                newErrors.videoUrl = 'Please enter a valid URL.';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(formData);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white border border-gray-200 rounded-xl w-full max-w-lg shadow-2xl animate-fade-in-up" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Suggest a New Tool</h2>
                        <p className="text-sm text-gray-500 mb-6">Your submission will be reviewed by an administrator.</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sugg-name">Tool Name</label>
                                <input value={formData.name} onChange={handleChange} name="name" className={`bg-slate-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`} id="sugg-name" type="text" />
                                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sugg-description">Description</label>
                                <textarea value={formData.description} onChange={handleChange} name="description" rows={3} className={`bg-slate-50 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`} id="sugg-description" />
                                {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
                            </div>
                            
                            <div className="sm:col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sugg-link">Tool Link (URL)</label>
                                <input value={formData.link} onChange={handleChange} name="link" className={`bg-slate-50 border ${errors.link ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`} id="sugg-link" type="url" />
                                {errors.link && <p className="text-red-600 text-xs mt-1">{errors.link}</p>}
                            </div>

                             <div className="sm:col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sugg-imageUrl">Image URL</label>
                                <input value={formData.imageUrl} onChange={handleChange} name="imageUrl" className={`bg-slate-50 border ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`} id="sugg-imageUrl" type="url" />
                                {errors.imageUrl && <p className="text-red-600 text-xs mt-1">{errors.imageUrl}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sugg-videoUrl">Video URL (Optional)</label>
                                <input value={formData.videoUrl} onChange={handleChange} name="videoUrl" className={`bg-slate-50 border ${errors.videoUrl ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`} id="sugg-videoUrl" type="url" />
                                {errors.videoUrl && <p className="text-red-600 text-xs mt-1">{errors.videoUrl}</p>}
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sugg-category">Category</label>
                                <select value={formData.category} onChange={handleChange} name="category" id="sugg-category" className="bg-slate-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sugg-tagColor">Tag Color</label>
                                <select value={formData.tagColor} onChange={handleChange} name="tagColor" id="sugg-tagColor" className="bg-slate-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    {tagColors.map(color => <option key={color} value={color} className="capitalize">{color}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 px-6 py-3 flex justify-end gap-3 rounded-b-xl border-t border-gray-200">
                        <button type="button" onClick={onClose} className="text-sm bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors">
                            Submit Suggestion
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};