import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBuilding,
  FaUserGraduate,
  FaChalkboardTeacher,
    FaUserShield,
    FaBookOpen,
    FaClipboardList
}  from "react-icons/fa";
import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/DashboardCard";
import "../../styles/dashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    lecturers: 0,
    admins: 0,
    departments: 0,
    courses: 0,
    assignments: 0
  });
  const [recentStudents, setRecentStudents] = useState([]);
  const [departmentStats, setDepartmentStats] = useState([]);

 useEffect(() => {
  const fetchDashboardData = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStats(res.data.stats);
      setRecentStudents(res.data.recentStudents);
      setDepartmentStats(res.data.departmentStats);

    } catch (error) {
      console.error(error);
    }
  };

  fetchDashboardData();
}, []);

  return (
    <AdminLayout>
      <div className="page-content">
        <h1>Admin Dashboard</h1>

        <div className="stats-grid">

          <DashboardCard
    icon={<FaBuilding />}
    title="Total Departments"
    value={stats?.departments}
    subtitle="Academic Departments"
/>

<DashboardCard
    icon={<FaUserGraduate />}
    title="Total Students"
    value={stats?.students}
    subtitle="Registered Students"
/>

<DashboardCard
    icon={<FaChalkboardTeacher />}
    title="Total Lecturers"
    value={stats?.lecturers}
    subtitle="Academic Staff"
/>

         
 <DashboardCard
    icon={<FaUserShield />}
    title="Total Admins"
    value={stats?.admins}
    subtitle="System Administrators"
/>

<DashboardCard
    icon={<FaBookOpen />}
    title="Total Courses"
    value={stats?.courses}
    subtitle="Available Courses"
/>

<DashboardCard
    icon={<FaClipboardList />}
    title="Total Assignments"
    value={stats?.assignments}
    subtitle="Course Assignments"
/>

        </div>
      </div>
               {/* RECENT STUDENTS & DEPARTMENT STATS */}
          <div className="table-card">
            <h2>Recent Students</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((student) => (
                  <tr key={student._id}>
                    <td>{student.user?.name}</td>
                    <td>{student.user?.email}</td>
                    <td>{student.department?.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-card">
            <h2>Students per Department</h2>
            <table>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Student Count</th>
                </tr>
              </thead>
              <tbody>
                {departmentStats.map((dept, index) => (
                  <tr key={index}>
                    <td>{dept.department}</td>
                    <td>{dept.totalStudents}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </AdminLayout>
  );
}