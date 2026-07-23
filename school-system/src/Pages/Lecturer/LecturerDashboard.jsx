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

import DashboardCard from "../../components/DashboardCard";

import LecturerLayout from "../../layouts/LecturerLayout";
import "../../styles/dashboard.css";

export default function LecturerDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const fetchDashboard = async () => {

        try {

            const res = await axios.get(

                "http://localhost:3000/api/lecturer-dashboard",

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            setDashboard(res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchDashboard();

    }, []);

    if (loading) {

        return (

            <LecturerLayout>

                <h2>Loading...</h2>

            </LecturerLayout>

        );

    }

    if (!dashboard) {

        return (

            <LecturerLayout>

                <h2>No Data</h2>

            </LecturerLayout>

        );

    }

    return (

        <LecturerLayout>

            <div className="page-content">

                <h1>Lecturer Dashboard</h1>

                <div className="stats-grid">

                   
                         <DashboardCard
                            icon={<FaBuilding />}
                            title="Total Departments"
                            value={dashboard.stats.totalDepartments}
                            subtitle="Academic Departments"
                        />
                        

                        
                        <DashboardCard
                            icon={<FaBookOpen />}
                            title="Total Courses"
                            value={dashboard.stats.totalCourses}
                            subtitle="Available Courses"
                        />
                        
                        <DashboardCard
                            icon={<FaClipboardList />}
                            title="Total Assignments"
                            value={dashboard.stats.totalAssignments}
                            subtitle="Course Assignments"
                        />
                

                </div>

                <div className="table-card">

                    <h2>Students Per Department</h2>

                    <table>

                        <thead>

                            <tr>

                                <th>Department</th>

                                <th>Total Courses</th>

                                <th>Total Students</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                dashboard.departmentStats.length > 0 ?

                                    dashboard.departmentStats.map((dept) => (

                                        <tr key={dept.department._id}>

                                            <td>

                                                {dept.department.name}

                                            </td>

                                            <td>

                                                {dept.totalCourses}

                                            </td>

                                            <td>

                                                {dept.totalStudents}

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td colSpan="3">

                                            No Department Found

                                        </td>

                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

                <div className="table-card">

                    <h2>

                        Recent Assignments

                    </h2>

                    <table>

                        <thead>

                            <tr>

                                <th>Title</th>

                                <th>Course</th>

                                <th>Deadline</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                dashboard.recentAssignments.length > 0 ?

                                    dashboard.recentAssignments.map((assignment) => (

                                        <tr key={assignment._id}>

                                            <td>

                                                {assignment.title}

                                            </td>

                                            <td>

                                                {assignment.course?.title}

                                            </td>

                                            <td>

                                                {

                                                    assignment.deadline ?

                                                        new Date(

                                                            assignment.deadline

                                                        ).toLocaleDateString()

                                                        :

                                                        "No Deadline"

                                                }

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td colSpan="3">

                                            No Assignment Found

                                        </td>

                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </LecturerLayout>

    );

}