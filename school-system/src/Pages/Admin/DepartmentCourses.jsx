import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/dashboard.css";
export default function DepartmentCourses() {

  const { id } = useParams();

  const [department, setDepartment] = useState(null);
  const [levels, setLevels] = useState([]);
 
   
    const fetchDepartmentLevels = async () => {

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
      setLevels(res.data.levels);

    } catch (error) {
      console.error(error);
    }
  };

useEffect(() => {
   fetchDepartmentLevels();
}, [id]);


  return (
    <AdminLayout>

      <div className="dashboard-Content">

        <h1>
          {department?.name}
        </h1>

        <h3>
          Total Levels: {levels.length}
        </h3>
        <div className="levels-grid">

{

levels.map((item)=>(

<div

key={item.level}

className="level-card"

>

<h2>

{item.level}

</h2>

<p>

{item.totalCourses} Courses

</p>

<button
className="btn btn-primary"
>

View Courses

</button>

</div>

))

}

</div>

        

      </div>

    </AdminLayout>
  );
}