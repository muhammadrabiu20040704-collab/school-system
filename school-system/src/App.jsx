import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';
import StudentDashboard from './Pages/Student/StudentDashboard';
import LecturerDashboard from "./Pages/Lecturer/LecturerDashboard";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ProtectRoute from './components/ProtectRoute';
import DashboardLayout from './Layouts/DashboardLayout';
import Departments from "./Pages/Admin/Departments";
import Courses from "./Pages/Admin/Courses";
import Students from "./Pages/Admin/Students";
import Lecturers from "./Pages/Admin/Lecturers";


function App() {
  return (
    <Router>
      <Routes>

        {/* redirect home to register */}
        <Route path="/" element={<Navigate to="/register" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={
          <ProtectRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectRoute>
        } />
        <Route path="/lecturer-dashboard" element={
          <ProtectRoute allowedRoles={["lecturer"]}>
            <LecturerDashboard />
          </ProtectRoute>
        } />
        <Route path="/admin-dashboard" element={
          <ProtectRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectRoute>
        } />
          <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />
          <Route path="DashboardLayout" element={<DashboardLayout />} />
          <Route path="/departments" element={<ProtectRoute allowedRoles={["admin"]}>
            <Departments />
          </ProtectRoute>} />
          <Route path="/courses" element={<ProtectRoute allowedRoles={["admin"]}>
            <Courses />
          </ProtectRoute>} />
          <Route path="/students" element={<ProtectRoute allowedRoles={["admin"]}>
            <Students />
          </ProtectRoute>} />
          <Route path="/lecturers" element={<ProtectRoute allowedRoles={["admin"]}>
            <Lecturers />
          </ProtectRoute>} />
      </Routes>
    </Router>
  );
}

export default App;