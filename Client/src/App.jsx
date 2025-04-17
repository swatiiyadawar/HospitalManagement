import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <AuthProvider>
      <Router>
        <div className="flex h-screen bg-gray-100">
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className="flex-1 overflow-y-auto p-4">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;