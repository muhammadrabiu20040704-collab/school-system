import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
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

          <div className="stat-card">
            <h3>Total Departments</h3>
            <p>{stats?.departments}</p>
          </div>

          <div className="stat-card">
            <h3>Total Students</h3>
            <p>{stats?.students}</p>
          </div>

          <div className="stat-card">
            <h3>Total Lecturers</h3>
            <p>{stats?.lecturers}</p>
          </div>

          <div className="stat-card">
            <h3>Total Admins</h3>
            <p>{stats?.admins}</p>
          </div>

          <div className="stat-card">
            <h3>Total Courses</h3>
            <p>{stats?.courses}</p>
          </div>

          <div className="stat-card">
            <h3>Total Assignments</h3>
            <p>{stats?.assignments}</p>
          </div>

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