import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/dashboard.css";

export default function Courses() {

  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [assignCourse,setAssignCourse] = useState(null);

  const [lecturers,setLecturers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    code: "",
    department: ""
  });

  const [editingCourse, setEditingCourse] = useState(null);

 

  // GET COURSES
  const fetchCourses = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/courses",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCourses(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  // GET DEPARTMENTS
  const fetchDepartments = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/departments",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setDepartments(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {

      if (editingCourse) {

        await axios.put(
          `http://localhost:3000/api/courses/${editingCourse._id}`,
          formData,
          config
        );

        alert("Course updated successfully");

      } else {

        await axios.post(
          "http://localhost:3000/api/courses",
          formData,
          config
        );

        alert("Course created successfully");
      }

      fetchCourses();

      setFormData({
        title: "",
        code: "",
        department: ""
      });

      setEditingCourse(null);

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error");
    }
  };

  // EDIT
  const handleEdit = (course) => {

    setEditingCourse(course);

    setFormData({
      title: course.title,
      code: course.code,
      department: course.department?._id || ""
    });
  };

  // DELETE
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Course deleted successfully");

      fetchCourses();

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error");
    }
  };

const fetchLecturers = async()=>{

try{

const token = localStorage.getItem("token");


const res = await axios.get(

"http://localhost:3000/api/lecturers",

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


setLecturers(res.data);


}catch(error){

console.log(error);

}

};

useEffect(()=>{

fetchCourses();

fetchDepartments();

fetchLecturers();


},[]);
  return (
    <AdminLayout>

      <div className="dashboard-Content">

        <h1>Courses Management</h1>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="department-form"
        >

          <input
            type="text"
            placeholder="Course Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Course Code"
            value={formData.code}
            onChange={(e) =>
              setFormData({
                ...formData,
                code: e.target.value
              })
            }
          />

          <select
            value={formData.department}
            onChange={(e) =>
              setFormData({
                ...formData,
                department: e.target.value
              })
            }
          >

            <option value="">
              Select Department
            </option>

            {departments.map((dept) => (
              <option
                key={dept._id}
                value={dept._id}
              >
                {dept.name}
              </option>
            ))}

          </select>

          <button
            type="submit"
            className="btn btn-primary"
          >
            {editingCourse
              ? "Update Course"
              : "Add Course"}
          </button>

        </form>

        {/* TABLE */}

        <div className="table-card">

          <table>

            <thead>
              <tr>
                <th>Title</th>
                <th>Code</th>
                <th>Department</th>
                <th>Lecturer</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {courses.map((course) => (

                <tr key={course._id}>

                  <td>{course.title}</td>

                  <td>{course.code}</td>

                  <td>
                    {course.department?.name}
                  </td>
                  
                  <td>
                  {course.lecturer?.name || "No Lecturer"}
                  </td>

                  <td>

                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() =>
                        handleEdit(course)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() =>
                        handleDelete(course._id)
                      }
                    >
                      Delete
                    </button>
 
                     <button className="btn btn-success"
                      onClick={()=>setAssignCourse(course)}
                      >
                     Assign Lecturer  
                     </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
           
            {
assignCourse && (

<div className="modal-overlay">

<div className="modal">


<h2>
Assign Lecturer
</h2>



<select

value={assignCourse.lecturer || ""}

onChange={(e)=>

setAssignCourse({

...assignCourse,

lecturer:e.target.value

})

}

>


<option value="">
Select Lecturer
</option>



{

lecturers.map((lecturer)=>(


<option

key={lecturer._id}

value={lecturer._id}

>

{lecturer.name}

</option>


))

}



</select>

<button

className="btn btn-success"

onClick={async()=>{


if(!assignCourse.lecturer){

alert("Select lecturer first");

return;

}



try{


const token =
localStorage.getItem("token");

await axios.put(

`http://localhost:3000/api/courses/${assignCourse._id}/assign-lecturer`,

{

lecturerId:
assignCourse.lecturer

},

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);

alert(
"Lecturer Assigned"
);



setAssignCourse(null);


fetchCourses();



}catch(error){

console.log(error.response?.data || error);

alert("Assign failed");

}



}}

>

Save

</button>
<button

className="btn btn-danger"

onClick={()=>setAssignCourse(null)}

>

Cancel

</button>



</div>

</div>

)
}

      </div>

    </AdminLayout>
  );
}