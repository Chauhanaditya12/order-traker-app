// src/components/SideMenu.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Warehouse,
  Truck,
  PackageCheck,
  LogOut,
  Package,
  LayoutDashboard,
} from 'lucide-react';

const SideMenu = ({ setStatusFilter, activeFilter }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getButtonClass = (filterName) => {
    return `flex items-center w-full px-4 py-3 text-sm font-medium rounded-md ${
      activeFilter === filterName
        ? 'bg-indigo-700 text-white'
        : 'text-indigo-100 hover:bg-indigo-500 hover:text-white'
    }`;
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-indigo-600">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4 space-x-2">
            <Package className="h-8 w-8 text-white" />
            <span className="text-white text-xl font-bold">TrackIt</span>
          </div>
          
          {/* User Welcome */}
          <div className="px-4 mt-6">
            <p className="text-sm text-indigo-200">Welcome,</p>
            <p className="text-base font-medium text-white break-words">
              {user?.email || 'Manager'}
            </p>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-2 flex-1 space-y-2">
            <button
              onClick={() => setStatusFilter('')}
              className={getButtonClass('')}
            >
              <LayoutDashboard className="mr-3 h-6 w-6" />
              All Orders
            </button>
            <button
              onClick={() => setStatusFilter('In Warehouse')}
              className={getButtonClass('In Warehouse')}
            >
              <Warehouse className="mr-3 h-6 w-6" />
              In Warehouse
            </button>
            <button
              onClick={() => setStatusFilter('On the Way')}
              className={getButtonClass('On the Way')}
            >
              <Truck className="mr-3 h-6 w-6" />
              On the Way
            </button>
            <button
              onClick={() => setStatusFilter('Delivered')}
              className={getButtonClass('Delivered')}
            >
              <PackageCheck className="mr-3 h-6 w-6" />
              Delivered
            </button>
          </nav>
        </div>
        
        {/* Logout Button */}
        <div className="flex-shrink-0 flex border-t border-indigo-700 p-2">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-500 hover:text-white group"
          >
            <LogOut className="mr-3 h-6 w-6 text-indigo-200 group-hover:text-white" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;