import React, { useState, useEffect } from 'react';
import type { Tool, Category, TagColor } from '../types';
import { tagColors } from '../constants';
import { StarFilledIcon } from './Icons';

interface ToolFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (tool: Omit<Tool, 'id' | 'author'> | Tool) => void;
    tool: Tool | null;
    categories: Category[];
}

const getRatingColorClass = (rating: number): string => {
    switch (rating) {
        case 1: return 'text-red-500';
        case 2: return 'text-yellow-400';
        case 3: return 'text-green-500';
        case 4: return 'text-blue-600';
        case 5: return 'text-purple-600';
        default: return 'text-gray-300 dark:text-slate-600';
    }
};

export const ToolFormModal: React.FC<ToolFormModalProps> = ({ isOpen, onClose, onSave, tool, categories }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        link: '',
        videoUrl: '',
        category: categories[0]?.name || '',
        tagColor: 'blue' as TagColor,
        rating: 0,
    });
    const [errors, setErrors] = useState<{ name?: string, description?: string, videoUrl?: string }>({});
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        if (tool) {
            setFormData({
                name: tool.name,
                description: tool.description,
                imageUrl: tool.imageUrl,
                link: tool.link,
                videoUrl: tool.videoUrl || '',
                category: tool.category,
                tagColor: tool.tagColor,
                rating: tool.rating || 0,
            });
        } else {
             setFormData({
                name: '',
                description: '',
                imageUrl: '',
                link: '',
                videoUrl: '',
                category: categories[0]?.name || '',
                tagColor: 'blue' as TagColor,
                rating: 0,
            });
        }
        setErrors({});
    }, [tool, isOpen, categories]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name as keyof typeof errors];
                return newErrors;
            });
        }
    };

    const handleRatingChange = (newRating: number) => {
        setFormData(prev => ({...prev, rating: newRating}));
    }

    const validateForm = () => {
        const newErrors: { name?: string, description?: string, videoUrl?: string } = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Tool name cannot be empty.';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description cannot be empty.';
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
            const dataToSave = tool ? { ...tool, ...formData } : formData;
            onSave(dataToSave);
        }
    };
    
    if (!isOpen) return null;

    const inputClasses = `bg-slate-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg w-full py-2 px-3 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`;
    const errorBorder = `border-red-500 dark:border-red-500`;
    const displayRating = hoverRating || formData.rating;
    const ratingColorClass = getRatingColorClass(displayRating);

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl w-full max-w-lg shadow-2xl animate-fade-in-up" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{tool ? 'Edit Tool' : 'Add New Tool'}</h2>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">Tool Name</label>
                            <input value={formData.name} onChange={handleChange} name="name" className={`${inputClasses} ${errors.name ? errorBorder : ''}`} id="name" type="text" />
                            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="description">Description</label>
                            <textarea value={formData.description} onChange={handleChange} name="description" rows={3} className={`${inputClasses} ${errors.description ? errorBorder : ''}`} id="description" />
                            {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="imageUrl">Image URL</label>
                            <input value={formData.imageUrl} onChange={handleChange} name="imageUrl" className={inputClasses} id="imageUrl" type="url" required />
                        </div>

                         <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="link">Tool Link</label>
                            <input value={formData.link} onChange={handleChange} name="link" className={inputClasses} id="link" type="url" required />
                        </div>

                         <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="videoUrl">Video URL (Optional)</label>
                            <input value={formData.videoUrl} onChange={handleChange} name="videoUrl" className={`${inputClasses} ${errors.videoUrl ? errorBorder : ''}`} id="videoUrl" type="url" />
                             {errors.videoUrl && <p className="text-red-600 text-xs mt-1">{errors.videoUrl}</p>}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                             <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="category">Category</label>
                                <select value={formData.category} onChange={handleChange} name="category" id="category" className={inputClasses}>
                                    {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                                </select>
                            </div>

                             <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="tagColor">Tag Color</label>
                                <select value={formData.tagColor} onChange={handleChange} name="tagColor" id="tagColor" className={inputClasses}>
                                    {tagColors.map(color => <option key={color} value={color} className="capitalize">{color}</option>)}
                                </select>
                            </div>
                        </div>
                        
                        <div className="mb-4">
                           <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Rating</label>
                            <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        type="button"
                                        key={star}
                                        onClick={() => handleRatingChange(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        className="p-0.5"
                                        aria-label={`Set rating to ${star} stars`}
                                    >
                                        <StarFilledIcon className={`w-6 h-6 transition-colors ${
                                            displayRating >= star 
                                            ? ratingColorClass 
                                            : 'text-gray-300 dark:text-slate-600'
                                        }`} />
                                    </button>
                                ))}
                            </div>
                        </div>


                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-3 flex justify-end gap-3 rounded-b-xl border-t border-gray-200 dark:border-slate-700">
                        <button type="button" onClick={onClose} className="text-sm bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-gray-200 font-semibold px-4 py-2 rounded-md transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors">
                            Save Tool
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
