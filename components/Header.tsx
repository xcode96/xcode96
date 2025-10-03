import React from 'react';
import { HomeIcon, ShieldCheckIcon, MenuIcon, LockIcon, LightBulbIcon, SunIcon, MoonIcon } from './Icons';
import type { Theme } from '../types';

interface HeaderProps {
  onNavigate: (view: 'home' | 'admin_login') => void;
  onMobileMenuClick: () => void;
  onSuggestToolClick: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onMobileMenuClick, onSuggestToolClick, theme, onToggleTheme }) => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200 dark:border-slate-800">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3">
          <button onClick={onMobileMenuClick} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <MenuIcon className="w-6 h-6" />
          </button>
           <div className="flex items-center gap-2">
             <div className="bg-blue-600 p-1.5 rounded-md">
                <LockIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-800 dark:text-white">XCODE96</span>
        </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center gap-6">
          <NavItem icon={HomeIcon} text="Home" onClick={() => onNavigate('home')} />
          <NavItem icon={ShieldCheckIcon} text="Admin Panel" onClick={() => onNavigate('admin_login')} />
        </div>
        
        <div className="flex items-center gap-4">
           <button
            onClick={onToggleTheme}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
           >
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
           </button>
           <button
              onClick={onSuggestToolClick}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded-md transition-colors text-sm"
            >
              <LightBulbIcon className="w-5 h-5"/>
              <span className="hidden sm:inline">Suggest a Tool</span>
            </button>
        </div>
      </div>
    </header>
  );
};

interface NavItemProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors"
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{text}</span>
    </button>
  );
};