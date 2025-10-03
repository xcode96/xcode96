import React, { useState } from 'react';
import { UserPlusIcon } from '../Icons';
import type { AdminUser } from '../../types';

interface UserManagementPanelProps {
    users: AdminUser[];
    onAddUser: (user: Omit<AdminUser, 'id' | 'createdAt'>) => void;
}

export const UserManagementPanel: React.FC<UserManagementPanelProps> = ({ users, onAddUser }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'Admin' | 'Super Admin'>('Admin');

    const handleAddUserSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !email || !password) {
          alert('Please fill all fields.');
          return;
        }
        onAddUser({ username, email, password, role });
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('Admin');
    };

    const inputClasses = "bg-slate-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg w-full py-2 px-3 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 h-fit">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <UserPlusIcon className="w-6 h-6 text-green-500"/>
                    Create New Admin User
                </h2>
                <form onSubmit={handleAddUserSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="new-username">Username</label>
                        <input value={username} onChange={e => setUsername(e.target.value)} className={inputClasses} id="new-username" type="text" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="new-email">Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} className={inputClasses} id="new-email" type="email" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="new-password">Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} className={inputClasses} id="new-password" type="password" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="new-role">Role</label>
                        <select value={role} onChange={e => setRole(e.target.value as 'Admin' | 'Super Admin')} id="new-role" className={inputClasses}>
                            <option>Admin</option>
                            <option>Super Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        Add User
                    </button>
                </form>
            </div>

            <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl">
                <div className="p-6">
                     <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Current Administrators</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-slate-50 dark:bg-slate-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Username</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3">Date Added</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b border-gray-200 dark:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-700/50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{user.username}</th>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'Super Admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'}`}>
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
    );
};