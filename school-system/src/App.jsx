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
import AdminLayout from "./layouts/AdminLayout";
import LecturerLayout from "./layouts/LecturerLayout";
import StudentLayout from "./layouts/StudentLayout";
import Departments from "./Pages/Admin/Departments";
import Courses from "./Pages/Admin/Courses";
import Students from "./Pages/Admin/Students";
import Lecturers from "./Pages/Admin/Lecturers";
import DepartmentCourses from "./Pages/Admin/DepartmentCourses";
import LecturerDetails from './Pages/Admin/LecturerDetails';
import AddStudent from "./Pages/Admin/AddStudentProofile";
import Users from './Pages/Admin/Users';
import Assignments from "./Pages/Lecturer/Assignments";
import MyAssignments from "./Pages/Student/MyAssignments"
import MyCourses from "./Pages/lecturer/MyCourses";
import CourseStudents from "./Pages/lecturer/CourseStudents";
import TakeAttendance from "./Pages/lecturer/TakeAttendance";

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
          <Route path="AdminLayout" element={<AdminLayout />} />
          <Route path="LecturerLayout" element={<LecturerLayout />} />
          <Route path="StudentLayout" element={<StudentLayout />} />
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
          <Route path="/departments/:id/courses" element={<ProtectRoute allowedRoles={["admin"]}>
            <DepartmentCourses />
          </ProtectRoute>} />
          <Route path="/admin/users"element={<ProtectRoute allowedRoles={["admin"]}>
              <Users />
          </ProtectRoute>} />
          <Route path="/lecturers/:id"element={<LecturerDetails/>}/>
          <Route path="/students/add"element={<AddStudent/>} />
          <Route path="/lecturer/assignments"element={<ProtectRoute allowedRoles={["lecturer"]}>
            <Assignments/>
           </ProtectRoute>} />
           <Route path="/Student/MyAssignments"element={<ProtectRoute allowedRoles={["student"]}>
            <MyAssignments/>
           </ProtectRoute>} />
           <Route path="/lecturer/my-courses" element={<MyCourses />} />
           <Route path="/lecturer/courses/:courseId/students" element={<CourseStudents />} />
           <Route path="/lecturer/attendance/:courseId" element={<TakeAttendance />}/>
      </Routes>
    </Router>
  );
}

export default App;