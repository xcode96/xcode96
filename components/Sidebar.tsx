import React from 'react';
import type { Category } from '../types';
import { SearchIcon, LockIcon, StarIcon, StarFilledIcon } from './Icons';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onNavigateHome: () => void;
  isMobileOpen: boolean;
  minRating: number;
  setMinRating: (rating: number) => void;
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

export const Sidebar: React.FC<SidebarProps> = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  onNavigateHome,
  isMobileOpen,
  minRating,
  setMinRating,
}) => {
  
  const ratingColorClass = getRatingColorClass(minRating);

  return (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col p-4 overflow-y-auto z-40 transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <button onClick={onNavigateHome} className="flex items-center gap-2.5 mb-6 px-2 text-left">
        <div className="bg-blue-600 p-1.5 rounded-md">
          <LockIcon className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          <span>XCODE96</span>
        </h1>
      </button>
      
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder="Search tools or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    ? 'bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                    <category.icon className="w-5 h-5"/>
                    <span>{category.name}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                    selectedCategory === category.name 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-slate-300'
                }`}>
                  {category.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

       <div className="pt-4 mt-auto border-t border-gray-200 dark:border-slate-800">
        <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Filter by Rating</h3>
        <div className="px-3 flex items-center justify-between">
            <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} onClick={() => setMinRating(minRating === star ? 0 : star)} className="p-0.5" aria-label={`Filter by ${star} stars and up`}>
                        {star <= minRating ? <StarFilledIcon className={`w-5 h-5 ${ratingColorClass}`} /> : <StarIcon className="w-5 h-5 text-gray-300 dark:text-slate-600 hover:text-yellow-400"/>}
                    </button>
                ))}
            </div>
            {minRating > 0 && (
                <button onClick={() => setMinRating(0)} className="text-xs text-blue-600 dark:text-blue-500 hover:underline font-semibold">Clear</button>
            )}
        </div>
      </div>
    </aside>
  );
};