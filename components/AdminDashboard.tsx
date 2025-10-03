import React, { useState, useRef } from 'react';
import type { AdminUser, Tool, Category } from '../types';
import { UserPlusIcon, LogoutIcon, UserIcon, ToolsIcon, PencilIcon, TrashIcon, DownloadIcon, UploadIcon, PlusIcon } from './Icons';
import { ToolFormModal } from './ToolFormModal';

interface AdminDashboardProps {
  users: AdminUser[];
  onAddUser: (user: Omit<AdminUser, 'id' | 'createdAt'>) => void;
  onLogout: () => void;
  tools: Tool[];
  categories: Category[];
  onAddTool: (tool: Omit<Tool, 'id' | 'author'>) => void;
  onEditTool: (tool: Tool) => void;
  onDeleteTool: (toolId: string) => void;
  onImport: (data: { tools: Tool[]; adminUsers: AdminUser[] }) => void;
}

type ActiveTab = 'users' | 'tools';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
    users, onAddUser, onLogout, tools, categories, onAddTool, onEditTool, onDeleteTool, onImport
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('users');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // User form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Admin' | 'Super Admin'>('Admin');

  // Tool modal state
  const [isToolModalOpen, setIsToolModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert('Please fill all fields.');
      return;
    }
    onAddUser({ username, email, role });
    // Reset form
    setUsername('');
    setEmail('');
    setPassword('');
    setRole('Admin');
  };

  const handleOpenAddToolModal = () => {
    setEditingTool(null);
    setIsToolModalOpen(true);
  };
  
  const handleOpenEditToolModal = (tool: Tool) => {
    setEditingTool(tool);
    setIsToolModalOpen(true);
  };

  const handleSaveTool = (toolData: Omit<Tool, 'id' | 'author'> | Tool) => {
    if ('id' in toolData) {
      onEditTool(toolData);
    } else {
      onAddTool(toolData);
    }
    setIsToolModalOpen(false);
  };

  const handleDeleteToolClick = (toolId: string) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
        onDeleteTool(toolId);
    }
  }

  const handleExport = () => {
    const data = {
        tools,
        adminUsers: users,
    };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `xcode96-backup-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result;
          if (typeof text === 'string') {
            const importedData = JSON.parse(text);
            if (window.confirm('Are you sure you want to import this data? This will overwrite all existing tools and users.')) {
              onImport(importedData);
              alert('Data imported successfully!');
            }
          }
        } catch (error) {
          console.error('Error parsing JSON file:', error);
          alert('Failed to import data. Please check the file format.');
        } finally {
            // Reset file input to allow re-uploading the same file
            if(fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
      };
      reader.readAsText(file);
    }
  };


  return (
    <div className="text-gray-700">
      <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome, admin. Manage users, tools, and site data.</p>
        </div>
        <div className="flex items-center gap-3">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
            <button onClick={handleImportClick} className="flex items-center gap-2 bg-white border border-blue-300 text-blue-600 hover:bg-blue-50 font-semibold px-4 py-2 rounded-md transition-colors text-sm">
                <UploadIcon className="w-5 h-5" /> Import
            </button>
            <button onClick={handleExport} className="flex items-center gap-2 bg-white border border-green-300 text-green-600 hover:bg-green-50 font-semibold px-4 py-2 rounded-md transition-colors text-sm">
                <DownloadIcon className="w-5 h-5" /> Export
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-white border border-red-300 text-red-600 hover:bg-red-50 font-semibold px-4 py-2 rounded-md transition-colors"
            >
              <LogoutIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
        </div>
      </div>

      {/* TABS */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="flex -mb-px space-x-6">
            <TabButton icon={UserIcon} label="User Management" isActive={activeTab === 'users'} onClick={() => setActiveTab('users')} />
            <TabButton icon={ToolsIcon} label="Tool Management" isActive={activeTab === 'tools'} onClick={() => setActiveTab('tools')} />
        </nav>
      </div>

      {/* CONTENT */}
      {activeTab === 'users' && <UserManagementPanel users={users} onAddUserSubmit={handleAddUserSubmit} username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword} role={role} setRole={setRole} />}
      {activeTab === 'tools' && <ToolManagementPanel tools={tools} onAddClick={handleOpenAddToolModal} onEditClick={handleOpenEditToolModal} onDeleteClick={handleDeleteToolClick} />}
    
      {isToolModalOpen && (
        <ToolFormModal 
            isOpen={isToolModalOpen}
            onClose={() => setIsToolModalOpen(false)}
            onSave={handleSaveTool}
            tool={editingTool}
            categories={categories.filter(c => c.id !== 'all')}
        />
      )}
    </div>
  );
};

// Tab Button Component
const TabButton = ({icon: Icon, label, isActive, onClick}) => (
     <button onClick={onClick} className={`flex items-center gap-2 px-1 py-3 border-b-2 text-sm font-medium transition-colors ${isActive ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
        <Icon className="w-5 h-5" />
        {label}
    </button>
)

// User Management Panel Component
const UserManagementPanel = ({users, onAddUserSubmit, username, setUsername, email, setEmail, password, setPassword, role, setRole}) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
        <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <UserPlusIcon className="w-6 h-6 text-blue-500"/>
                Create New Admin User
            </h2>
            <form onSubmit={onAddUserSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-username">Username</label>
                    <input value={username} onChange={e => setUsername(e.target.value)} className="bg-slate-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-900 focus:ring-blue-500 focus:border-blue-500" id="new-username" type="text" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-email">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="bg-slate-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-900 focus:ring-blue-500 focus:border-blue-500" id="new-email" type="email" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} className="bg-slate-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-900 focus:ring-blue-500 focus:border-blue-500" id="new-password" type="password" required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-role">Role</label>
                    <select value={role} onChange={e => setRole(e.target.value as 'Admin' | 'Super Admin')} id="new-role" className="bg-slate-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-900 focus:ring-blue-500 focus:border-blue-500">
                        <option>Admin</option>
                        <option>Super Admin</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                    Add User
                </button>
            </form>
        </div>

        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl">
            <div className="p-6">
                 <h2 className="text-xl font-bold text-gray-900 mb-4">Current Administrators</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Username</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Date Added</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-gray-200 hover:bg-slate-50/50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{user.username}</th>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'Super Admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
)

// Tool Management Panel Component
const ToolManagementPanel = ({ tools, onAddClick, onEditClick, onDeleteClick }) => (
    <div className="bg-white border border-gray-200 rounded-xl animate-fade-in">
        <div className="p-6 flex justify-between items-center">
             <h2 className="text-xl font-bold text-gray-900">Manage Tools</h2>
             <button onClick={onAddClick} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors text-sm">
                <PlusIcon className="w-5 h-5"/>
                Add New Tool
             </button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Tool Name</th>
                        <th scope="col" className="px-6 py-3">Category</th>
                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tools.map(tool => (
                        <tr key={tool.id} className="border-b border-gray-200 hover:bg-slate-50/50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{tool.name}</th>
                            <td className="px-6 py-4">{tool.category}</td>
                            <td className="px-6 py-4 text-right space-x-2">
                                <button onClick={() => onEditClick(tool)} className="p-1.5 text-gray-500 hover:text-blue-600 rounded-md hover:bg-gray-100 transition-colors">
                                    <PencilIcon className="w-4 h-4" />
                                </button>
                                <button onClick={() => onDeleteClick(tool.id)} className="p-1.5 text-gray-500 hover:text-red-600 rounded-md hover:bg-gray-100 transition-colors">
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)
