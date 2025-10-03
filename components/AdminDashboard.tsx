import React, { useState, useRef, useMemo } from 'react';
import type { AdminUser, Tool, Category, SuggestedTool } from '../types';
import { UserIcon, ToolsIcon, DownloadIcon, UploadIcon, InboxIcon, LogoutIcon } from './Icons';
import { ToolFormModal } from './ToolFormModal';
import { SuggestionDetailModal } from './SuggestionDetailModal';
import { UserManagementPanel } from './admin/UserManagementPanel';
import { ToolManagementPanel } from './admin/ToolManagementPanel';
import { SuggestionManagementPanel } from './admin/SuggestionManagementPanel';

interface AdminDashboardProps {
  users: AdminUser[];
  onAddUser: (user: Omit<AdminUser, 'id' | 'createdAt'>) => void;
  onLogout: () => void;
  tools: Tool[];
  suggestions: SuggestedTool[];
  onApproveSuggestion: (suggestionId: string, finalToolData: Omit<Tool, 'id' | 'author'>) => void;
  onRejectSuggestion: (suggestionId: string) => void;
  categories: Category[];
  onAddTool: (tool: Omit<Tool, 'id' | 'author'>) => void;
  onEditTool: (tool: Tool) => void;
  onDeleteTool: (toolId: string) => void;
  onImport: (data: { tools: Tool[]; adminUsers: AdminUser[]; suggestions?: SuggestedTool[] }) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

type ActiveTab = 'users' | 'tools' | 'suggestions';

export const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  const { users, onLogout, tools, suggestions, onImport, showToast } = props;
  const [activeTab, setActiveTab] = useState<ActiveTab>('users');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isToolModalOpen, setIsToolModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [reviewingSuggestion, setReviewingSuggestion] = useState<SuggestedTool | null>(null);
  const [suggestionToEdit, setSuggestionToEdit] = useState<SuggestedTool | null>(null);

  const pendingSuggestionsCount = useMemo(() => suggestions.filter(s => s.status === 'pending').length, [suggestions]);

  const handleOpenAddToolModal = () => {
    setEditingTool(null);
    setSuggestionToEdit(null);
    setIsToolModalOpen(true);
  };
  
  const handleOpenEditToolModal = (tool: Tool) => {
    setEditingTool(tool);
    setSuggestionToEdit(null);
    setIsToolModalOpen(true);
  };
  
  const handleReviewClick = (suggestion: SuggestedTool) => {
    setReviewingSuggestion(suggestion);
  };

  const handleEditAndApprove = (suggestion: SuggestedTool) => {
    setReviewingSuggestion(null);
    setSuggestionToEdit(suggestion);
    // FIX: Added missing 'rating' property to the object being created for `setEditingTool`.
    setEditingTool({
        id: '', name: suggestion.name, description: suggestion.description,
        link: suggestion.link, videoUrl: suggestion.videoUrl, author: { name: 'Suggested', avatarUrl: '' },
        imageUrl: suggestion.imageUrl, category: suggestion.category, tagColor: suggestion.tagColor,
        rating: suggestion.rating,
    });
    setIsToolModalOpen(true);
  };

  const handleSaveTool = (toolData: Omit<Tool, 'id' | 'author'> | Tool) => {
    if (suggestionToEdit) {
      props.onApproveSuggestion(suggestionToEdit.suggestionId, toolData as Omit<Tool, 'id' | 'author'>);
      setSuggestionToEdit(null);
    } else if ('id' in toolData && toolData.id) {
      props.onEditTool(toolData as Tool);
    } else {
      props.onAddTool(toolData as Omit<Tool, 'id' | 'author'>);
    }
    setIsToolModalOpen(false);
    setEditingTool(null);
  };

  const handleDeleteToolClick = (toolId: string) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
        props.onDeleteTool(toolId);
    }
  }

  const handleRejectClick = (suggestionId: string) => {
     if (window.confirm('Are you sure you want to reject this tool suggestion? This will permanently delete it.')) {
        props.onRejectSuggestion(suggestionId);
        setReviewingSuggestion(null);
    }
  }

  const handleExport = () => {
    const data = { tools, adminUsers: users, suggestions };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `xcode96-backup-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => fileInputRef.current?.click();
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          if (window.confirm('This will overwrite all existing data. Are you sure?')) {
            onImport(importedData);
            showToast('Data imported successfully!');
          }
        } catch (error) {
          showToast('Failed to import data. Invalid file.', 'error');
        } finally {
            if(fileInputRef.current) fileInputRef.current.value = '';
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="text-gray-700 dark:text-gray-300">
      <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome, admin. Manage users, tools, and site data.</p>
        </div>
        <div className="flex items-center gap-3">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
            <button onClick={handleImportClick} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors text-sm">
                <UploadIcon className="w-5 h-5" /> Import
            </button>
            <button onClick={handleExport} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md transition-colors text-sm">
                <DownloadIcon className="w-5 h-5" /> Export
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition-colors text-sm"
            >
              <LogoutIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
        </div>
      </div>

      <div className="mb-8 border-b border-gray-200 dark:border-slate-700">
        <nav className="flex -mb-px space-x-6">
            <TabButton icon={UserIcon} label="User Management" isActive={activeTab === 'users'} onClick={() => setActiveTab('users')} />
            <TabButton icon={ToolsIcon} label="Tool Management" isActive={activeTab === 'tools'} onClick={() => setActiveTab('tools')} />
            <TabButton icon={InboxIcon} label="Tool Suggestions" isActive={activeTab === 'suggestions'} onClick={() => setActiveTab('suggestions')} badgeCount={pendingSuggestionsCount} />
        </nav>
      </div>

      {activeTab === 'users' && <UserManagementPanel users={props.users} onAddUser={props.onAddUser} />}
      {activeTab === 'tools' && <ToolManagementPanel tools={props.tools} onAddClick={handleOpenAddToolModal} onEditClick={handleOpenEditToolModal} onDeleteClick={handleDeleteToolClick} />}
      {activeTab === 'suggestions' && <SuggestionManagementPanel suggestions={props.suggestions} onReview={handleReviewClick} />}
    
      {isToolModalOpen && (
        <ToolFormModal 
            isOpen={isToolModalOpen}
            onClose={() => setIsToolModalOpen(false)}
            onSave={handleSaveTool}
            tool={editingTool}
            categories={props.categories.filter(c => c.id !== 'all' && c.id !== 'favorites')}
        />
      )}
      {reviewingSuggestion && (
        <SuggestionDetailModal
            isOpen={!!reviewingSuggestion}
            onClose={() => setReviewingSuggestion(null)}
            suggestion={reviewingSuggestion}
            onEditAndApprove={handleEditAndApprove}
            onReject={handleRejectClick}
        />
      )}
    </div>
  );
};

const TabButton = ({icon: Icon, label, isActive, onClick, badgeCount = 0}) => (
     <button onClick={onClick} className={`relative flex items-center gap-2 px-1 py-3 border-b-2 text-sm font-medium transition-colors ${isActive ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-slate-600'}`}>
        <Icon className="w-5 h-5" />
        {label}
        {badgeCount > 0 && (
            <span className="absolute top-1 -right-3 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">{badgeCount}</span>
        )}
    </button>
);