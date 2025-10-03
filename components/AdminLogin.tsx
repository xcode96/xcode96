import React, { useState } from 'react';
import { ShieldCheckIcon } from './Icons';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (username === 'admin' && password === 'dqadm') {
      onLoginSuccess();
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-8 text-center">
            <div className="inline-block bg-slate-100 p-4 rounded-full mb-4">
                <ShieldCheckIcon className="w-10 h-10 text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel Login</h1>
            <p className="text-gray-500 text-sm">Access the control panel</p>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="username"
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
              type="submit"
            >
              Sign In
            </button>
          </div>
           <div className="text-center mt-6">
              <a className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-700" href="#">
                Forgot Password?
              </a>
            </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 XCODE96 Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};