import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <div className="ml-4 relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              className="block w-full bg-gray-100 border border-transparent rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-300"
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="flex items-center">
          {currentUser ? (
            <div className="flex items-center">
              <button className="p-2 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none">
                <Bell size={20} />
              </button>
              <div className="flex items-center cursor-pointer" onClick={() => navigate('/profile')}>
                <img
                  src="/api/placeholder/36/36" 
                  alt="User Avatar"
                  className="h-9 w-9 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="ml-2 hidden md:block">
                  <p className="text-sm font-medium text-gray-700">{currentUser.displayName}</p>
                  <p className="text-xs text-gray-500">{currentUser.role || 'Admin'}</p>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;