import React from 'react';
import type { Category } from '../types';
import { SearchIcon, LockIcon } from './Icons';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onNavigateHome: () => void;
  isMobileOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  onNavigateHome,
  isMobileOpen,
}) => {
  return (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col p-4 overflow-y-auto z-40 transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <button onClick={onNavigateHome} className="flex items-center gap-3 mb-8 px-2 text-left">
        <div className="bg-blue-600 p-2 rounded-lg">
          <LockIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          <span>XCODE96</span>
        </h1>
      </button>
      
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search tools or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <nav className="flex-1">
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => setSelectedCategory(category.name)}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2 my-1 rounded-md text-left text-sm transition-all duration-200 ${
                  selectedCategory === category.name
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-gray-600 hover:bg-slate-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                    <category.icon className="w-5 h-5"/>
                    <span>{category.name}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                    selectedCategory === category.name 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {category.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
