import React, { useState, useEffect, useRef } from 'react';
import { User } from '../../types';

interface HeaderProps {
  onSearch: (query: string) => void;
  user: User;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, user, onNavigate }) => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  return (
    <header className="h-16 flex-shrink-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center">
          <button className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
          <div className="relative ml-4 md:ml-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none"><path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </span>
            <input
              ref={searchInputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full pl-10 pr-4 py-2 border border-transparent rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search clients..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-sm text-gray-400 dark:text-slate-500 border border-gray-300 dark:border-slate-600 rounded px-1.5 py-0.5">⌘ K</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-5">
            <button className="p-2 text-gray-500 dark:text-slate-400 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-600 focus:outline-none" onClick={() => alert('Messages clicked!')}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </button>
            <button className="p-2 text-gray-500 dark:text-slate-400 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-600 focus:outline-none relative" onClick={() => alert('Notifications clicked!')}>
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                 <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <div className="relative" ref={profileRef}>
                <button onClick={() => setProfileOpen(!isProfileOpen)} className="flex items-center focus:outline-none">
                    <img className="h-9 w-9 rounded-full object-cover" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=40&h=40&fit=crop&q=80" alt="User" />
                    <div className="ml-3 text-left">
                        <p className="text-sm font-medium text-gray-700 dark:text-slate-300">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400">{user.role}</p>
                    </div>
                     <button className="ml-4 text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                     </button>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-20">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('Profile'); setProfileOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700">My Profile</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('Settings'); setProfileOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700">Settings</a>
                    <div className="border-t border-gray-100 dark:border-slate-700"></div>
                    <a href="#" onClick={(e) => e.preventDefault()} className="block px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700">Logout</a>
                  </div>
                )}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;