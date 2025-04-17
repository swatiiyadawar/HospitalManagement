import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Users,
  Stethoscope,     // ✅ Replaces 'UserMd'
  Calendar,
  Package,
  Bed,
  TestTube          // ✅ Replaces 'Flask'
} from 'lucide-react';

const Sidebar = ({ isSidebarOpen }) => {
  const sidebarVariants = {
    open: { width: '240px', transition: { duration: 0.3 } },
    closed: { width: '80px', transition: { duration: 0.3 } }
  };

  const menuItems = [
    {
      section: 'Main',
      items: [
        { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
        { name: 'Patients', path: '/patients', icon: <Users size={20} /> },
        { name: 'Doctors', path: '/doctors', icon: <Stethoscope size={20} /> },
        { name: 'Appointments', path: '/appointments', icon: <Calendar size={20} /> },
      ]
    },
    {
      section: 'Hospital',
      items: [
        { name: 'Inventory', path: '/inventory', icon: <Package size={20} /> },
        { name: 'Room Allotment', path: '/rooms', icon: <Bed size={20} /> },
        { name: 'Lab Tests', path: '/lab-tests', icon: <TestTube size={20} /> },
      ]
    }
  ];

  return (
    <motion.div
      className="h-full bg-white shadow-md overflow-hidden"
      variants={sidebarVariants}
      animate={isSidebarOpen ? 'open' : 'closed'}
      initial={isSidebarOpen ? 'open' : 'closed'}
    >
      <div className="p-4 flex items-center justify-center">
        <img
          src="/api/placeholder/40/40"
          alt="Hospital Logo"
          className="h-10"
        />
        {isSidebarOpen && (
          <motion.h1
            className="text-xl font-bold ml-2 text-blue-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            MedCare
          </motion.h1>
        )}
      </div>
      <div className="mt-6">
        {menuItems.map((section, index) => (
          <div key={index} className="mb-6">
            {isSidebarOpen && (
              <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {section.section}
              </h2>
            )}
            <ul>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <span className="mr-3">{item.icon}</span>
                    {isSidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="font-medium"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
