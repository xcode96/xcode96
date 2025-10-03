import React, { useState, useEffect } from 'react';
import type { Tool, Category, TagColor } from '../types';
import { tagColors } from '../constants';

interface ToolFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (tool: Omit<Tool, 'id' | 'author'> | Tool) => void;
    tool: Tool | null;
    categories: Category[];
}

export const ToolFormModal: React.FC<ToolFormModalProps> = ({ isOpen, onClose, onSave, tool, categories }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        link: '',
        category: categories[0]?.name || '',
        tagColor: 'blue' as TagColor,
    });
    const [errors, setErrors] = useState<{ name?: string, description?: string }>({});

    useEffect(() => {
        if (tool) {
            setFormData({
                name: tool.name,
                description: tool.description,
                imageUrl: tool.imageUrl,
                link: tool.link,
                category: tool.category,
                tagColor: tool.tagColor,
            });
        } else {
             setFormData({
                name: '',
                description: '',
                imageUrl: '',
                link: '',
                category: categories[0]?.name || '',
                tagColor: 'blue' as TagColor,
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

    const validateForm = () => {
        const newErrors: { name?: string, description?: string } = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Tool name cannot be empty.';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description cannot be empty.';
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

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white border border-gray-200 rounded-xl w-full max-w-lg shadow-2xl animate-fade-in-up" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">{tool ? 'Edit Tool' : 'Add New Tool'}</h2>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Tool Name</label>
                            <input value={formData.name} onChange={handleChange} name="name" className={`bg-slate-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`} id="name" type="text" />
                            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                            <textarea value={formData.description} onChange={handleChange} name="description" rows={3} className={`bg-slate-50 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`} id="description" />
                            {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">Image URL</label>
                            <input value={formData.imageUrl} onChange={handleChange} name="imageUrl" className="bg-slate-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" id="imageUrl" type="url" required />
                        </div>

                         <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">Tool Link</label>
                            <input value={formData.link} onChange={handleChange} name="link" className="bg-slate-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" id="link" type="url" required />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                             <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
                                <select value={formData.category} onChange={handleChange} name="category" id="category" className="bg-slate-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                                </select>
                            </div>

                             <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tagColor">Tag Color</label>
                                <select value={formData.tagColor} onChange={handleChange} name="tagColor" id="tagColor" className="bg-slate-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                            Save Tool
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};