import React, { useState } from 'react';
import { User } from '../../types';

interface ProfilePageProps {
  user: User;
  onUpdate: (user: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState<User>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    alert('Profile updated successfully!');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-200">My Profile</h1>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-6">
            <img className="h-24 w-24 rounded-full object-cover" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&q=80" alt="User" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-200">{user.name}</h2>
              <p className="text-gray-500 dark:text-slate-400">{user.role}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div className="mt-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Role</label>
              <input
                type="text"
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;