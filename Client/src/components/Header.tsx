import React from 'react';
import { 
  HomeIcon, 
  UserGroupIcon,
  UserIcon, 
  CalendarIcon, 
  BuildingOfficeIcon,
  BeakerIcon, // Changed from PillIcon
  BanknotesIcon,
  DocumentChartBarIcon,
  CogIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const Side: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const mainNavigation: NavItem[] = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: <HomeIcon className="mr-3 h-6 w-6" aria-hidden="true" /> 
    },
    { 
      name: 'Appointments', 
      href: '/appointments', 
      icon: <CalendarIcon className="mr-3 h-6 w-6" aria-hidden="true" /> 
    },
    { 
      name: 'Patients', 
      href: '/patients', 
      icon: <UserIcon className="mr-3 h-6 w-6" aria-hidden="true" /> 
    },
    { 
      name: 'Doctors', 
      href: '/doctors', 
      icon: <UserPlusIcon className="mr-3 h-6 w-6" aria-hidden="true" /> 
    },
  ];
  
  const hospitalNavigation: NavItem[] = [
    { 
      name: 'Departments', 
      href: '/departments', 
      icon: <BuildingOfficeIcon className="mr-3 h-6 w-6" aria-hidden="true" /> 
    },
    { 
      name: 'Laboratory', 
      href: '/laboratory', 
      icon: <BeakerIcon className="mr-3 h-6 w-6" aria-hidden="true" /> 
    },
    { 
      name: 'Pharmacy', 
      href: '/pharmacy', 
      // Using a different SVG icon for Pharmacy instead of PillIcon
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="mr-3 h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={1.5}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" 
          />
        </svg>
      )
    },
  ];
  
  const administrationNavigation: NavItem[] = [
    { 
      name: 'Billing', 
      href: '/billing', 
      icon: <BanknotesIcon className="mr-3 h-6 w-6" aria-hidden="true" /> 
    },
    { 
      name: 'Reports', 
      href: '/reports', 
      icon: <DocumentChartBarIcon className="mr-3 h-6 w-6" aria-hidden="true" /> 
    },
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: <CogIcon className="mr-3 h-6 w-6" aria-hidden="true" /> 
    },
  ];

  // Function to check if a nav item is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Render each navigation item
  const renderNavItem = (item: NavItem) => {
    const active = isActive(item.href);
    
    return (
      <Link
        key={item.name}
        to={item.href}
        className={`${
          active
            ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-500'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        } flex items-center px-4 py-2 text-sm font-medium transition-colors duration-150 ease-in-out`}
      >
        {item.icon}
        {item.name}
      </Link>
    );
  };

  // Sidebar title component
  const NavTitle = ({ title }: { title: string }) => (
    <h3 className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {title}
    </h3>
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-20"
          onClick={onClose}
        />
      )}

      {/* Sidebar for mobile and desktop */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:sticky top-0 left-0 bottom-0 flex flex-col w-64 h-screen bg-white border-r border-gray-200 shadow-md transition-transform duration-300 ease-in-out z-30`}
      >
        {/* Logo & Close button (mobile only) */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary-600">MediCore</span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <div className="space-y-1">
            {mainNavigation.map(renderNavItem)}
          </div>

          <NavTitle title="Hospital" />
          <div className="space-y-1">
            {hospitalNavigation.map(renderNavItem)}
          </div>

          <NavTitle title="Administration" />
          <div className="space-y-1">
            {administrationNavigation.map(renderNavItem)}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="/api/placeholder/40/40"
                alt="Hospital logo"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">MediCore Hospital</p>
              <p className="text-xs font-medium text-gray-500">Management System</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Side;