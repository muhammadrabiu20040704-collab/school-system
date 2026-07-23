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

import StudentLayout from "../../layouts/StudentLayout";

import "../../styles/dashboard.css";



export default function StudentDashboard(){


const [dashboard, setDashboard] = useState(null);
const [loading, setLoading] = useState(true);

const token = localStorage.getItem("token");

const fetchDashboard = async () => {
  try {

    const res = await axios.get(
      "http://localhost:3000/api/student-dashboard",
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
    <StudentLayout>
      <h2>Loading...</h2>
    </StudentLayout>
  );
}

if (!dashboard) {
  return (
    <StudentLayout>
      <h2>No Data</h2>
    </StudentLayout>
  );
}

return(



<StudentLayout>



<div className="page-content">



<h1>

Student Dashboard

</h1>

<div className="stats-grid">



 <DashboardCard
                            icon={<FaBuilding />}
                            title="My Departments"
                            value={dashboard.department?.name || "No Department"}
                            subtitle=""
                        />
                        

                        
                        <DashboardCard
                            icon={<FaBookOpen />}
                            title="Total Courses"
                            value={dashboard.stats.totalCourses || 0 }
                            subtitle="Available Courses"
                        />
                        
                        <DashboardCard
                            icon={<FaClipboardList />}
                            title="Total Assignments"
                            value={dashboard.stats.totalAssignments || 0}
                            subtitle="Course Assignments"
                        />

</div>


<div className="table-card">

<h2>Department Lecturers</h2>

<table>

<thead>

<tr>

<th>Lecturer</th>
<th>Department</th>
<th>Course</th>

</tr>

</thead>

<tbody>

{

dashboard.lecturers?.length > 0 ?

dashboard.lecturers.map((item,index)=>(

<tr key={index}>

<td>

{item.lecturer?.name}

</td>

<td>

{item.department?.name}

</td>

<td>

{item.course?.title || "No Course"} 

</td>

</tr>

))

:

<tr>

<td colSpan="3">

No Lecturer

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

<th>Lecturer</th>

<th>Deadline</th>

</tr>

</thead>

<tbody>

{

dashboard.recentAssignments?.length > 0 ?

dashboard.recentAssignments.map((assignment)=>(

<tr key={assignment._id}>

<td>

{assignment.title}

</td>

<td>

{assignment.course?.title || "-"}

</td>

<td>

{assignment.lecturer?.name || "-"}

</td>

<td>

{

assignment.deadline
? new Date(
assignment.deadline
).toLocaleDateString()
: "No Deadline"

}

</td>

</tr>

))

:

<tr>

<td colSpan="4">

No recent assignments available.

</td>

</tr>

}

</tbody>

</table>

</div>

</div>

</StudentLayout>

)

}