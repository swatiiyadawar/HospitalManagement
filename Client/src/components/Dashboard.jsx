import React from 'react';
import { motion } from 'framer-motion';
import { Users, Stethoscope, Calendar, Activity, TrendingUp, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const stats = [
    { title: "Total Patients", value: "1,248", icon: <Users size={24} />, color: "bg-blue-500" },
    { title: "Doctors", value: "36", icon: <Stethoscope size={24} />, color: "bg-green-500" },
    { title: "Appointments", value: "42", icon: <Calendar size={24} />, color: "bg-purple-500" },
    { title: "Patient Recovery", value: "89%", icon: <Activity size={24} />, color: "bg-yellow-500" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Hospital Dashboard</h1>
        <p className="text-gray-600">Welcome to the MedCare Hospital Management System</p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex items-center"
            variants={itemVariants}
          >
            <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="bg-white rounded-lg shadow-md col-span-2"
          variants={itemVariants}
        >
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Patient Statistics</h2>
          </div>
          <div className="p-6 h-64 flex items-center justify-center">
            <p className="text-gray-500">Chart will be displayed here</p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg shadow-md"
          variants={itemVariants}
        >
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              {[1, 2, 3, 4].map((_, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-blue-100 p-2 rounded-full mr-3">
                    <Activity size={16} className="text-blue-600" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">Patient admitted to room 304</p>
                    <p className="text-xs text-gray-500">30 minutes ago</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
