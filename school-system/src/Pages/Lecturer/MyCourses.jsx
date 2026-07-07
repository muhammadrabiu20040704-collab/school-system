import { useEffect, useState } from "react";
import axios from "axios";

import LecturerLayout from "../../layouts/LecturerLayout";

import "../../styles/dashboard.css";

export default function MyCourses() {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchCourses = async () => {

    try {

      const res = await axios.get(
        "http://localhost:3000/api/lecturers/my-courses",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCourses(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchCourses();

  }, []);

  if (loading) {

    return (

      <LecturerLayout>

        <h2>Loading...</h2>

      </LecturerLayout>

    );

  }

  // Cards

  const totalCourses = courses.length;

  const totalStudents = courses.reduce(

    (sum, course) => sum + course.totalStudents,

    0

  );

  const totalDepartments = new Set(

    courses.map(course => course.department._id)

  ).size;

  return (

    <LecturerLayout>

      <div className="page-content">

        <h1>My Courses</h1>

        <div className="stats-grid">

          <div className="stat-card">

            <h3>Total Courses</h3>

            <p>{totalCourses}</p>

          </div>

          <div className="stat-card">

            <h3>Total Students</h3>

            <p>{totalStudents}</p>

          </div>

          <div className="stat-card">

            <h3>Departments</h3>

            <p>{totalDepartments}</p>

          </div>

        </div>

        <div className="table-card">

          <h2>Assigned Courses</h2>

          <table>

            <thead>

              <tr>

                <th>Code</th>

                <th>Course</th>

                <th>Department</th>

                <th>Students</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {

                courses.length > 0 ?

                courses.map(course => (

                  <tr key={course._id}>

                    <td>{course.code}</td>

                    <td>{course.title}</td>

                    <td>{course.department.name}</td>

                    <td>{course.totalStudents}</td>

                    <td>

                      <button className="btn btn-primary">

                        View

                      </button>

                    </td>

                  </tr>

                ))

                :

                <tr>

                  <td colSpan="5">

                    No Courses Found

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