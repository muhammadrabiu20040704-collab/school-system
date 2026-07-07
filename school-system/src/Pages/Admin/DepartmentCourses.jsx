import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

export default function DepartmentCourses() {

  const { id } = useParams();

  const [department, setDepartment] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3000/api/departments/${id}/courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setDepartment(res.data.department);
      setCourses(res.data.courses);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>

      <div className="dashboard-Content">

        <h1>
          {department?.name}
        </h1>

        <h3>
          Total Courses: {courses.length}
        </h3>

        <div className="table-card">

          <table>

            <thead>
              <tr>
                <th>Code</th>
                <th>Title</th>
                
              </tr>
            </thead>

            <tbody>

              {courses.map((course) => (
                <tr key={course._id}>

                  <td>{course.code}</td>

                  <td>{course.title}</td>

                  

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}